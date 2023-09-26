<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class CSRFController extends Controller
{
    public function index()
    {
        return csrf_token();
    }
}
