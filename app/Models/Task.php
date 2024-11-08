<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Task extends Model
{
    protected $fillable = [
        'title',
        'description',
        'due_date',
        'priority',
        'order',
        'completed_at',
        'archived_at',
    ];

    protected $casts = [
        'due_date' => 'date',
        'completed_at' => 'datetime',
        'archived_at' => 'datetime',
    ];

    const statusIncompleted = 'incompleted';
    const statusCompleted = 'completed';
    const statusArchived = 'archived';

    const priorityUrgent = 'Urgent'; // 3
    const priorityHigh = 'High'; // 2
    const priorityNormal = 'Normal'; // 1
    const priorityLow = 'Low'; // 0

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function scopeIncompleteStatus(Builder $query)
    {
        return $query->whereNull('completed_at')
                    ->whereNull('archived_at');
    }

    public function scopeCompleteStatus(Builder $query)
    {
        return $query->whereNotNull('completed_at')
                    ->whereNull('archived_at');
    }

    public function scopeArchiveStatus(Builder $query)
    {
        return $query->whereNotNull('archived_at');
    }

    public function scopeSearch(Builder $query, $search)
    {
        return $query->where(function($query) use($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
    }

    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when(data_get($filters, 'status') == self::statusIncompleted, function ($query) {
            return $query->incompleteStatus();
        });

        $query->when(data_get($filters, 'status') == self::statusCompleted, function ($query) {
            return $query->completeStatus();
        });

        $query->when(data_get($filters, 'status') == self::statusArchived, function ($query,) {
            return $query->archiveStatus();
        });

        $query->when($filters['priority'] ?? null, function ($query, $priority) {
            return $query->where('priority', $priority);
        });

        $query->when($filters['due_date_to'] ?? null, function ($query, $date) {
            return $query->where('due_date', '<=', $date);
        });

        $query->when($filters['completed_at_from'] ?? null, function ($query, $date) {
            return $query->where('completed_at', '>=', $date);
        });

        $query->when($filters['completed_at_to'] ?? null, function ($query, $date) {
            return $query->where('completed_at', '<=', $date);
        });

        $query->when($filters['archived_at_from'] ?? null, function ($query, $date) {
            return $query->where('archived_at', '>=', $date);
        });

        $query->when($filters['archived_at_to'] ?? null, function ($query, $date) {
            return $query->where('archived_at', '<=', $date);
        });

        return $query;
    }
}
