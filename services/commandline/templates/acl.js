module.exports = function(){
    var template =
`module.exports = {
    "unauthenticated": {
        "User" : {
            find : true,
            findOne : true,
            create : true,
            update : true,
            deleteOne : true
        }
    }
}`
    return template
}

