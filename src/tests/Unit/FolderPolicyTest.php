<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Policies\FolderPolicy;
use App\Models\Folder;
use App\Models\User;

class FolderPolicyTest extends TestCase
{
    /**
     * FolderPolicyのバリデーション機能のUnitテスト
     *
     * @return void
     */
    public function test_OK_view()
    {
        $folder_policy = new FolderPolicy();
        $user = new User();
        $user->id = 1;
        $folder = new Folder();
        $folder->user_id = 1;
        $this->assertTrue($folder_policy->view($user, $folder));

        $user = new User();
        $user->id = 1;
        $folder = new Folder();
        $folder->user_id = 2;
        $this->assertFalse($folder_policy->view($user, $folder));
    }
}
