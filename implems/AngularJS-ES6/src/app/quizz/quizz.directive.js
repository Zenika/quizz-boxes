class QuizzDirective {
  constructor () {
    'ngInject';

    const directive = {
      restrict: 'E',
      templateUrl: 'app/quizz/quizz.html',
      controller: 'QuizzController',
      controllerAs: 'quizz'
    };

    return directive;
  }
}

export default QuizzDirective;
