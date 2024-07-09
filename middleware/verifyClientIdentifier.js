const verifyClientIdentifier = (req, res, next) => {
    const clientKey = req.headers['x-client-identifier'];
    if (clientKey !== process.env.API_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };

  export default verifyClientIdentifier