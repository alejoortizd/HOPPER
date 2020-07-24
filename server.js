const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const { config } = require("./config");

app.set('view engine', 'pug');

const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: config.githubClient,
    clientSecret: config.githubSecret,
    callbackURL: "http://localhost:8000/oauth-callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', {titulo: 'Mi pagina de login', login: 'Hola', href: '/login'})
})

app.get('/login', (req, res) => {
    res.render('index', {titulo: 'Mi pagina de login', login: 'sing in GH', href: '/auth/github'})
})

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/github' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(8000, err => {
    if (err) return console.log(err)
    console.log(`Servidor escuchando en el puerto: ${8000}`);
})