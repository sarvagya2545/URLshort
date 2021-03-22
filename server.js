require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Link = require('./models/Link');
const jwt = require('jwt-simple');

const { getRandomName } = require('./utils');
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.NODE_ENV !== 'production' ? 'mongodb://localhost:27017/URI' : process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => { console.log('MongoDB connection established') })
    .catch((err) => { console.log('Connection failed', err) })
;

app.get('/', (req, res) => {
    res.render('index', { origin: req.get('host') });
})

app.post('/', async (req, res) => {
    // console.log(req.body);
    const { url, isKeyword, keyword } = req.body;

    if(url.trim() === '') {
        return res.send('Invalid URL');
    }

    var name;
    if(isKeyword) {
        const foundLink = await Link.findOne({ name: keyword });
        if(foundLink) {
            return res.send('Error: Link is already in use');
        }

        name = keyword;
    } else {
        name = getRandomName();
    }

    const newLink = new Link({ url, name });
    newLink.save();
    const payload = `${url}%${name}`;
    const secret = process.env.JWT_SECRET;
    const token = jwt.encode(payload, secret);
    res.redirect(`/success/${token}`);
})

app.get('/success/:token', (req, res) => {
    const decodedToken = jwt.decode(req.params.token, process.env.JWT_SECRET);
    const [ url, name ] = decodedToken.split('%');

    res.render('success', { url, shortURLname: name, origin: req.get('host') });
})

app.get('/urls/all', async (req, res) => {
    const data = await Link.find({});
    res.render('tables', { data, origin: req.get('host') });
})

app.get('/:short', async (req, res) => {
    // get the short name and look it up in the database and then redirect.
    const name = req.params.short;
    await Link.findOne({ name: name })
        .then((link) => {
            res.redirect(link.url);
        })
        .catch(err => {
            res.send('404 Not Found');
        });
})

app.listen(port, () => console.log(`Server started on port ${port}`));