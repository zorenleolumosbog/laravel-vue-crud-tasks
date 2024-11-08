<?php

namespace App\Services;

class FileService
{
    /**
     * Create a new class instance.
     */
    public function uploadFile($file): array
    {
        $path = $file->store('attachments');

        return [
            'filename' => basename($path),
            'original_filename' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'path' => $path,
        ];
    }
}
