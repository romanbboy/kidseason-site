const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/config');

const documentsRouter = require('./routes/documents');
const categoriesRouter = require('./routes/categories');
const videosRouter = require('./routes/videos');
const scenariosRouter = require('./routes/scenarios');

const app = express();

// utils
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// routes
app.use('/documents', documentsRouter);
app.use('/categories', categoriesRouter);
app.use('/videos', videosRouter);
app.use('/scenarios', scenariosRouter);

async function start(){
  try{
    await mongoose.connect(config.dbURL, config.dbOptions);

    app.listen(process.env.PORT || config.port, () => {
      console.log('-----> ', `Server start on port ${config.port}`);
    })
  } catch (e) {
    console.log('-----> ', e);
  }
}

start();
