<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotFoundController extends Controller
{
    public function index()
    {
        return 'The page you are looking for does not exist!';
    }
}
