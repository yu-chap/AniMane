<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class PageController extends Controller
{
    // ログイン済みのユーザーはapp/homeへ転送し
    // 未ログインユーザーはTopページに案内する
    public function TopPage_Routing()
    {
        if( Auth::check() ) {
            return redirect()->to('/app/home');
        }
        else {
            return view('top.index');
        }
    }
}
