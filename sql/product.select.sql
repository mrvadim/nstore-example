select
p.product_id,
p.name,
p.url,
p.image,
p.description,
p.price,
p.in_stock,
count(u.comment) cmnts,
count(u.wishlist) filter (where u.wishlist) wish
from products p
left join users_products u using(product_id)
where p.product_id = 1
group by p.product_id
