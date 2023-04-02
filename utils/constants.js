const PORT = 3000;
const SALT = 10;
const MONGO_ADRESS = 'mongodb://localhost:27017/tododb';
const LOGIN_ERROR = 'Please LogIn';
const DEFAULTERROR_CODE = 500;
const DEFAULTERROR_MESSAGE = "server error";
const LOGIN2_ERROR = 'Incorrect email or password';
const DEV_MODE = 'dev';
const DEV_SECRET = 'devSecret';
const NOT_VALID_DATA = 'Your data is not valid';
const DATA_NOT_FOUNDED = 'Your data not founded';
const CONFLICT_ERROR = 'This resource is already excist';
const PAGE_NOT_FOUNDED = 'Page does not excist'
const FORBIDDEN_ERROR = 'You are not alloweded to make this request'

module.exports = {
    PORT,
    SALT,
    MONGO_ADRESS,
    LOGIN_ERROR,
    DEFAULTERROR_CODE,
    DEFAULTERROR_MESSAGE,
    LOGIN2_ERROR,
    DEV_MODE,
    DEV_SECRET,
    NOT_VALID_DATA,
    DATA_NOT_FOUNDED,
    CONFLICT_ERROR,
    PAGE_NOT_FOUNDED,
    FORBIDDEN_ERROR
}