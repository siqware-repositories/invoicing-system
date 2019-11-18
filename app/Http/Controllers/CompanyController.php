<?php

namespace App\Http\Controllers;

use App\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /*edit*/
    public function edit($id){
        return Company::findOrFail($id);
    }
    /*update*/
    public function update(Request $request,$id){
        $input = $request->all();
        $update = Company::findOrFail($id);
        $request->validate([
            'owner' =>'required',
            'company' =>'required',
            'tel' =>'required',
            'email' =>'required',
            'address' =>'required',
            'logo' =>'required',
        ]);
        $update->owner = $input['owner'];
        $update->company = $input['company'];
        $update->tel = $input['tel'];
        $update->email = $input['email'];
        $update->address = $input['address'];
        $update->logo = $input['logo'];
        $update->save();
        return $update;
    }
}
