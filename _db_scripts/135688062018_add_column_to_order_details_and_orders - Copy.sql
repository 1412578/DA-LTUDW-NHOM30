ALTER TABLE `orders`
  ADD COLUMN `buyer_name` VARCHAR(255) NOT NULL DEFAULT "",
  ADD COLUMN `buyer_email` VARCHAR(255) NOT NULL DEFAULT "",
  ADD COLUMN `buyer_phone` VARCHAR(255) NOT NULL DEFAULT "";

ALTER TABLE `order_details`
  ADD COLUMN `price` FLOAT NOT NULL DEFAULT 0,
  ADD COLUMN `total_price` FLOAT NOT NULL DEFAULT 0;
