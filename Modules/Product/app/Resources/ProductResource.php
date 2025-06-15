<?php

namespace Modules\Product\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        $data =  [
            'id'          => $this->id,
            'name'        => $this->name,
            'slug'        => $this->slug,
            'description' => $this->description,
            'price'       => $this->price,
            'stock'       => $this->stock,
            'main_image'  => $this->main_image,
            'category'    => new CategoryResource($this->whenLoaded('category')),

        ];

         // If this resource is loaded via a pivot (e.g., order->products), include pivot data
         if ($this->pivot) {
            $data['quantity'] = $this->pivot->quantity;
        }

        return $data;

    }
}