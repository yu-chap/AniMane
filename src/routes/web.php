<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Api\FolderController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\Auth\LoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [PageController::class, 'TopPage_Routing'])->name('top');
Route::get('/guest', [LoginController::class, 'guestLogin'])->name('guestLogin');
Auth::routes();

Route::group(['middleware' => 'auth'], function() {
    Route::get('/app/{any}', function() {
        return view('/app/app');
    })->where('any', '.*');

    Route::prefix('api')->group(function() {
        Route::get('/folders', [FolderController::class, 'index']);
        Route::post('/folders', [FolderController::class, 'create']);

        Route::group(['middleware' => 'can:view,folder'], function() {
            Route::delete('/folders/{folder}', [FolderController::class, 'delete']);
            Route::put('/folders/{folder}', [FolderController::class, 'update']);
            Route::get('/folders/{folder}/items', [ItemController::class, 'index']);
            Route::get('/folders/{folder}/items/search', [ItemController::class, 'search']);
            Route::post('/folders/{folder}/items', [ItemController::class, 'create']);
            Route::delete('/folders/{folder}/items/{item}', [ItemController::class, 'delete']);
            Route::put('/folders/{folder}/items/{item}', [ItemController::class, 'update']);
        });
    });
});
