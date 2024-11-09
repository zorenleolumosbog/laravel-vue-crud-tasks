<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'due_date' => $this->due_date ? Carbon::parse($this->due_date)->format('Y-m-d') : null,
            'priority' => $this->priority,
            'completed_at' => $this->completed_at,
            'archived_at' => $this->archived_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'attachments' => $this->whenLoaded('attachments'),
            'tags' => $this->whenLoaded('tags'),
        ];
    }
}
