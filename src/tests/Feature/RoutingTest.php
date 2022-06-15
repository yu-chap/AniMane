<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class RoutingTest extends TestCase
{
    use RefreshDatabase;

    public function setUp() :void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    // 未認証ユーザーはtopページへアクセス可能
    public function test_unAuthUser_can_see_top()
    {
        $response = $this->get('/');
        $response->assertOk();
        $response->assertViewIs('top.index');
    }

    // すでにログインしたユーザーはtopページではなく/app/homeへ転送
    public function test_AuthUser_can_be_redirected_to_home()
    {
        $response = $this->actingAs($this->user)->get('/');
        $response->assertStatus(302);
        $response->assertRedirect('/app/home');
    }

    // 未認証ユーザーは/app/homeにアクセスできない
    // その場合, ログインを要求
    public function test_unAuthUser_cannot_access_home()
    {
        $response = $this->get('/app/home');
        $response->assertStatus(302);
        $response->assertRedirect(route('login'));
    }
}
