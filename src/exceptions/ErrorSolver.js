const ClientError = require('./ClientError');

const solveServerError = (h, error) => {
  const response = h.response({
    status: 'fail',
    message: 'Maaf, terjadi kegagalan pada server kami.',
  });
  response.code(500);
  console.error(error);
  return response;
};

const solveClientError = (h, error) => {
  const response = h.response({
    status: 'fail',
    message: error.message,
  });
  response.code(error.statusCode);
  return response;
};

const solveError = (error, h) => {
  if (error instanceof ClientError) {
    return solveClientError(h, error);
  }
  return solveServerError(h, error);
};

module.exports = { solveError };
