<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProjectionController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::get('/', function () {
    return view('welcome');
});


Route::group([
    'prefix' => 'cinema',
],
function(){
    Route::group([
        'prefix' => 'movies',
    ], function(){
       Route::get('/', [MovieController::class, 'index']);
       Route::get('/{movie}', [MovieController::class, 'show']);
       Route::post('/', [MovieController::class, 'store']);
       Route::post('/update/{movie}', [MovieController::class, 'update']);
       Route::post('/delete/{movie}', [MovieController::class, 'destroy']);
    });

    Route::group([
        'prefix' => 'projections',
    ], function(){
        Route::post('/', [ProjectionController::class, 'store']);
        Route::post('/delete/{projection}', [ProjectionController::class, 'destroy']);
    });
});
