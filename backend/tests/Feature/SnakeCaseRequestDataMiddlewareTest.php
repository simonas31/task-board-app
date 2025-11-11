<?php

namespace Tests\Feature;

use App\Http\Middleware\SnakeCaseRequestData;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Request;
use Tests\TestCase;

class SnakeCaseRequestDataMiddlewareTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_simple_snake_case_request(): void
    {
        $request = new Request();

        $request->merge([
            'firstName' => 'John',
            'lastname' => 'Doe',
        ]);

        $middleware = new SnakeCaseRequestData();

        $middleware->handle($request, function (Request $request) {
            $data = $request->input();
            $this->assertArrayIsEqualToArrayIgnoringListOfKeys([
                'first_name' => 'John',
                'lastname' => 'Doe'
            ], $data, []);
            return response()->json();
        });
    }

    public function test_nested_snake_case_request(): void
    {
        $request = new Request();

        $request->merge([
            'firstName' => 'John',
            'lastname' => 'Doe',
            'contactInfo' => [
                'emailAddress' => 'test@gmail.com',
                'primary' => true,
            ]
        ]);

        $middleware = new SnakeCaseRequestData();

        $middleware->handle($request, function (Request $request) {
            $data = $request->input();
            $this->assertArrayIsEqualToArrayIgnoringListOfKeys([
                'first_name' => 'John',
                'lastname' => 'Doe',
                'contact_info' => [
                    'email_address' => 'test@gmail.com',
                    'primary' => true,
                ]
            ], $data, []);
            return response()->json();
        });
    }
}
