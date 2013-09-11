var expect = require('expect.js'),
    fs = require('fs'),
    path = require('path'),
    gitConfig = require('..');

function fixture(name) {
  return fs.readFileSync(fixturePath(name), { encoding: 'utf8' });
}

function fixturePath(name) {
  return path.join(__dirname, 'fixtures', name);
}

describe('git-config', function() {
  it('should be able to parse a .gitconfig file', function(done) {
    gitConfig(fixturePath('gitconfig1.ini'), function (err, config) {
      if (err) return done(err);
      expect(config.user.name).to.equal('Eugene Ware');
      expect(config.user.email).to.equal('eugene@noblesamurai.com');
      expect(config.github.user).to.equal('eugeneware');
      done();
    });
  });

  it('should be able to look for .gitconfig in the usual places', function(done) {
    process.env.HOME = fixturePath('');
    gitConfig(function (err, config) {
      if (err) return done(err);
      expect(config.user.name).to.equal('Eugene Ware');
      expect(config.user.email).to.equal('eugene@noblesamurai.com');
      expect(config.github.user).to.equal('eugeneware');
      done();
    });
  });
});
