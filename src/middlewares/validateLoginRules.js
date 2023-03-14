const validateLoginRules = (req, res, next) => {
    const { email, password } = req.body;
    const textEmail = /\S+@\S+\.\S+/;
    const SIX = 6;
    if (!textEmail.test(email)) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (password.length < SIX) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
  };

module.exports = validateLoginRules;