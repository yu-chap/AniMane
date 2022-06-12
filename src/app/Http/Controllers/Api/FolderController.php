<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\FolderRequest;
use App\Models\Folder;

class FolderController extends Controller
{
    // userが保持しているすべてのfoldersをreturn //
    public function index()
    {
        $folders = Auth::user()->folders()->get();
        return response()->json($folders, 200);
    }

    // Create New Folder //
    public function create(FolderRequest $request)
    {
        $folder = new Folder();
        $folder->name = trim($request->name);
        Auth::user()->folders()->save($folder);
    }

    // Delete Folder //
    public function delete(Folder $folder)
    {
        $folder->delete();
    }

    // Update Folder //
    public function update(Folder $folder, FolderRequest $request)
    {
        $folder->name = trim($request->name);
        $folder->save();
    }
}
