<?php

namespace App\Enums;

enum Roles: string
{
    case ADMIN = 'admin';
    case USER = 'user';

    public function getLabel(): string
    {
        return match ($this) {
            Roles::ADMIN => 'Administrator',
            Roles::USER => 'User'
        };
    }
}
