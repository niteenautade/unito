module.exports = function(){
    return `"use strict"
const find = require("./find")
const findOne = require("./findOne")
const create = require("./create")
const update = require("./update")
const deleteOne = require("./deleteOne")
module.exports = {
    find: find,
    findOne: findOne,
    create: create,
    update: update,
    deleteOne: deleteOne,
}`
}
