var parser = require('iniparser'),
    path = require('path');

module.exports = function (gitConfigPath, cb) {
  if (typeof cb === 'undefined') {
    cb = gitConfigPath;
    gitConfigPath = path.join(
      process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE, '.gitconfig');
  }
  parser.parse(gitConfigPath, cb);
};
