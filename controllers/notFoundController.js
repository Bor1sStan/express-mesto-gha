const {
  NOT_FOUND_CODE,
  NOT_FOUND_CODE_PAGE_MESSAGE,
} = require('../units/constants');

const notFoundController = (req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: NOT_FOUND_CODE_PAGE_MESSAGE });
};

module.exports = {
  notFoundController,
};
