<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseAPIController extends Controller
{
    public function OK($data= [], $message = "", $status = 200)
    {
        return response()->json(['data' => $data, 'message' => $message, 'status' => true], $status);
    }

    public function delete($data= [], $message = "", $status = 200)
    {
        return response()->json(['data' => $data, 'message' => $message, 'status' => true], $status);
    }

    public function error($result = [], $message="", $status = 417)
    {
        return response()->json(['data' => $result, 'message' => $message, 'status' => false], $status);
    }
}
