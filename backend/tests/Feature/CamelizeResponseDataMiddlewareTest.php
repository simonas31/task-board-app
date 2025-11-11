<?php

namespace Tests\Feature;

use App\Http\Middleware\CamelizeResponseData;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Request;
use Tests\TestCase;

class CamelizeResponseDataMiddlewareTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_simple_camelization(): void
    {
        $request = new Request();
        $middleware = new CamelizeResponseData();

        $response = $middleware->handle($request, function () {
            return response()->json([
                'some_data' => 123,
                'other_data' => 'Other Data'
            ]);
        });

        $data = $response->getData(true);

        $this->assertArrayIsEqualToArrayIgnoringListOfKeys([
            'someData' => 123,
            'otherData' => 'Other Data',
        ], $data, []);
    }

    public function test_nested_camelization(): void
    {
        $request = new Request();
        $middleware = new CamelizeResponseData();

        $response = $middleware->handle($request, function () {
            return response()->json([
                'some_data' => 123,
                'other_data' => 'Other Data',
                'nested_1' => [
                    'nested_first' => 1,
                    'nested_second' => [
                        'nested_nested_first' => 11
                    ]
                ]
            ]);
        });

        $data = $response->getData(true);

        $this->assertArrayIsEqualToArrayIgnoringListOfKeys([
            'someData' => 123,
            'otherData' => 'Other Data',
            'nested1' => [
                'nestedFirst' => 1,
                'nestedSecond' => [
                    'nestedNestedFirst' => 11
                ]
            ]
        ], $data, []);
    }
}
