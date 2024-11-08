<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('app:delete-archived-tasks')->daily();
