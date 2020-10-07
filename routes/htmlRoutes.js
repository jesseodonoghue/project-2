const router = require('express').Router();

module.exports = (db) => {
  // const appController = require('../controllers/appController')(db);

  // Load register page
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('register');
    }
  });

  // Load profile page
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        // console.log(user);
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  // Load dashboard page
  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load dashboard page
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Confirmation page
  router.get('/confirm/:id', (req, res) => {
    if (req.isAuthenticated()) {
      db.OrderItem.findAll({
        where: { OrderId: req.params.id },
        include: db.Drink
      }).then(function (dbOrderItems) {
        console.log('orderItems array!------', dbOrderItems);
        res.render('confirm', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          order: dbOrderItems,
          orderID: dbOrderItems[0].OrderId
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load example index page
  router.get('/order', function (req, res) {
    if (req.isAuthenticated()) {
      db.Drink.findAll({ raw: true }).then(function (dbDrinks) {
        res.render('order', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          msg: 'Place Your Order',
          drinks: dbDrinks
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load example page and pass in an example by id
  router.get('/order/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Order.findOne({ where: { id: req.params.id }, raw: true }).then(function (dbExample) {
        res.render('example-detail', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          example: dbExample
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Logout
  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/');
    });
  });

  // Render 404 page for any unmatched routes
  router.get('*', function (req, res) {
    res.render('404');
  });

  return router;
};
