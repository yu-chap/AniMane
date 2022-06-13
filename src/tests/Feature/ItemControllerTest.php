<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Folder;
use App\Models\Item;

class ItemControllerTest extends TestCase
{
    use RefreshDatabase;

    public function setUp() :void
    {
        parent::setUp();
        $this->seed();
        $this->authUser = User::where('email', 'test_email@email.com')->first();
        $this->folder = $this->authUser->folders()->first();
        $this->PATH = "/api/folders/{$this->folder->id}/items";
    }

    /*** アイテム取得に関するテスト ***/

    // 認証済みユーザーはitemsを
    // - 作成順
    // - 最新順
    // - タイトル順 に取得可能
    public function test_authUser_can_get_items()
    {
        // 作成順に取得可能
        $items = json_encode($this->folder->items()->Paginate(20)->items());
        $response = $this->actingAs($this->authUser)->get("{$this->PATH}?page=1&sort=oldest");
        $response->assertStatus(200);
        $this->assertStringContainsString($items, $response->content());

        // 最新順に取得可能
        $items = json_encode($this->folder->items()->latest('id')->Paginate(20)->items());
        $response = $this->actingAs($this->authUser)->get("{$this->PATH}?page=1&sort=latest");
        $response->assertStatus(200);
        $this->assertStringContainsString($items, $response->content());

        // タイトル順に取得可能
        $items = json_encode($this->folder->items()->orderBy('name')->Paginate(20)->items());
        $response = $this->actingAs($this->authUser)->get("{$this->PATH}?page=1&sort=title");
        $response->assertStatus(200);
        $this->assertStringContainsString($items, $response->content());
    }

    // itemsの取得時
    // - folderが存在しなければerror404
    // - Auth::user()と$folder->userIdが一致しなければerror403
    // - item?sortが存在しない場合error404
    public function test_check_error_in_get_items()
    {
        /*** folderが存在しなければerror404 ***/
        $response = $this->actingAs($this->authUser)->get("/api/folders/100/items?page=1&sort=oldest");
        $response->assertStatus(404);

        /*** Auth::user()と$folder->userIdが一致しなければerror403 ***/
        $anotherUser = User::where('email', 'test@email.com')->first();
        $response = $this->actingAs($anotherUser)->get("{$this->PATH}?page=1&sort=oldest");
        $response->assertStatus(403);

        /*** item?sortが存在しない場合error404 ***/
        $response = $this->actingAs($this->authUser)->get("{$this->PATH}?page=1&sort=");
        $response->assertStatus(404);
    }

    /*** アイテム作成に関するテスト ***/

    // 認証済みユーザーはアイテムの作成が可能
    public function test_authUser_can_create_an_item()
    {
        $response = $this->actingAs($this->authUser)->postJson($this->PATH, [ 'name' => 'new item' ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('items', [ 'name' => 'new item' ]);
    }

    // アイテム作成時
    // - folderが存在しなければerror404
    // - requestにnameがない, もしくは""か200文字を超える場合error
    // - Auth::user()と$folder->userIdが一致しなければerror403
    public function test_check_error_in_create_item()
    {
        /*** folderが存在しなければerror404 ***/
        $response = $this->actingAs($this->authUser)->postJson("/api/folders/100/items", [ 'name' => 'new folder' ]);
        $response->assertStatus(404);

        /*** requestにnameがない, もしくは""か200文字を超える場合error ***/
        // nameがない場合
        $response = $this->actingAs($this->authUser)->postJson($this->PATH, []);
        $response->assertStatus(422);

        // name = ""の場合
        $response = $this->actingAs($this->authUser)->postJson($this->PATH, [ 'name' => "" ]);
        $response->assertStatus(422);

        // nameが200文字を超える場合
        $str = 'abcdefghijklmnopqrstuvwxyz0123456789';
        $name = substr(str_shuffle(str_repeat($str, 10)), 0, 201);
        $response = $this->actingAs($this->authUser)->postJson($this->PATH, [ 'name' => $name ]);
        $response->assertStatus(422);

        /*** Auth::user()と$folder->userIdが一致しなければerror403 ***/
        $anotherUser = User::where('email', 'test@email.com')->first();
        $response = $this->actingAs($anotherUser)->postJson($this->PATH, [ 'name' => 'new folder' ]);
        $response->assertStatus(403);
    }

    /*** アイテム検索に関するテスト ***/

    // 認証済みユーザーはアイテムの検索が可能
    public function test_authUser_can_search_items()
    {
        $item = json_encode($this->folder->items()->where('name', "アニメ40")->get());
        $response = $this->actingAs($this->authUser)->get("{$this->PATH}/search?q=アニメ40");
        $response->assertStatus(200);
        $this->assertJsonStringEqualsJsonString($item, $response->content());
    }

    // アイテム検索時
    // - folderが存在しなければ404
    // - query = "", undifined, nullの場合error
    // - Auth::user()と$folder->userIdが一致しなければerror403
    public function test_check_error_in_search_items()
    {
        /*** folderが存在しなければerror404 ***/
        $response = $this->actingAs($this->authUser)->get("/api/folders/100/items/search?q=アニメ40");
        $response->assertStatus(404);

        /*** query = "", undifined, nullの場合error ***/
        $query = "";
        $response = $this->actingAs($this->authUser)->getjson("{$this->PATH}/search?q={$query}");
        $response->assertStatus(422);

        $response = $this->actingAs($this->authUser)->getjson("{$this->PATH}/search?q=");
        $response->assertStatus(422);

        $response = $this->actingAs($this->authUser)->getjson("{$this->PATH}/search?");
        $response->assertStatus(422);

        /*** Auth::user()と$folder->userIdが一致しなければerror403 ***/
        $anotherUser = User::where('email', 'test@email.com')->first();
        $response = $this->actingAs($anotherUser)->get($this->PATH);
        $response->assertStatus(403);
    }

    /*** アイテム更新に関するテスト ***/

    // 認証済みユーザーはアイテムの更新が可能
    public function test_authUser_can_update_an_item()
    {
        $item = $this->folder->items()->first();
        $response = $this->actingAs($this->authUser)->putjson("{$this->PATH}/{$item->id}", [ 'name' => 'new item' ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('items', [ 'name' => 'new item' ]);
    }

    // アイテム更新時
    // - folderが存在しなければ404
    // - itemが存在しなければ404
    // - requestにnameがない, もしくは""か200文字を超える場合error
    // - Auth::user()と$folder->userIdが一致しなければerror403
    // - folderとitemのリレーションが不正であればerror404
    public function test_check_error_in_update_item()
    {
        $item = $this->folder->items()->first();

        /*** folderが存在しなければerror404 ***/
        $response = $this->actingAs($this->authUser)->putJson("/api/folders/100/items/{$item->id}", [ 'name' => 'new folder' ]);
        $response->assertStatus(404);

        /*** itemが存在しなければ404 ***/
        $response = $this->actingAs($this->authUser)->putJson("/api/folders/100/items/100", [ 'name' => 'new folder' ]);
        $response->assertStatus(404);

        /*** requestにnameがない, もしくは""か200文字を超える場合error ***/
        // nameがない場合
        $response = $this->actingAs($this->authUser)->putJson("{$this->PATH}/{$item->id}", []);
        $response->assertStatus(422);

        // name = ""の場合
        $response = $this->actingAs($this->authUser)->putJson("{$this->PATH}/{$item->id}", [ 'name' => "" ]);
        $response->assertStatus(422);

        // nameが200文字を超える場合
        $str = 'abcdefghijklmnopqrstuvwxyz0123456789';
        $name = substr(str_shuffle(str_repeat($str, 10)), 0, 201);
        $response = $this->actingAs($this->authUser)->putJson("{$this->PATH}/{$item->id}", [ 'name' => $name ]);
        $response->assertStatus(422);

        /*** Auth::user()と$folder->userIdが一致しなければerror403 ***/
        $anotherUser = User::where('email', 'test@email.com')->first();
        $response = $this->actingAs($anotherUser)->putJson("{$this->PATH}/{$item->id}", [ 'name' => 'new folder' ]);
        $response->assertStatus(403);

        /*** folderとitemのリレーションが不正であればerror404 ***/
        $item = $anotherUser->folders()->first()->items()->first();
        $response = $this->actingAs($this->authUser)->putjson("{$this->PATH}/{$item->id}", [ 'name' => 'new item' ]);
        $response->assertStatus(404);
    }

        /*** アイテム削除に関するテスト ***/

    // 認証済みユーザーはアイテムの削除が可能
    public function test_authUser_can_delete_an_item()
    {
        $item = $this->folder->items()->first();
        $response = $this->actingAs($this->authUser)->deletejson("{$this->PATH}/{$item->id}");
        $response->assertStatus(200);
        $this->assertDatabaseMissing('items', [ 'name' => $item->name ]);
    }

    // アイテム削除時
    // - folderが存在しなければ404
    // - itemが存在しなければ404
    // - Auth::user()と$folder->userIdが一致しなければerror403
    // - folderとitemのリレーションが不正であればerror404
    public function test_check_error_in_delete_item()
    {
        $item = $this->folder->items()->first();

        /*** folderが存在しなければerror404 ***/
        $response = $this->actingAs($this->authUser)->deleteJson("/api/folders/100/items/{$item->id}");
        $response->assertStatus(404);

        /*** itemが存在しなければ404 ***/
        $response = $this->actingAs($this->authUser)->deleteJson("/api/folders/100/items/100");
        $response->assertStatus(404);

        /*** Auth::user()と$folder->userIdが一致しなければerror403 ***/
        $anotherUser = User::where('email', 'test@email.com')->first();
        $response = $this->actingAs($anotherUser)->deleteJson("{$this->PATH}/{$item->id}");
        $response->assertStatus(403);

        /*** folderとitemのリレーションが不正であればerror404 ***/
        $item = $anotherUser->folders()->first()->items()->first();
        $response = $this->actingAs($this->authUser)->deletejson("{$this->PATH}/{$item->id}");
        $response->assertStatus(404);
    }
}
