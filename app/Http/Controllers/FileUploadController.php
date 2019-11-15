<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    public function upload(Request $request){
        $file = $request->file('file');
        return $file->getClientOriginalName();
    }
}
