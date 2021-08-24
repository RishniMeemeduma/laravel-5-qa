<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    public function getToken(Request $request)
    {
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
}
