module.exports = function applicationError(id){
    var err = new Error();
    err.isApplicationError = true;
    err.applicationErrorId = id;
    return err;
}