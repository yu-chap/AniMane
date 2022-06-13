<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Folder;

class FolderControllerTest extends TestCase
{
    use RefreshDatabase;

    public function setUp() :void
    {
        parent::setUp();
        $this->seed();
        $this->authUser = User::where('email', 'test_email@email.com')->first();
        $this->folder = $this->authUser->folders()->where('name', 'アクション')->first();
        $this->PATH1 = '/api/folders';
        $this->PATH2 = "/api/folders/{$this->folder->id}";
    }

    /*** フォルダ取得に関するテスト ***/

    // 認証済みユーザーはフォルダ一覧を取得可能
    public function test_authUser_can_get_all_folders()
    {
        $folders = json_encode($this->authUser->folders()->get());
        $response = $this->actingAs($this->authUser)->get($this->PATH1);
        $response->assertStatus(200);
        $this->assertJsonStringEqualsJsonString($folders, $response->content());
    }

    /*** フォルダ作成に関するテスト ***/

    // 認証済みユーザーはフォルダの作成可能
    public function test_authUser_can_create_a_new_folder()
    {
        $response = $this->actingAs($this->authUser)->postJson($this->PATH1, [ 'name' => 'new folder' ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('folders', [ 'name' => 'new folder' ]);
    }

    // フォルダの作成時requestにnameがない,
    // もしくは""か200文字を超える場合error
    public function test_check_error_in_create_folder()
    {
        // nameがない場合
        $response = $this->actingAs($this->authUser)->postJson($this->PATH1, []);
        $response->assertStatus(422);

        // name = ""の場合
        $response = $this->actingAs($this->authUser)->postJson($this->PATH1, [ 'name' => "" ]);
        $response->assertStatus(422);

        // nameが200文字を超える場合
        $str = 'abcdefghijklmnopqrstuvwxyz0123456789';
        $name = substr(str_shuffle(str_repeat($str, 10)), 0, 201);
        $response = $this->actingAs($this->authUser)->postJson($this->PATH1, [ 'name' => $name ]);
        $response->assertStatus(422);
    }

    /*** フォルダ更新に関するテスト ***/

    // 認証済みユーザーはフォルダの更新可能
    public function test_authUser_can_update_a_folder()
    {
        $folder = $this->authUser->folders()->where('name', 'アクション')->first();
        $response = $this->actingAs($this->authUser)->putJson($this->PATH2, [ 'name' => 'new folder' ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('folders', [ 'name' => 'new folder' ]);
    }

    // フォルダの更新時
    // - folderが存在しなければerror404
    // - requestにnameがない, もしくは""か200文字を超える場合error
    // - Auth::user()と$folder->userIdが一致しなければerror403
    public function test_check_error_in_update_folder()
    {
        /*** folderが存在しなければerror404 ***/
        $response = $this->actingAs($this->authUser)->putJson("/api/folders/100", [ 'name' => 'new folder' ]);
        $response->assertStatus(404);

        /*** requestにnameがない, もしくは""か200文字を超える場合error ***/
        $folder = $this->authUser->folders()->where('name', 'アクション')->first();

        // nameがない場合
        $response = $this->actingAs($this->authUser)->putJson($this->PATH2, []);
        $response->assertStatus(422);

        // name = ""の場合
        $response = $this->actingAs($this->authUser)->putJson($this->PATH2, [ 'name' => "" ]);
        $response->assertStatus(422);

        // nameが200文字を超える場合
        $str = 'abcdefghijklmnopqrstuvwxyz0123456789';
        $name = substr(str_shuffle(str_repeat($str, 10)), 0, 201);
        $response = $this->actingAs($this->authUser)->putJson($this->PATH2, [ 'name' => $name ]);
        $response->assertStatus(422);

        /*** Auth::user()と$folder->userIdが一致しなければerror403 ***/
        $anotherUser = User::where('email', 'test@email.com')->first();
        $response = $this->actingAs($anotherUser)->putJson($this->PATH2, [ 'name' => 'new folder' ]);
        $response->assertStatus(403);
    }

    /*** フォルダ削除に関するテスト ***/

    // 認証済みユーザーはフォルダの削除可能
    public function test_authUser_can_delete_a_folder()
    {
        $folder = $this->authUser->folders()->where('name', 'アクション')->first();
        $response = $this->actingAs($this->authUser)->deleteJson($this->PATH2);
        $response->assertStatus(200);
        $this->assertDatabaseMissing('folders', [ 'name' => 'アクション' ]);
    }

    // フォルダの削除時
    // - folderが存在しなければerror404
    // - Auth::user()と$folder->userIdが一致しなければerror403
    public function test_check_error_in_delete_folder()
    {
        /*** folderが存在しなければerror404 ***/
        $response = $this->actingAs($this->authUser)->deleteJson("/api/folders/100");
        $response->assertStatus(404);

        /*** Auth::user()と$folder->userIdが一致しなければerror403 ***/
        $folder = $this->authUser->folders()->where('name', 'アクション')->first();
        $anotherUser = User::where('email', 'test@email.com')->first();
        $response = $this->actingAs($anotherUser)->deleteJson($this->PATH2);
        $response->assertStatus(403);
    }
}
