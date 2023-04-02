const { DEFAULTERROR_CODE, DEFAULTERROR_MESSAGE } = require('../utils/constants')
const handleErrors = (err, req, res, next) => {
    console.log(err)
    if (err.status && err.message) {
        res.status(err.status).json({ message: err.message });

        return;
    }
    res.status(DEFAULTERROR_CODE).send({ message: `${DEFAULTERROR_MESSAGE} : ${err} ` });
    return
};

module.exports = { handleErrors };
