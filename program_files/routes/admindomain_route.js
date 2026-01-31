const express = require('express');
const router = express.Router();
const db = require("../sqlite3_load/load_db");
const User = require('../models/user.js');
let allUsers_p = [];
let odds = [];
let users = [];
let allrec = [];

router.use(async (req, res, next) => {
    User.User(db, function (err, content) {
        if (err) throw (err);
        users = content;
    })

    next();

});

router.get('/', async (req, res, next) => {
        return res.render('admindomain', {
            title: 'Accessing: ' + req.vhost.hostname,           
            users: users.map((user) => {
                return {
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
            }),

        });

});

router.post('/', async (req, res) => {
    try {
        let data = {
            email: User.randStr(10), //User.SantyEmail(req.body.email),
            username: User.randStr(10), //User.SantyStr(req.body.username),
            firstname: User.randStr(10), //User.SantyStr(req.body.firstname),
            lastname: User.randStr(10), //User.SantyStr(req.body.lastname),
            yourlink: User.SantyLink(req.body.yourlink),
            yourtitle: User.SantyStr_keep_space(req.body.yourtitle),
            yourmota: User.SantyStr_keep_space(req.body.yourmota),
            imglink: User.SantyLink(req.body.imglink),
            typeshow: User.SantyStr(req.body.typeshow),

        };
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

        if (isValidUrl(data.yourlink) && isValidUrl(data.imglink)) {
            let lastid = users.length;
            let output = '<p><label for="list_url">Save your list, before exit:</label></p>';
            output += '<textarea id="list_url" name="list_url" rows="25" cols="100">';
            var foo = Array(100).fill().map((v, i) => i);
            odds = foo.map((user) => {
                data.email = User.randStr(10); //User.SantyEmail(req.body.email),
                data.username = User.randStr(10); //User.SantyStr(req.body.username),
                data.firstname = User.randStr(10); //User.SantyStr(req.body.firstname),
                data.lastname = User.randStr(10); //User.SantyStr(req.body.lastname),

                let data_fullname = data.firstname + " " + data.lastname;
                let data_sub_domain = User.randStr(10) + "." + init_app.DOMAIN; // random Sub Domain
                let gen_rand_ext_path = User.randStr(10); // random Url Path
                //console.log(data_sub_domain);
                /*
                db.run(
                    `INSERT INTO migration VALUES (?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [lastid++, data_fullname, data.email, data.username, data_sub_domain, gen_rand_ext_path, data.yourlink, data.yourtitle, data.yourmota, data.imglink, data.typeshow, 0],
                    function (error) {
                        if (error) {
                            return console.log(error.message);
                        }
                        //          console.log(`Dang ky' new user Inserted a row with the id: ${this.lastID}`);
                    }
                );
                */
                output += 'http://' + data_sub_domain + '/' + gen_rand_ext_path + '\n';
                return data_sub_domain;

            });
            output += '</textarea><br>Your Link is ready. Save it - Go ';
            return res.end(output);

        } else {
            return res.end('<a href="#">Your Link is not ValidUrl. Go back #</a>');

        }

    } catch (error) {
        return res.json({ error: "Resource not found" });
        //res.end(JSON.stringify({error:"Resource not found"}));
    }
});

module.exports = router;
