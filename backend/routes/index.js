const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRoutes = require('./users.js');
const cardsRoutes = require('./cards.js');
const auth = require('../middlewares/auth');
const {
  login,
  postUser,
} = require('../controllers/users.js');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), postUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/cards', cardsRoutes);
router.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
