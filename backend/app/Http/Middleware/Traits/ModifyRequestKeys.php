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
                $this->unsetData($data, $camelizedKey, (string) $key);
            } else if (!isset($data[$camelizedKey])) {
                $data[$camelizedKey] = $value;
                $this->unsetData($data, $camelizedKey, $key);
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
                $this->unsetData($data, $snakeCaseKey, $key);
            } else if (!isset($data[$snakeCaseKey])) {
                $data[$snakeCaseKey] = $value;
                $this->unsetData($data, $snakeCaseKey, $key);
            }
        }
        return $data;
    }

    /**
     * Unset data if keys dont match
     * @param array $data
     * @param string $checkKey
     * @param string $removeKey
     * @return void
     */
    private function unsetData(array &$data, string $checkKey, string $removeKey): void
    {
        if ($checkKey !== $removeKey) {
            unset($data[$removeKey]);
        }
    }
}
