const express = require('express');
const connectDb = require('./config/connectDb');

const app = express();
const port = process.env.PORT || 3000;

connectDb();

app.use(express.json({extended: false}));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
