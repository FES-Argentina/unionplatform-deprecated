// Simulate login.
module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.username === 'mail@example.com' && req.body.password === 'xx') {
      const token = Math.random().toString(36).substr(2);
      res.status(200).json({ token });
    } else {
      const error = 'Invalid credentials';
      res.status(400).json({ error });
    }
  } else {
    next();
  }
};
