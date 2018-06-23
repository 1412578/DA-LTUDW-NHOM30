module.exports = function applicationError(id, options){
    var err = new Error();
    err.isApplicationError = true;
    err.applicationErrorId = id;
    err.applicationOptions = options;
    return err;
}