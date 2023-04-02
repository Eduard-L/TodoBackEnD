class Unauthorized extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}
class ForbiddentError extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
    }
}
class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.status = 409;
    }
}

module.exports = {
    NotFoundError, ForbiddentError, BadRequestError, Unauthorized, ConflictError,
};
