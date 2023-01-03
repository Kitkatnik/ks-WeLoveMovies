const knex = require("../db/connection");

function list(movieId) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*", "c.*")
        .where({ movie_id: movieId })
}

function read(reviewId){
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first();
}

function readWithCritics(reviewId){
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*", "c.*")
        .where({ review_id: reviewId })
}

function update(updatedReview){
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")
        .then( (updatedRecord) => updatedRecord[0]);
}

function destroy(reviewId){
    return knex("reviews")
        .where({ review_id: reviewId })
        .del();
}

module.exports = {
    list,
    read,
    readWithCritics,
    update,
    delete: destroy,
}