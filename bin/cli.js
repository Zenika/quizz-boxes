require('babel/register');
var meow = require('meow');

var cli = meow({
  pkg: '../package.json',
  help: [
    'Usage',
    '  - npm start for generation',
    '  - npm start publish to publish on GitHib pages'
  ]
});

if (cli.input.length === 0) {
  require('../src/generator')();
} else if (cli.input.length === 1 && cli.input[0] === 'publish') {
  require('../src/publish')();
} else {
  cli.showHelp();
}
