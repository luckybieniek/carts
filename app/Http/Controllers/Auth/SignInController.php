<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SignInController extends Controller
{
    public function index()
    {
        return view('common');
    }

    public function store(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])
            ->with('organisation')
            ->first();

        if ($user === null || $user->active === 0) {
            return response()->json([
                'error' => 'Invalid credentials'
            ], 401);
        }

        if (Auth::attempt($credentials)) {
            session()->put('org_id', $user->organisation->id);

            return redirect(\route('home.index'));
        }

        return response()->json([
            'error' => 'Invalid credentials'
        ], 401);
    }
}
