const knex = require("../db/connection");

function list(is_showing){
    if(is_showing){
        return knex("movies")
            .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
            .select("movies.*")
            .where({"mt.is_showing": true})
            .groupBy("movies.movie_id")
    } else {
        return knex("movies")
            .select("*");
    }
}

function read(movie_id){
    return knex("movies")
        .where({"movie_id": movie_id})
        .first();
}

module.exports = {
    list,
    read
}