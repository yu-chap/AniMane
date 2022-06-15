@extends('layouts.auth')

@section('content')
<div class="bg-black bg-gradient" style="width: 100%; min-height: 500px; height: calc(100vh - 55px); background-size: cover; background-position: center;">
  <div class="container-fluid h-50">
      <div class="d-flex align-items-end justify-content-center h-75">
        <h1 class="display-1 text-center text-warning">AniMane</h1>
      </div>
      <div class="d-flex align-items-start justify-content-center h-25">
        <p class="h5 text-center text-warning text-opacity-25">-Make your life more fun with anime-</p>
      </div>
  </div>
  <div class="container-fluid h-50">
    <div class="row d-flex align-items-center justify-content-center">
      <div class="col d-flex align-items-center justify-content-center">
        <a href="{{ route('register') }}" class="btn btn-danger btn-lg rounded-pill h-auto" role="button" style="width: 200px">新規登録</a>
      </div>
      <div class="w-100"></div>
      <div class="col mt-3 d-flex align-items-center justify-content-center">
        <a href="{{ route('login') }}" class="btn btn-dark btn-lg rounded-pill h-auto" role="button" style="width: 200px">ログイン</a>
      </div>
      <div class="w-100"></div>
      <div class="col mt-3 d-flex align-items-center justify-content-center">
        <a href="{{ route('guestLogin') }}" class="btn btn-warning btn-lg rounded-pill h-auto" role="button" style="width: 200px">ゲストログイン</a>
      </div>
    </div>
  </div>
</div>
@endsection