var express  = require('express'),
    passport = require('passport'),
    methodOverride = require('method-override');
// models
var Pirate   = require('../models/Pirate');
// router
var router   = express.Router();

//require controllers
var aboutController     = require('../controllers/aboutController'),
    treasuresController = require('../controllers/treasuresController'),
    piratesController   = require('../controllers/piratesController');

// require controllers
var piratesController   = require('../controllers/piratesController'),
    sessionsController  = require('../controllers/sessionsController'),
    homeController      = require('../controllers/homeController'),
    aboutController     = require('../controllers/aboutController'),
    treasuresController = require('../controllers/treasuresController');

var authenticatePirate  = passport.authenticate(
  'local',
  {failureRedirect: '/login'}
);

var isLoggedIn = function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  }
  return next();
};

var loadCurrentPirate = function(req, res, next) {
  if (req.session.passport) {
    Pirate
       .findOne({ username: req.session.passport.user })
       .then(
         function(user) {
          // attach the current User instance to the request
          req.currentUser = user;
          next();
         }, function(err) {
          return next(err);
         });
  } else {
    next();
  }
};

/* Home page */

router.get('/', homeController.index);

/* About page */
router.get('/about', aboutController.about);

/* Treasure CRUD */

router.get(   '/treasures',             isLoggedIn, treasuresController.index);
router.get(   '/treasures/new',         isLoggedIn, treasuresController.newTreasure);
router.post(  '/treasures',             isLoggedIn, treasuresController.create);
router.get(   '/treasures/:id',         isLoggedIn, treasuresController.show);
router.get(   '/treasures/:id/edit',    isLoggedIn, treasuresController.editNew);
router.put(  '/treasures/:id/',        isLoggedIn, treasuresController.editTreasure);
router.delete(  '/treasures/:id',         isLoggedIn, treasuresController.removeTreasure);

// register
router.get(  '/register', piratesController.newPirate);
router.post( '/register', piratesController.create);

// login
router.get(  '/login', sessionsController.new);
router.post( '/login', authenticatePirate, sessionsController.create);

// logout
router.get(  '/logout', sessionsController.destroy);

/* Pirate CRUD */
router.get( '/pirates',             piratesController.index);
router.get( '/pirates/new',         piratesController.newPirate);
router.get( '/pirates/:id',         piratesController.show);
router.get( '/pirates/:id/edit',    piratesController.edit);

// export router to app
module.exports = router;
