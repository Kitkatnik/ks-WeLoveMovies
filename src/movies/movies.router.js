const router = require('express').Router();
const controller = require('./movies.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');
const theatersRouter = require("../theaters/theaters.router")

router.use("/:movieId/theaters", theatersRouter)

router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed)

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);


module.exports = router;