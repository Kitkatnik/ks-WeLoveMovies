const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res, next){
    const data = await service.list(req.query.is_showing);
    res.json({ data });
}

async function movieExists(req, res, next){
    const { movieId } = req.params;

    const movie = await service.read(movieId);
    if(movie){
        res.locals.movie = movie;
        return next();
    }
    return next({ status: 404, message: "Movie cannot be found." });
}

async function read(req, res, next){
    const { movie } = res.locals;
    res.json({ data: movie });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [
        asyncErrorBoundary(movieExists), 
        asyncErrorBoundary(read)
    ],
}