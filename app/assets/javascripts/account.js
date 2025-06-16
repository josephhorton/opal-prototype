module.exports = function (router) {
  router.get('/account', function (req, res) {
    res.render('account');
  });
};