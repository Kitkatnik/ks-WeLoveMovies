const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

async function list(req, res, next){
    const { movieId } = req.params;

    if(movieId){
        const data = await service.list();
        res.json({ data: data
            .filter(movie => movie.movie_id == movieId) });
    } else {
        const reduceMovies = reduceProperties("theater_id", {
            movie_id: ["movies", null, "movie_id"],
            title: ["movies", null, "title"],
            rating: ["movies", null, "rating"],
            runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
        });
        const data = await service.list();
        res.json({ data: reduceMovies(data) });
    }

}

module.exports = {
    list: asyncErrorBoundary(list),
}