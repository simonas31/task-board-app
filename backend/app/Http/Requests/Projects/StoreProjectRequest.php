<?php

namespace App\Http\Requests\Projects;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:projects,name',
            'boards' => 'nullable|array',
            'boards.*.name' => 'required|string'
        ];
    }

    public function getBoards(): array | null
    {
        return $this->input("boards.*");
    }
}
