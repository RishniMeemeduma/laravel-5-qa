<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

class LoginController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'username'=>'required|string',
            'password' => 'required|string'
        ]);
        $request->request->add([
            'grant_type'=>'password',
            'client_id'=>4,
            'client_secret'=>'pXxa4MsRp4IDPf6T46XBy0FeH93QWMqWzPUUkprm',
            'username'=> $request->username,
            'password'=>$request->password,
        ]);
        $requestToken = Request::create(env('APP_URL'). '/oauth/token','post');
        $response = Route::dispatch($requestToken);
        return $response;
    }

    public function destroy()
    {
        request()->user()->token()->revoke();

        return response()->noContent();
    }
}
