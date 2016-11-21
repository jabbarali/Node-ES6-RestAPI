module.exports = function (app) {
  'use strict';

  require('./user')(app);
  require('./courseBite')(app);
};