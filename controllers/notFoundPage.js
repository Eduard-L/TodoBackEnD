const { NotFoundError } = require("../utils/errorHandlers")
const { PAGE_NOT_FOUNDED } = require('../utils/constants')


const handleNotFoundPage = (req, res, next) => {
    // next(new NotFoundError("the page not found"))
    res.status(200).send({ message: PAGE_NOT_FOUNDED })
}

module.exports = { handleNotFoundPage }