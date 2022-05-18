@extends('layouts.auth')

@section('content')
  <a href="{{ route('register') }}">新規登録</a>
  <br><br>
  <a href="{{ route('login') }}">ログイン</a>
  <br><br>
@endsection