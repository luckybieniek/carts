<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserRoleController extends Controller
{
    public function store(Request $request)
    {
        $authUser = Auth::user();
        if (!$authUser->isSuperAdmin()) {
            return response('Forbidden', 403);
        }

        $user = User::findOrFail($request->user_id);

        if ($user->organisation_id !== $authUser->organisation_id) {
            return response('Forbidden', 403);
        }

        $user->roles()->attach($request->role_id);

        return response('', 201);
    }

    public function delete(Request $request)
    {
        $authUser = Auth::user();
        if (!$authUser->isSuperAdmin()) {
            return response('Forbidden', 403);
        }

        $user = User::findOrFail($request->user_id);

        if ($user->organisation_id !== $authUser->organisation_id) {
            return response('Forbidden', 403);
        }

        $user->roles()->detach($request->role_id);

        return response('Success', 201);
    }
}
