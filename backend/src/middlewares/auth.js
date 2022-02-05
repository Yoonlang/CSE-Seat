
module.exports = {
  isLoggedIn : (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      console.log('login plz ^^');
      res.redirect("/login");
    }
  },
  isNotLoggedIn : (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      console.log('logout plz ^ g ^');
      res.redirect("/login");
    }
  }
}