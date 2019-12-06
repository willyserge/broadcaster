class Admin {
  static async authenticate(req, res, next) {
    if (!req.user.isAdmin) {
      return res.status(403).send({
        status: 403,
        error: 'Access denied.',
      });
    }
    return next();
  }
}
export default Admin;
