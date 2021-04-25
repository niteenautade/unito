"use strict";
const create = require("./blueprint-templates/create")()
const deleteOne = require("./blueprint-templates/deleteOne")()
const find = require("./blueprint-templates/find")()
const findOne = require("./blueprint-templates/findOne")()
const getModelName = require("./blueprint-templates/getModelName")()
const index = require("./blueprint-templates/index")()
const update = require("./blueprint-templates/update")()
module.exports = {
    create,
    deleteOne,
    find,
    findOne,
    getModelName,
    index,
    update,
}