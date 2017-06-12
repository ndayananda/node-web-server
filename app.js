const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

const server = express();

hbs.registerPartials(__dirname+'/views/partials');
server.set('view engine', hbs);
server.engine('html', hbs.__express);

server.use(express.static(__dirname+'/public'));

// Create a custom middleware
// This can be used to ex: to authenticate the request against database and if user is authoraised then only allow to use
//order of custom middleware is very important, so this should be at the top for authentication of requests
server.use((req, resp, next) => {
    console.log(`${new Date().toString()} : ${req.method} ${req.url} `);

    resp.send(`Page is under maintainance!!!`);

    // untill next() is called nothing will be executed. So during authentication of the request this will be very useful
    // if the user is auth then only allow him to fetch the desired response else send a custom response
    //next();
});

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear() );

hbs.registerHelper('toUpper', (str) => str.toUpperCase() );



server.get('/', (req, resp) => {
    resp.render('index.html', {
        pageTitle: 'Home Page',
        pageHeading: 'Welcome to NodeJS'
    });
});

server.get('/about', (req, resp) => {
    resp.render('about.html', {
        pageTitle: 'About Page',
        pageHeading: 'About Page'
    });
});

server.listen(port, () => {
    console.log(`Server is up and running on ${port}`);
});
