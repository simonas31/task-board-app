<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        Role::truncate();

        $roles = Roles::cases();
        $rolesToInsert = [];
        $now = now();
        foreach ($roles as $id => $role) {
            $rolesToInsert[] = [
                'id' => $id + 1,
                'name' => $role->value,
                'guard_name' => 'api',
                'created_at' => $now,
                'updated_at' => $now
            ];
        }

        Role::insert($rolesToInsert);
    }
}
