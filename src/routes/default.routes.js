const { Router } = require('express');

module.exports = () => {
  const router = Router();

  router.all('*', (request, response) => {
    response.status(404).send({
      message: 'Not found',
      error: `${request.originalUrl} no esta definida.`,
    });
  });

  return router;
};
