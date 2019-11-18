<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('companies')->insert([
            'owner' => 'Tun Cham Roeun',
            'company' => 'SiwWare',
            'tel' => '078654923',
            'email' => 'chamroeuntun25@outlook.com',
            'address' => 'Siem Reap',
            'logo' => 'logo.png'
        ]);
    }
}
