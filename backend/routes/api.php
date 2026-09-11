<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/projects',[ProjectController::class,'index']);
Route::post('/projects', [ProjectController::class, 'store']);
Route::get('/projects/{id}',[ProjectController::class,'show']);
Route::patch('/projects/{id}', [ProjectController::class, 'update']);
Route::delete('/projects/{id}/delete', [ProjectController::class, 'destroy']);