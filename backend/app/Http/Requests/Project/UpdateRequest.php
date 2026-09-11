<?php

namespace App\Http\Requests\Project;

use App\Enum\Priority;
use App\Enum\Status;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_name' => ['sometimes', 'required', 'max:124'],
            'project_name' => ['sometimes', 'required', 'max:124'],
            'description' => ['sometimes', 'required', 'max:255'],
            'status' => ['sometimes', 'required', new Enum(Status::class)],
            'priority' => ['sometimes', 'required', new Enum(Priority::class)],
            'start_date' => ['sometimes', 'required', 'date'],
            'due_date' => ['sometimes', 'required', 'date'],
        ];
    }
}
