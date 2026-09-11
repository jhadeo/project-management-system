<?php

namespace App\Models;

use App\Enum\Priority;
use App\Enum\Status;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Override;

#[Fillable('client_name', 'project_name', 'description', 'status', 'priority', 'start_date','due_date')]
class Project extends Model
{
    use SoftDeletes;

    #[Override]
    protected function casts() : array
    {
        return [
            'priority' => Priority::class,
            'status' => Status::class,
            'start_date' => 'datetime',
            'due_date' => 'datetime'
        ];
    }
}
