const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const history = require('connect-history-api-fallback');
require('dotenv').config({path: path.join(__dirname, '../.env')});

const documentsRouter = require('./routes/documents');
const categoriesRouter = require('./routes/categories');
const videosRouter = require('./routes/videos');
const scenariosRouter = require('./routes/scenarios');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// routes
app.use('/api/documents', documentsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/videos', videosRouter);
app.use('/api/scenarios', scenariosRouter);


app.use(history());
app.use(express.static(path.join(__dirname, '../../dist/')));


async function start(){
  try{
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    app.listen(process.env.PORT, () => {
      console.log('-----> ', `Server start on port ${process.env.BASE_URL}`);
    })
  } catch (e) {
    console.log('-----> ', e);
  }
}

start();
