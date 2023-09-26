<?php

namespace Database\Seeders;

use App\Models\Entity\Availability;
use App\Models\Entity\Location;
use App\Models\Entity\TimeSlot;
use App\Models\Organisation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->createImportantSeedData();

        Organisation::factory(10)->create();

        User::factory(10)->create();
    }

    private function createImportantSeedData()
    {
        $org = Organisation::create([
            'name' => 'Development',
            'slug' => 'dev',
            'active' => true,
        ]);

        $user = User::create([
            'organisation_id' => $org->id,
            'name' => 'Lucky test 1',
            'email' => 'luckybieniek@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
            'active' => true,
        ]);

        $user2 = User::create([
            'organisation_id' => $org->id,
            'name' => 'Piotr Chudzik',
            'email' => 'plchudzik@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
            'active' => true,
        ]);

        $location = Location::create([
            'organisation_id' => $org->id,
            'name' => 'Sheffield',
        ]);

        for ($day = 1; $day <= 7; $day++) {

            $entryCount = random_int(0, 9);

            for ($x = 0; $x < $entryCount; $x++) {
                $startTime = random_int(6, 20);
                $endTime = $startTime + 1;

                TimeSlot::create([
                    'organisation_id' => $org->id,
                    'location_id' => $location->id,
                    'start_time' => "{$startTime}:00",
                    'end_time' => "{$endTime}:00",
                    'day' => $day
                ]);
            }
        }

        $timeSlot = TimeSlot::create([
            'organisation_id' => $org->id,
            'location_id' => $location->id,
            'start_time' => '8:00',
            'end_time' => '10:00',
            'day' => 1
        ]);

        Availability::create([
            'organisation_id' => $org->id,
            'time_slot_id' => $timeSlot->id,
            'week_occurring' => '13/06/2022',
            'user_id' => $user->id,
            'available' => 1,
            'always_available' => 0,
        ]);

        Availability::create([
            'organisation_id' => $org->id,
            'time_slot_id' => $timeSlot->id,
            'week_occurring' => '13/06/2022',
            'user_id' => $user2->id,
            'available' => 1,
            'always_available' => 1,
        ]);
    }
}
