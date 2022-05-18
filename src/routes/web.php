<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
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
Auth::routes();

Route::group(['middleware' => 'auth'], function() {
    Route::get('/app/{any}', function() {
        return view('/app/app');
    })->where('any', '.*');
});
