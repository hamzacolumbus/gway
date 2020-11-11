const express = require('express');
const session = require('express-session');
const cors = require('cors');
const config = require('./config');
const app = express();
app.use(express.json());

app.use(cors({
  credentials: true
}));
app.use(
  session(
    {
      secret: 's',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false
      }
    }
  )
);


app.use('/login', require('./routes/login'));
app.use('/signin', require('./routes/signin'));
app.use('/authorization-code', require('./routes/oauth'));
app.use('/user', require('./routes/user'));
app.use('/projects', require('./routes/projects'));

app.listen(8085, () => console.log(`started`));