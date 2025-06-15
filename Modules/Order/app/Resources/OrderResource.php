<?php

namespace Modules\Order\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'order_number'  => $this->order_number,
            'user'          => new \Modules\User\Resources\UserResource($this->whenLoaded('user')),
            'products'      => \Modules\Product\Resources\ProductResource::collection($this->whenLoaded('products')),
            'base_price'    => $this->base_price,
            'total_taxes'   => $this->total_taxes,
            'total_shipping'=> $this->total_shipping,
            'total_price'   => $this->total_price,
            'product_count' => $this->product_count,
            'created_at'    => $this->created_at,
            'updated_at'    => $this->updated_at,
        ];
    }
}