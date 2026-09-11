<?php

namespace App\Http\Requests\Project;

use App\Enum\Priority;
use App\Enum\Status;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreRequest extends FormRequest
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
            'client_name' => ['required', 'max:124'],
            'project_name' => ['required', 'max:124'],
            'description' => ['required', 'max:255'],
            'status' => ['required', new Enum(Status::class)],
            'priority' => ['required', new Enum(Priority::class)],
            'start_date' => ['required' ,'date'],
            'due_date' => ['required' , 'date']
        ];
    }
}
