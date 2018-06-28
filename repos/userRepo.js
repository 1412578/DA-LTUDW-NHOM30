var db = require('../fn/db');

exports.add = user => {
	var sql = `insert into user(username, password, role, email, name, address, gender, birthday, phone) values('${user.username}', '${user.password}', '${user.role}', '${user.email}', '${user.name}', '${user.address}', '${user.gender}', ' ${user.birthday}', '${user.phone}')`;
	return db.save(sql);

}
exports.update = user=>{
	var sql = `UPDATE user SET name = '${user.name}', address='${user.address}', gender = '${user.gender}', birthday = '${user.birthday}', phone='${user.phone}' WHERE username = user.username`;
	return db.save(sql);
}
exports.check = username =>{
	var sql = `SELECT username FROM user WHERE username = '${username}'`;
	return db.load(sql);
}
exports.load = username =>{
	var sql = `SELECT id, username, email, name, address, gender, birthday, phone FROM user WHERE username = '${username}'`;
	return db.load(sql);
}
exports.findByUsername = username => {
	var sql = `select id, name, password from user where username = '${username}'`;
	return db.load(sql);
}