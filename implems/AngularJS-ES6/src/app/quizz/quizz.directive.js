class QuizzDirective {
  constructor () {
    'ngInject';

    let directive = {
      restrict: 'E',
      templateUrl: 'app/quizz/quizz.html',
      controller: 'QuizzController',
      controllerAs: 'quizz'
    };

    return directive;
  }
}

export default QuizzDirective;
