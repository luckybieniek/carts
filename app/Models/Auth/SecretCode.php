<?php

namespace App\Models\Auth;

use App\Enums\AlphaNumerics;
use App\Enums\Statuses;
use App\Exceptions\Custom\InfiniteLoopException;
use App\Models\Organisation;
use App\Services\Codes\Generator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecretCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'organisation_id',
        'code',
        'status_id',
        'used_by_user_id',
        'used_on_date',
    ];

    public function organisation()
    {
        return $this->belongsTo(Organisation::class);
    }

    public static function generate(): self
    {
        return self::create([
            'organisation_id' => 1,
            'code' => self::uniqueCode(),
            'status_id' => Statuses::Active->value
        ]);
    }

    private static function uniqueCode($attempt = 0): string
    {
            $code = Generator::new()->make();

        if (self::where('code', $code)->count() > 1) {
            return self::uniqueCode($attempt + 1);
        }

        return $code;
    }
}
