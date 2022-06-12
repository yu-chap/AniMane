@extends('layouts.auth')

@section('content')
<div class="bg-black bg-gradient" style="width: 100%; height: 100vh; background-size: cover; background-position: center;">
  <div class="container-fluid h-50">
      <div class="d-flex align-items-end justify-content-center h-75">
        <h1 class="display-1 text-center text-warning">AniMane</h1>
      </div>
      <div class="d-flex align-items-start justify-content-center h-25">
        <p class="h5 text-center text-warning text-opacity-25">-Make your life more fun with anime-</p>
      </div>
  </div>
  <div class="container-fluid h-25">
    <div class="row align-items-center justify-content-center h-100">
      <div class="col-auto">
        <a href="{{ route('register') }}" class="btn btn-danger btn-lg rounded-pill w-auto h-auto" role="button">新規登録</a>
      </div>
      <div class="col-auto">
        <a href="{{ route('login') }}" class="btn btn-dark btn-lg rounded-pill w-auto h-auto" role="button">ログイン</a>
      </div>
    </div>
  </div>
</div>
@endsection