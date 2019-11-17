module.exports = (router) => {
  router.get('/ping', (req, res) => {
    res.status(200).send('pong');
  });
};
