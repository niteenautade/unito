class NotFoundError extends Error{
    constructor(message){
        super()
        this.message = message
        this.name = "NotFoundError"
    }
    get statusCode(){
        return 404
    }
}
class UnauthorizedAccessError extends Error{
    constructor(message){
        super()
        this.message = message
        this.name = "UnauthorizedAccessError"
    }
    get statusCode(){
        return 401
    }
}
class ModuleNotFoundError extends Error{
    constructor(message){
        super()
        this.message = message
        this.name = "ModuleNotFoundError"
    }
}
class TypeNotSetInPayloadError extends Error{
    constructor(message){
        super()
        this.message = message
        this.name = "TypeNotSetInPayloadError"
    }
}
class MalformedTokenSuppliedError extends Error{
    constructor(message){
        super()
        this.message = message
        this.name = "MalformedTokenSuppliedError"
    }
    get statusCode(){
        return 401
    }
}
class ValidationError extends Error{
    constructor(message){
        super()
        this.message = message
        this.name = "ValidationError"
    }
}

module.exports = {
    NotFoundError,
    ValidationError,
    ModuleNotFoundError,
    MalformedTokenSuppliedError,
    TypeNotSetInPayloadError,
    UnauthorizedAccessError
}