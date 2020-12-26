const Card = require('../models/card');
const BadRequestError = require('../error/bad-request-err');
const NotFoundError = require('../error/not-found-err');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['likes', 'owner'])
    .then((data) => res.send(data))
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({
    name,
    link,
    owner: _id,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const error = new BadRequestError('Невалидный id');
        next(error);
      } if (err.name === 'ValidationError') {
        const error = new BadRequestError('Ошибка валидации');
        next(error);
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .populate('owner')
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (card.owner._id.toString() === userId) {
        Card.findByIdAndRemove(cardId).then((newCard) => {
          res.send(newCard);
        });
      } else {
        throw new BadRequestError('Нельзя удалять чужую карточку');
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const error = new BadRequestError('Невалидный id');
        next(error);
      } if (err.name === 'ValidationError') {
        const error = new BadRequestError('Ошибка валидации');
        next(error);
      }
      next(err);
    });
};

module.exports = { getCards, postCard, deleteCard };
