const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const db = require("../sqlite3_load/load_db.js");
let users = [];
var one_user = [];
var link_root = '';
let output_p = '';
let link_root_p = '';
let output_s = '';
let link_root_s = '';

router.use(async (req, res, next) => {
    User.User(db, function (err, content) {
        if (err) throw (err);
        users = content;
    })

    users.map((user) => {
        if (user.sub_domain.toLowerCase() == req.headers.host.toLowerCase()) {
            res.profile = {
                _id: user._id,
                email: user.email,
                username: user.username,
                link: 'http://' + user.sub_domain,
                fullname: user.fullname,
                ext_path: user.ext_path,
                ext_log: user.ext_log,
                tieu_de: user.tieu_de,
                mo_ta: user.mo_ta,
                link_hinh: user.link_hinh,
                type_display: user.type_display,
            };
            link_root_p = res.profile.ext_log;
        }
    });
    //console.log(res.profile);
    next();

});

router.get('/', async (req, res, next) => {
    if (res.profile) {
        return res.render('subdomain', {
            subdomain: req.vhost.hostname,
            profile: res.profile,
            title: 'Accessing: ' + req.vhost.hostname,
        });
    } else {
        return res.render('subdomain', {
            subdomain: req.vhost.hostname,
            profile: null,
            title: 'Invalid: ' + req.vhost.hostname,
            create_subdomain_link: 'http://' + init_app.DOMAIN + ":" + init_app.PORT,
        });
    }
});

router.get('/:id', async (req, res, next) => {
    const url = req.originalUrl.slice(1);
    let tim_thay_ext_path = null;
    var check_odds = users.map((user) => {
        if (user.ext_path == req.params['id']) {
            tim_thay_ext_path = 1;
            one_user.push(user.ext_log); one_user.push(user.tieu_de); one_user.push(user.mo_ta); one_user.push(user.link_hinh); one_user.push(user.type_display);
            return user;
        }
    });

    var odds = users.filter(function (user) {
        return user.ext_path == url;
    });

    if (tim_thay_ext_path == 1) {
        let output = 'title=' + one_user[1] + '\n ';
        output += 'description=' + one_user[2] + '\n ';
        output += 'image=' + one_user[3] + '\n ';
        output += 'type=' + one_user[4] + '\n ';
        output += 'link=' + one_user[0] + '\n ';;
        one_user = [];
        if (res.profile) {
            return res.end(output);
        } else {
            return res.render('subdomain', {
                subdomain: req.vhost.hostname,
                profile: null,
                title: 'Invalid: ' + req.vhost.hostname,
                create_subdomain_link: 'http://' + init_app.DOMAIN + ":" + init_app.PORT,
            });
        }

    }
    if (tim_thay_ext_path == null) {
        res.end(JSON.stringify({ error: "Resource not found" }));
    }

});


module.exports = router;
