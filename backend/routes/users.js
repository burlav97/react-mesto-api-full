const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  getInfo,
} = require('../controllers/users.js');

router.get('/', auth, getUsers);

router.get('/me', auth, getInfo);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), auth, getUserById);

module.exports = router;
