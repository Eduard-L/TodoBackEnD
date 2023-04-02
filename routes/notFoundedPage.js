const notFoundedPage = require('express').Router();
const { handleNotFoundedPage } = require('../controllers/notFoundPage');

notFoundedPage.use('*', handleNotFoundedPage);

module.exports = { notFoundedPage };