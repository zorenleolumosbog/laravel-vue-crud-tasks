<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Attachment extends Model
{
    protected $fillable = [
        'filename',
        'original_filename',
        'mime_type',
        'path'
    ];

    protected $appends = ['url'];

    /**
     * Get the URL for the attachment.
     */
    public function getUrlAttribute()
    {
        return Storage::url($this->path);
    }
}
