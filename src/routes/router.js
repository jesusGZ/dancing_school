const { Router } = require('express');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../../document/swagger');

const rootRoute = require('./root.routes');
const defaultRoute = require('./default.routes');

module.exports = () => {
  const router = Router();
  const groupsRoute = Router();

  // groupsRoute.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  router.use('/', rootRoute());
  router.use('/ap1/v1', groupsRoute);
  router.use('*', defaultRoute());

  return router;
};
