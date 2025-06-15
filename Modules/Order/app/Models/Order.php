<?php

namespace Modules\Order\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Modules\User\Models\User;
use Modules\Product\Models\Product;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'base_price',
        'total_taxes',
        'total_shipping',
        'total_price',
        'product_count',
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
        'total_taxes' => 'decimal:2',
        'total_shipping' => 'decimal:2',
        'total_price' => 'decimal:2',
        'product_count' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class)
            ->withPivot('quantity')
            ->withTimestamps();
    }
}