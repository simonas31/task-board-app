<?php

namespace App\Http\Middleware\Traits;

use Illuminate\Support\Str;

trait ModifyRequestKeys
{
    protected function camelize(array $data): array
    {
        foreach ($data as $key => $value) {
            $camelizedKey = Str::camel((string) $key);
            if (is_array($value)) {
                $data[$camelizedKey] = $this->camelize($value);
                unset($data[$key]);
            } else if (!isset($data[$camelizedKey])) {
                $data[$camelizedKey] = $value;
                unset($data[$key]);
            }
        }
        return $data;
    }

    protected function snakeCase(array $data): array
    {
        foreach ($data as $key => $value) {
            $snakeCaseKey = Str::snake((string) $key);
            if (is_array($value)) {
                $data[$snakeCaseKey] = $this->snakeCase($value);
                unset($data[$key]);
            } else if (!isset($data[$snakeCaseKey])) {
                $data[$snakeCaseKey] = $value;
                unset($data[$key]);
            }
        }
        return $data;
    }
}
