<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ItemRequest;
use App\Http\Requests\SearchRequest;
use App\Models\Item;
use App\Models\Folder;

class ItemController extends Controller
{
    // 現在のfolderが保持しているItemsをreturn //
    public function index(Folder $folder, Request $request)
    {
        switch($request->sort) {
            case "oldest":
                // アイテムの作成順 //
                $items = $folder->items()->Paginate(20);
                break;

            case "latest":
                // アイテムの最新順 //
                $items = $folder->items()->latest('id')->Paginate(20);
                break;

            case "title":
                // アイテムのタイトル順 //
                $items = $folder->items()->orderBy('name')->Paginate(20);
                break;

            default:
                abort(404);
                break;
        }
        return response()->json($items, 200);
    }

    // Create New Item //
    public function create(Folder $folder, ItemRequest $request)
    {
        $item = new Item();
        $item->name = trim($request->name);
        $folder->items()->save($item);
    }

    // Delete Item //
    public function delete(Folder $folder, Item $item)
    {
        $this->checkRelation($folder, $item);
        $item->delete();
    }

    // Update Item //
    public function update(Folder $folder, Item $item, ItemRequest $request)
    {
        $this->checkRelation($folder, $item);
        $item->name = trim($request->name);
        $item->save();
    }

    // searchItem //
    public function search(Folder $folder, SearchRequest $request)
    {
        $keyword = trim($request->q);
        $items = $folder->items()->whereLike('name', $keyword)->get();
        return response()->json($items, 200);
    }

    // FolderとItemの関係のリレーション確認 //
    public function checkRelation(Folder $folder, Item $item)
    {
        if($folder->id !== $item->folder_id) {
            abort(404);
        }
    }
}
