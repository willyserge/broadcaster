/* eslint-disable no-unused-vars */
class Error {
  static catchError(err, req, res, next) {
    res.status(500).send(
      {
        status: 500,
        error: 'something failed',
      },
    );
  }
}
export default Error;
