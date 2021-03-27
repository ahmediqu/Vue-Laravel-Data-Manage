<?php

use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

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
auth()->loginUsingId(1);

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::apiResource('customers', CustomerController::class);
Route::get('category', [ HomeController::class, 'category'])->name('category');
Route::get('api/customers', [ HomeController::class, 'customers'])->name('api.customers');
Route::get('api/accordion', [ HomeController::class, 'accordion'])->name('api.accordion');
Route::get('products', [ HomeController::class, 'product'])->name('product');

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
