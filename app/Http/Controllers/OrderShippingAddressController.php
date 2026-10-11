<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateShippingAddressRequest;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;

class OrderShippingAddressController extends Controller
{
    public function update(UpdateShippingAddressRequest $request, Order $order): RedirectResponse
    {
        $address = $order->shippingAddress()->first();

        if ($address === null) {
            $order->shippingAddress()->create($request->validated());
        } else {
            $address->update($request->validated());
        }

        return back();
    }
}
