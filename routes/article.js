const Express = require('express');
const router = Express.Router();
const mongoose = require('mongoose');
const Article = require('./../models/article');

router.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt:'desc'})
    res.render('articles/index', { articles: articles })
})
router.get('/create', (req, res) => {
    res.render('articles/blank', { article: new Article(), page: 'Create'});
})
router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveAndRedirectTo(''))

router.get('/:id', async (req, res) => {
    res.render('articles/show', { article: await Article.findById(req.params.id)})
})
router.get('/edit/:id', async (req, res) => {
    res.render('articles/blank', { article: await Article.findById(req.params.id), page: 'Edit'})
})
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveAndRedirectTo(''))

router.delete('/delete/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/articles')
})

function saveAndRedirectTo(pathTo) {
    return async (req, res) => {

        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
    
        try {
            article = await article.save();
            res.redirect(`/articles#${pathTo}`);
        } catch (e) {
            console.log(e);
            res.render('articles/blank', { article: req.article, error: e, page: pathTo });
        }
    }
}
module.exports = router