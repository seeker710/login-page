const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config({path: './config.env'});
const PORT = process.env.PORT || 5000;

// database part
require('./database/connect');

// router part
app.use(express.json());
app.use(require('./router/route'));

if(process.env.NODE_ENV=='production') {
  const path = require('path');
  app.get('/', (req, res) => {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`server started at port number ${PORT}`);
})