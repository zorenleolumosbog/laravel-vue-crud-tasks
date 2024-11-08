<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('tasks', TaskController::class);
    Route::patch('tasks/{task}/complete', [TaskController::class, 'complete']);
    Route::patch('tasks/{task}/incomplete', [TaskController::class, 'incomplete']);
    Route::patch('tasks/{task}/archive', [TaskController::class, 'archive']);
    Route::patch('tasks/{task}/restore', [TaskController::class, 'restore']);

    Route::get('tasks/count/statuses', [TaskController::class, 'getCountByStatuses']);
    Route::get('tasks/sort/options', [TaskController::class, 'getSortOptions']);
    
    Route::get('tags', [TagController::class, 'index']);
});
