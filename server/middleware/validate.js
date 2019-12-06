
class Validate {
  static async updateComment(req, res, next) {
    // title
    req.check('comment', 'Write comment').notEmpty();
    req.check('comment', 'comment must be between 4 to 150 characters').isLength({
      min: 4,
      max: 150,
    });
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
      const firstError = errors.map((error) => error.msg)[0];
      return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    return next();
  }
}
export default Validate;
