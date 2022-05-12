const bcrypt = require('bcrypt');
const { PostModel } = require('../models/PostModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class Controller {
    async index(req,res) {
        const {user} = req.session;

        if (user) {
            return res.redirect('posts');            
        } else {
            const posts = await PostModel.findAll({order: [['createdAt', 'DESC']], limit: 5});
            return res.render('index', {user:user, posts:posts});
        }
    }

    async entrar(req, res) {
        return res.render('cadastro');
    }

    async cadastrar(req, res) {
        const {user} = req.body;
        req.session.user = user;

        return res.redirect('/posts'); 
    }

    async listar(req,res) {
        const {user} = req.session;
        let page = 0;
        let pesquisa = "";
        let order = "";
        (req.query.page != undefined && !isNaN(parseInt(req.query.page))) ? {page} = req.query : page = 0;
        (req.query.pesquisa != undefined) ? {pesquisa} = req.query : pesquisa = "";
        (req.query.order != undefined) ? {order} = req.query : order = 'createdAt DESC';

        const search = {
            where : {autor: {
                [Op.like]: "%"+pesquisa+"%"}},
            order : [order.split(' ')],
            limit: 5,
            offset: 10*page
        }

        if (user) {
            const posts = await PostModel.findAll(search);
            const total = await PostModel.count({where: search.where});
            return res.render('lista', {user:user, posts:posts, total:total});
        } else {
            return res.redirect('/'); 
        }
        
    }

    async postar(req, res) {
        const {user} = req.session;
        const {body} = req;
        
        await PostModel.create(body);
        return res.redirect('/posts');         
    }

    async detalhar(req, res) {
        const {user} = req.session;
        const {id} = req.params;
        
        const post = await PostModel.findAll({where: {id: id}, limit:1});
        
        return res.render('detalha', {user:user, post: post}); 
    }
    
    async editar(req, res) {
        const {user} = req.session;
        const {id} = req.params;
        
        const post = await PostModel.findAll({where: {id: id}, limit:1});

        return res.render('edita', {user:user, post:post});
    }

    async alterar(req, res) {
        const {body} = req;
        
        await PostModel.update(body, {where: {id: body.id}});
        return res.redirect('posts/'+body.id); 
    }

    async sair(req, res) {
        req.session.user = null;

        return res.redirect('/');
    }

}

module.exports = {Controller};