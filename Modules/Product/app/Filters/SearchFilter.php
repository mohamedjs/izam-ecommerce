<?php

namespace Modules\Product\Filters;

use Illuminate\Database\Eloquent\Builder;

class SearchFilter implements FilterInterface
{
    public function apply(Builder $query, $value): Builder
    {
        return $query->where(function ($query) use ($value) {
            $query->where('name', 'like', "%{$value}%")
                  ->orWhere('description', 'like', "%{$value}%");
        });
    }
} 