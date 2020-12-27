const { JWT_SECRET = 'dev-secret' } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthError = require('../error/auth-err');
const BadRequestError = require('../error/bad-request-err');
const NotFoundError = require('../error/not-found-err');
const ConflictError = require('../error/conflict-error');

const User = require('../models/user');

const getUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send(data))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const error = new BadRequestError('Невалидный id');
        next(error);
      } if (err.statusCode === 404) {
        const error = new NotFoundError('Пользователь не найден');
        next(error);
      }
      next(err);
    });
};

const postUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (!email || !password) {
    throw new NotFoundError('Не передан email или password');
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new BadRequestError('Ошибка валидации');
        next(error);
      } else if (err.code === 11000) {
        const error = new ConflictError('Пользователь уже зарегестрирован');
        next(error);
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Не передан email или password');
  }
  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильный email');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Неправильный пароль');
          }
          const token = jwt.sign({ _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' });
          return res.send({ token });
        })
        .catch(() => {
          const error = new BadRequestError('Ошибка запроса пароля');
          next(error);
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new BadRequestError('Ошибка валидации');
        next(error);
      }
      next(err);
    });
};

const getInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  login,
  getInfo,
};
