<?php

namespace App\Http\Middleware;

use App\Http\Middleware\Traits\ModifyRequestKeys;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SnakeCaseRequestData
{
    use ModifyRequestKeys;

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $data = $this->snakeCase($request->input());
        $request->replace($data);

        return $next($request);
    }
}
