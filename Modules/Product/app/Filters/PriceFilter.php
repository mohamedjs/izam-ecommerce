<?php

namespace Modules\Product\Filters;

use Illuminate\Database\Eloquent\Builder;

class PriceFilter implements FilterInterface
{
    public function apply(Builder $query, $value): Builder
    {
        if (isset($value['min'])) {
            $query->where('price', '>=', $value['min']);
        }
        if (isset($value['max'])) {
            $query->where('price', '<=', $value['max']);
        }
        return $query;
    }
} 