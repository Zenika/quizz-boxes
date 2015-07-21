/* global toastr */
import config from './quizz.config';
import QuizzController from './quizz.controller';
import QuizzDirective from './quizz.directive';

angular.module('quizz', [])
  .constant('toastr', toastr)
  .config(config)
  .controller('QuizzController', QuizzController)
  .directive('quizz', () => new QuizzDirective());
