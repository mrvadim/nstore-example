CREATE VIEW random_products_limit_5 as
select c.name c_name, c.url c_url, p.product_id, p.name, p.url p_url, p.image, p.price, p.in_stock from products p
inner join categories c using(category_id)
where p.in_stock = true 
ORDER BY random() limit 5



CREATE VIEW random_categories_limit_5 as
select c2.category_id, c2.name, c2.url from categories c1
join categories c2 on c1.category_id = c2.parent_id
where c1.parent_id is not null
order by random() 
limit 5