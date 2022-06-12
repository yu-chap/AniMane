<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $names = [];
        for($i = 1; $i <= 40; $i++) {
            $names[] = "アニメ{$i}";
        }

        $user_id = DB::table('users')->where('email', 'test_eamil@email.com')->value('id');
        $folder = DB::table('folders')->where('user_id', $user_id)->first();

        foreach($names as $name) {
            DB::table('items')->insert([
                'name' => $name,
                'folder_id' => $folder->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
