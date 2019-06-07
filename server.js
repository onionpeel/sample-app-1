const express = require('express');
const connectDb = require('./config/connectDb');
const path = require('path');

const app = express();

//Use this for production.  The 'or' || operator does not work properly in development
const port = process.env.PORT;
//Use this for development
// const port = 5000;

connectDb();

app.use(express.json({extended: false}));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
