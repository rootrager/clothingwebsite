-- 1. Reset the table (Delete all rows and reset serial ID)
TRUNCATE products RESTART IDENTITY;

-- 2. Insert 9 New Products
INSERT INTO products (title, price, category, image_url, is_new)
VALUES
  -- Category: tops
  ('Oversized Graphic Tee', 45.00, 'tops', '/top-1.jpg', true),
  ('Vintage Bomber Jacket', 120.00, 'tops', '/top-2.jpg', false),
  ('Essentials Hoodie', 85.00, 'tops', '/top-3.jpg', false),

  -- Category: pants
  ('Carpenter Denim', 90.00, 'pants', '/pant-1.jpg', true),
  ('Cargo Parachute Pants', 75.00, 'pants', '/pant-2.jpg', false),
  ('Baggy Sweatpants', 60.00, 'pants', '/pant-3.jpg', false),

  -- Category: shoes
  ('Retro Chunky Runner', 140.00, 'shoes', '/kick-1.jpg', true),
  ('High-Top Court Sneaker', 110.00, 'shoes', '/kick-2.jpg', false),
  ('Urban Slide V2', 55.00, 'shoes', '/kick-3.jpg', false);
