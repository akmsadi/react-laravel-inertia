<?php

namespace App\Http\Controllers;

use App\Http\Requests\CouponRequest;
use App\Models\Coupon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CouponController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim($request->string('search')->toString());

        return Inertia::render('admin/coupons/index', [
            'coupons' => Coupon::query()
                ->when($search !== '', fn ($query) => $query->where('code', 'like', "%{$search}%"))
                ->latest('id')
                ->paginate(50)
                ->withQueryString(),
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/coupons/create');
    }

    public function store(CouponRequest $request): RedirectResponse
    {
        Coupon::create($request->validated());

        return to_route('coupons.index');
    }

    public function show(Coupon $coupon): RedirectResponse
    {
        return to_route('coupons.edit', $coupon);
    }

    public function edit(Coupon $coupon): Response
    {
        return Inertia::render('admin/coupons/edit', ['coupon' => $coupon]);
    }

    public function update(CouponRequest $request, Coupon $coupon): RedirectResponse
    {
        $coupon->update($request->validated());

        return to_route('coupons.index');
    }

    public function destroy(Coupon $coupon): RedirectResponse
    {
        if ($coupon->orders()->exists()) {
            return back()->withErrors(['coupon' => 'This coupon has been used on orders and cannot be deleted. Deactivate it instead.']);
        }

        $coupon->delete();

        return to_route('coupons.index');
    }
}
