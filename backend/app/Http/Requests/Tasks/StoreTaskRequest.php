<?php

namespace App\Http\Requests\Tasks;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'due_date' => 'nullable|date:Y-m-d',
            'assignees' => 'nullable|array',
            'priority' => 'required|string',
            'tags' => 'nullable|array',
        ];
    }
}
