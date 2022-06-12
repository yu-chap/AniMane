<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FoldersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $names = ['ラブコメ', 'ミステリー', '学校'];

        $user_id = DB::table('users')->where('email', 'test_eamil@email.com')->value('id');

        foreach($names as $name) {
            DB::table('folders')->insert([
                'name' => $name,
                'user_id' => $user_id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }

}
