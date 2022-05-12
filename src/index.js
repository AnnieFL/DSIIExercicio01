const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/view');

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

const session = require('express-session');
app.use(session({
    secret: 'heheh',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))


app.use(express.static('public'));

const routes = require('./routes/routes');
app.use('/', routes);

app.use('*', (req, res) => {
    return res.redirect('/');
})

const { dbcon } = require('./config/connection-db');
// console.log(dbcon);

const PORT = process.env.PORT;
console.log({PORT});
app.listen(PORT, async () => {
    await dbcon();
    
    console.log(`Server iniciado na porta ${PORT}`)
});