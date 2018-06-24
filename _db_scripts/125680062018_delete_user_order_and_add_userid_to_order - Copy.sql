DROP TABLE `mydb`.`user_order`;
ALTER TABLE `mydb`.`order` 
	ADD COLUMN `user_id` INT NOT NULL,
	ADD CONSTRAINT `fk_user_order`
		FOREIGN KEY (`user_id`)
		REFERENCES `mydb`.`user` (`id`);