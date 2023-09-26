<?php

namespace App\Enums;

enum Responses: int
{
    case Ok = 200;
    case Created = 201;
    case Accepted = 202;

    case BadRequest = 400;
    case Unauthorized = 401;
    case NotFound = 404;

    case InternalServerError = 500;
}
