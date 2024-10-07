// server/middleware/auth.middleware.js
import passport from 'passport';

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    passport.authenticate('jwt', { session: false })(req, res, () => {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    });
  };
};

export default authorize;
