<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdjustStockRequest;
use App\Models\InventoryTransaction;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Services\InventoryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class InventoryController extends Controller
{
    public function __construct(private InventoryService $inventory) {}

    public function index(Request $request): Response
    {
        $search = trim($request->string('search')->toString());
        $lowOnly = $request->boolean('low');
        $threshold = InventoryService::LOW_STOCK_THRESHOLD;

        $rows = Product::query()
            ->with('variants:id,product_id,name,sku,stock_quantity')
            ->when($search !== '', fn ($query) => $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%")
                    ->orWhereHas('variants', fn ($variants) => $variants
                        ->where('sku', 'like', "%{$search}%")
                        ->orWhere('name', 'like', "%{$search}%"));
            }))
            ->orderBy('name')
            ->get(['id', 'name', 'sku', 'stock_quantity'])
            ->flatMap(fn (Product $product) => $product->variants->isEmpty()
                ? [[
                    'key' => "p{$product->id}",
                    'product_id' => $product->id,
                    'variant_id' => null,
                    'name' => $product->name,
                    'sku' => $product->sku,
                    'stock_quantity' => (int) $product->stock_quantity,
                ]]
                : $product->variants->map(fn (ProductVariant $variant) => [
                    'key' => "v{$variant->id}",
                    'product_id' => $product->id,
                    'variant_id' => $variant->id,
                    'name' => trim($product->name.' - '.$variant->name, ' -'),
                    'sku' => $variant->sku,
                    'stock_quantity' => (int) $variant->stock_quantity,
                ]))
            ->when($lowOnly, fn ($rows) => $rows->filter(fn (array $row) => $row['stock_quantity'] <= $threshold))
            ->values();

        $page = max(1, $request->integer('page', 1));
        $perPage = 50;
        $stock = new LengthAwarePaginator(
            $rows->forPage($page, $perPage)->values(),
            $rows->count(),
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()],
        );

        $transactions = InventoryTransaction::query()
            ->with(['product:id,name', 'variant:id,name'])
            ->latest('id')
            ->limit(20)
            ->get();

        return Inertia::render('admin/inventory/index', [
            'stock' => $stock,
            'transactions' => $transactions,
            'filters' => ['search' => $search, 'low' => $lowOnly],
            'threshold' => $threshold,
        ]);
    }

    public function adjust(AdjustStockRequest $request): RedirectResponse
    {
        $product = Product::findOrFail($request->integer('product_id'));
        $variant = $request->filled('variant_id')
            ? ProductVariant::findOrFail($request->integer('variant_id'))
            : null;
        $delta = $request->integer('quantity');

        if (($variant ?? $product)->stock_quantity + $delta < 0) {
            throw ValidationException::withMessages([
                'quantity' => 'Stock cannot go below zero.',
            ]);
        }

        $this->inventory->adjust(
            $product,
            $variant,
            $delta,
            'adjustment',
            null,
            $request->input('notes'),
            $request->user()->id,
        );

        return back();
    }
}
