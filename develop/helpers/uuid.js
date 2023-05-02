module.exports = () =>
Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);
const api = require('./develop/db/db.json');