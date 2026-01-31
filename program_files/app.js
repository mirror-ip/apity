init_app = require('./env.js');
const express = require('express');
const path = require('path');
const vhost = require('vhost');

const rootDomainRoutes = require('./routes/rootdomain_route.js');
const subDomainRoutes = require('./routes/subdomain_route.js');
const adminDomainRoutes = require('./routes/admindomain_route.js');

const main = async () => {
    const app = express();
    const port = init_app.PORT;


    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // app.use(vhost(init_app.ADMIN_DOMAIN, adminDomainRoutes));
    app.use(vhost(init_app.DOMAIN, rootDomainRoutes))
        .use(vhost('www.' + init_app.DOMAIN, rootDomainRoutes))
        .use(vhost('admin.' + init_app.DOMAIN, adminDomainRoutes))
        .use(vhost('*.' + init_app.DOMAIN, subDomainRoutes));

    app.listen(port, () => console.log('App now listening on port ' + port));

    return app;
};

main()
    .then(() => console.log('App is running'))
    .catch((err) => console.log({ err }));
