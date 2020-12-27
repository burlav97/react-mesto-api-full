const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getCards,
  postCard,
  deleteCard,
} = require('../controllers/cards');

router.get('/', auth, getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi
      .string()
      .required()
      .min(8)
      .regex(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/),
  }),
}), auth, postCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), auth, deleteCard);

module.exports = router;
