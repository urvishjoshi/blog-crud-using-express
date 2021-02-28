const express = require('express');
const app = express();
const articleRouter = require('./routes/article');
const Article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/articles')
})

app.use('/articles', articleRouter)
app.listen(3000, () => { console.log('listening on 3000'); })