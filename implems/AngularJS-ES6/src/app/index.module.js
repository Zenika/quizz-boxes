import config from './index.config';
import routerConfig from './index.route';
import runBlock from './index.run';

require('./quizz/quizz.module');

angular.module('quizzBoxes', [
  'ui.router',
  'ui.bootstrap',
  'quizz'
])

.config(config)
.config(routerConfig)
.run(runBlock);
