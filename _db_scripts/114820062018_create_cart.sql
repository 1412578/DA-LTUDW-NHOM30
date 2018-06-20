CREATE TABLE IF NOT EXISTS `mydb`.`cart` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`product_id` INT NOT NULL,
	`product_quantity` INT NOT NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `fk_cart_details_product`
		FOREIGN KEY (`product_id`)
		REFERENCES `mydb`.`product` (`id`),
	CONSTRAINT `fk_cart_user`
		FOREIGN KEY (`user_id`)
		REFERENCES `mydb`.`user` (`id`),
	UNIQUE (`user_id`, `product_id`)
) ENGINE = InnoDB