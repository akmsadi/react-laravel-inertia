<?php

namespace App\Http\Requests;

use App\Models\Newsletter;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class NewsletterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        /** @var Newsletter|null $newsletter */
        $newsletter = $this->route('newsletter');

        return [
            'email' => ['required', 'email', 'max:255', Rule::unique('newsletters', 'email')->ignore($newsletter)],
        ];
    }
}
