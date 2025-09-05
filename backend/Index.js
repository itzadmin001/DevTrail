const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectDB = require('./Db/Db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { passport } = require('./Service/GithubAuth');
const userRouter = require('./Routers/UserRouter');
const cors = require('cors');
const { MarkdownRouter } = require('./Routers/MarkdownRouter');
const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: process.env.JWT_SECRET || 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', userRouter);
app.use("/markdowns", MarkdownRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port 3000');
});