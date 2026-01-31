const express = require('express');
const router = express.Router();
const db = require("../sqlite3_load/load_db");
const User = require('../models/user.js');
//let GetDBList = [];
let allUsers_p = [];
let users = [];

router.get('/', async (req, res, next) => {
    User.User(db, function (err, content) {
        if (err) throw (err);
        allUsers_p = content;
    })
    //GetDBList = [];
    return res.render('rootdomain', {
        title: 'Accessing: ' + req.vhost.hostname,

    });

});

router.post('/', async (req, res) => {
    try {
        let data = {
            email: User.SantyEmail(req.body.email),
            username: User.SantyStr(req.body.username),
            firstname: User.SantyStr(req.body.firstname),
            lastname: User.SantyStr(req.body.lastname),
            // yourlink: User.SantyLink(req.body.yourlink),
            // yourtitle: User.SantyStr_keep_space(req.body.yourtitle),
            // yourmota: User.SantyStr_keep_space(req.body.yourmota),
            // imglink: User.SantyLink(req.body.imglink),
            // typeshow: User.SantyStr(req.body.typeshow),

        };
        let check_username_exist = null;
        User.User(db, function (err, content) {
            if (err) throw (err);
            users = content;
        })
    
        const isValidUrl = urlString => {
            let url;
            try {
                url = new URL(urlString);
            }
            catch (e) {
                return false;
            }
            return url.protocol === "http:" || url.protocol === "https:";
        }

        users.map((user) => {
            if (user.username.toLowerCase() == data.username.toLowerCase()) {
                check_username_exist = 1;
            }
        });
    

        if (check_username_exist != 1) {
            let lastid = allUsers_p.length;
            let data_fullname = data.firstname + " " + data.lastname;
            let data_sub_domain = data.username + "." + init_app.DOMAIN; // random Sub Domain
            let gen_rand_ext_path = User.randStr(10); // random Url Path

            db.run(
                `INSERT INTO migration VALUES (?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [lastid, data_fullname, data.email, data.username, data_sub_domain, gen_rand_ext_path, data.yourlink, data.yourtitle, data.yourmota, data.imglink, data.typeshow, 0],
                function (error) {
                    if (error) {
                        return console.log(error.message);
                    }
                    //          console.log(`Dang ky' new user Inserted a row with the id: ${this.lastID}`);
                }
            );

            return res.end('<a href="http://' + data_sub_domain + '/' + gen_rand_ext_path + '">Your Link is ready. Go to http://' + data_sub_domain + '/' + gen_rand_ext_path + '</a>');

        } else {
            return res.end('<a href="">Your Link is not ValidUrl. Go back ##</a>');

        }
        // console.log(data_sub_domain);

    } catch (error) {
        return res.json({ error: "Resource not found" });
        //res.end(JSON.stringify({error:"Resource not found"}));
    }
});

module.exports = router;
