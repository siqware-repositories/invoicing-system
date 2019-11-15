<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function list()
    {
        return User::all();
    }
    /*store*/
    /**
     * @param Request $request
     * @return User
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $request->validate([
            'name' => 'required',
            'profile' => 'required',
            'telephone' => 'required',
            'gender' => 'required',
            'type' => 'required',
            'role' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);
        $store = new User();
        $store->name = $input['name'];
        $store->profile = $input['profile'];
        $store->telephone = $input['telephone'];
        $store->gender = $input['gender'];
        $store->type = $input['type'];
        $store->role = $input['role'];
        $store->email = $input['email'];
        $store->password = Hash::make($input['password']);
        $store->save();
        return $store;
    }
    public function destroy($id){
        User::findOrFail($id)->delete();
    }
}
