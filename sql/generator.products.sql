insert into products(category_id, name, url, image, price, in_stock)
SELECT
(array[11,12,22,27,28,29,30,31,32])[floor(random() * 9 + 1)] as category_id,
(array['potato', 'orange', 'onion', 'carrot', 'lemon', 'banana', 'apple', 'chanterelles'])[floor(random() * 8 + 1)] as name,
md5(random()::text) as url,
(array['potato.jpg', 'orange.jpg', 'onion.jpg', 'carrot.jpg', 'lemon.jpg', 'banana.jpg', 'apple.jpg', 'chanterelles.jpg'])[floor(random() * 8 + 1)] as image,
floor(random()*100) as price,
true as in_stock
FROM generate_series(1, 200);
