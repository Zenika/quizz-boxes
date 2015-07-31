function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      template: '<quizz></quizz>'
    });

  $urlRouterProvider.otherwise('/');
}

export default routerConfig;
