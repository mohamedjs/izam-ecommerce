<?php

namespace Modules\Product\Filters;

use Illuminate\Database\Eloquent\Builder;

class CategoryFilter implements FilterInterface
{
    public function apply(Builder $query, $value): Builder
    {
        return $query->whereHas('category', function($q) use ($value) {
            $q->whereIn('id', $value);
        });
    }
}