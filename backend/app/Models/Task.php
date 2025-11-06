<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory, SoftDeletes;

    protected array $fillable = [
        'project_id',
        'title',
        'description',
        'status',
        'deleted_at'
    ];

    public function board(): BelongsTo
    {
        return $this->belongsTo(Board::class);
    }
}
