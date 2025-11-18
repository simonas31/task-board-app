<?php

namespace App\Models;

use Dom\Comment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory, SoftDeletes, LogsActivity;

    protected $fillable = [
        'board_id',
        'title',
        'description',
        'status',
        'due_date',
        'priority',
        'deleted_at'
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'date:Y-m-d',
            'deleted_at' => 'datetime:Y-m-d H:i:s',
        ];
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    public function board(): BelongsTo
    {
        return $this->belongsTo(Board::class);
    }

    public function assignees(): HasManyThrough
    {
        return $this->hasManyThrough(User::class, TaskUser::class);
    }

    public function tags(): HasManyThrough
    {
        return $this->hasManyThrough(Tag::class, TaskTag::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
