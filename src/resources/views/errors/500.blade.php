@include('layouts.head')
<div class="bg-black bg-gradient" style="width: 100%; height: 100vh; background-size: cover; background-position: center;">
    <div class="container d-flex align-items-center justify-content-center" style="width: 100%; height: 100vh;">
        <div class="row d-flex align-items-center justify-content-center">
            <div class="col w-100 d-flex align-items-center justify-content-center">
                <h3 class="text-center text-white">サーバーエラーが発生しました。</h3>
            </div>
            <div class="w-100"></div>
            <div class="col w-100 d-flex align-items-center justify-content-center mt-3">
                <a href="{{ route('top') }}" class="btn btn-warning btn-lg" role="button">
                    ホーム
                </a>
            </div>
        </div>
    </div>
</div>