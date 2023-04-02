const express = require('express');
const dotEnv = require('dotenv')
const app = express();
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { PORT, MONGO_ADRESS } = require('./utils/constants');
const { centerRouter } = require('./routes');
const { handleErrors } = require('./middlewares/handleError');
const { limiter } = require('./helpers/limiter')


mongoose.connect(MONGO_ADRESS);

// app.use(limiter)

dotEnv.config()

app.use(helmet())

app.disable('x-powered-by');

app.use(bodyParser.json());

app.use(cors());

app.options('*', cors());

app.use(requestLogger)

app.use('/', centerRouter)


app.use(errorLogger)


app.use(handleErrors)



app.listen(PORT, () => {
    if (process.env.NODE_ENV === 'dev') {
        console.log(`everything works at port ${PORT}`);
    }
});

