const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');
// @route   POST  api/users
// @desc    Register a user
// @access  Public

router.post(
  '/',
  [
    check('name', 'Plase add a name').not().isEmpty(),
    check('email', 'Plase include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'Este usuário ja existe' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no Servidor');
    }
  }
);

// @route   Delete api/users
// @desc    Delete a user
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

    // Make sure user owns contact
    if (user.id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Não Autorizado!' });
    }

    await User.findByIdAndRemove(req.params.id);
    await Contact.deleteMany({ user: req.params.id });
    res.json({ msg: ' Usuário e contatos removidos' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor!');
  }
});

module.exports = router;
