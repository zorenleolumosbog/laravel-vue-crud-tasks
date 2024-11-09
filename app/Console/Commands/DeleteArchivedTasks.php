<?php

namespace App\Console\Commands;

use App\Models\Task;
use Illuminate\Console\Command;

class DeleteArchivedTasks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:delete-archived-tasks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete tasks that have been archived for more than a week';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $date = now()->subWeek();

        Task::query()
            ->whereNotNull('archived_at')
            ->where('archived_at', '<=', $date)
            ->delete();

        $this->info('Archived tasks deleted successfully.');
    }
}
