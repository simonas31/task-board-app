<?php

namespace App\Http\Middleware;

use App\Http\Middleware\Traits\ModifyRequestKeys;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CamelizeResponseData
{
    use ModifyRequestKeys;

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // camelize
        $data = $this->camelize($response->getData(true));
        $response->setData($data);

        return $response;
    }
}
