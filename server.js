const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect'); // Changed from './data/database'
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors')
const app = express();
 
const port = process.env.PORT  || 3000;

app.use(bodyParser.json());

app.use(session({
   secret: "secret",
   resave: false,
   saveUninitialized:true,

}))

app.use(passport.initialize())

app.use(passport.session())

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origen', '*');
   res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-Width, Content-Type, Accept, Z-Key'
   );
   res.setHeader('Access-Control-Allows-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
   next();
});
app.use(cors({ methods : ['GET','POST','DELETE','UPDATE','PUT', 'PATCH' ]}))
app.use(cors({ origin: '*'}))
app.use('/', require('./routes'));

passport.use(new GitHubStrategy({
   clientID: process.env.GITHUB_CLIENT_ID,
   clientSecret: process.env.GITHUB_CLIENT_SECRET,
   callbackURL: process.env.callback_URL

},
function(acessToken, refreshToken, profile, done){
   return done(null, profile);
 },
));

passport.serializeUser((user, done) =>{
  done(null, user); 
});

passport.deserializeUser((user, done) =>{
  done(null, user); 
});

app.get('/',(req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logget out")});

app.get('/github/callback', passport.authenticate('github', {
   failureRedirect: '/api-docs', session: false}),
   (req, res) => {
   req.session.user = req.user;
   res.redirect('/');

});


app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => { console.log(`Database is listening and node Running on port ${port}`); });
    }
});