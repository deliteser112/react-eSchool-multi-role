const noteModel = require("./noteModel");

let test = new noteModel({name : 'test_v1'})
test.save(function(err){
    if(err) return handleError(err)
})