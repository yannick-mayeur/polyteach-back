const logger = require('../helpers/logger');

module.exports = (router) => {
  router.get('', async (req, res) => {
    logger.log('info', 'received request: GET /');
    const routes = [];
    router.stack.forEach(route => {
      routes.push({route: route.route.path, method: Object.keys(route.route.methods)[0]});
    });
    res.status(200).send(routes);
  });
};