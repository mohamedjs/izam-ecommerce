<?php

namespace Modules\Product\Filters;

use Illuminate\Database\Eloquent\Builder;

interface FilterInterface
{
    public function apply(Builder $query, $value): Builder;
} 