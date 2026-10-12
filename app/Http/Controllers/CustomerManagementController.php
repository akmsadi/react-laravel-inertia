<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerRequest;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerManagementController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim($request->string('search')->toString());

        return Inertia::render('admin/customers/index', [
            'customers' => Customer::query()
                ->withCount('orders')
                ->when($search !== '', fn ($query) => $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%");
                }))
                ->latest('id')
                ->paginate(50)
                ->withQueryString(),
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/customers/create');
    }

    public function store(CustomerRequest $request): RedirectResponse
    {
        Customer::create($request->validated());

        return to_route('admin.customers.index');
    }

    public function show(Customer $customer): RedirectResponse
    {
        return to_route('admin.customers.edit', $customer);
    }

    public function edit(Customer $customer): Response
    {
        return Inertia::render('admin/customers/edit', [
            'customer' => $customer->loadCount('orders'),
        ]);
    }

    public function update(CustomerRequest $request, Customer $customer): RedirectResponse
    {
        $data = $request->validated();

        if (empty($data['password'])) {
            unset($data['password']);
        }

        $customer->update($data);

        return to_route('admin.customers.index');
    }

    public function destroy(Customer $customer): RedirectResponse
    {
        if ($customer->orders()->exists()) {
            return back()->withErrors(['customer' => 'This customer has orders and cannot be deleted.']);
        }

        $customer->delete();

        return to_route('admin.customers.index');
    }
}
