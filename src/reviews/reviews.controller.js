const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

const reducer = reduceProperties("review_id", {
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
});

async function list(req, res, next){
    const { movieId } = req.params;

    const data = await service.list(movieId);
    res.json({ data: reducer(data) });
}

async function reviewExists(req, res, next){
    const { reviewId } = req.params;

    const review = await service.read(reviewId);
    if(review){
        res.locals.review = review;
        return next();
    }
    return next({ status: 404, message: "Review cannot be found." });
}

async function update(req, res, next){
    const { reviewId } = req.params;

    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };

    await service.update(updatedReview)

    const data = await service.readWithCritics(reviewId);
    res.json({ data: reducer(data)[0] });
}

async function destroy(req, res, next){
    const { review } = res.locals;
    await service.delete(review.review_id)
    res.sendStatus(204);
}

module.exports = {
    list: asyncErrorBoundary(list),
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}