'use strict';

describe('controller: QuizzController', function() {

  var quizzController;

  beforeEach(module('quizz'));

  beforeEach(inject(function($controller) {
    quizzController = $controller('QuizzController');
    quizzController.questions = [{
      label: 'question?',
      answers: [
        { id: 1, label: 'answer 1', valid: true },
        { id: 2, label: 'answer 2', valid: false },
        { id: 3, label: 'answer 3', valid: true },
        { id: 4, label: 'answer 4', valid: false }
      ]
    }];
    quizzController.qIndex = 0;
  }));

  it('should show success toastr when user\'s current answer is valid', function() {
    quizzController.currentAnswer = { 1: true, 3: true };
    spyOn(quizzController.toastr, 'success');
    quizzController.nextQuestion();
    expect(quizzController.toastr.success).toHaveBeenCalled();
  });

  it('should show error toastr when user\'s current answer is invalid', function() {
    quizzController.currentAnswer = { 3: true };
    spyOn(quizzController.toastr, 'error');
    quizzController.nextQuestion();
    expect(quizzController.toastr.error).toHaveBeenCalled();
  });

  it('should show error toastr when user\'s current answer is undefined', function() {
    spyOn(quizzController.toastr, 'error');
    quizzController.nextQuestion();
    expect(quizzController.toastr.error).toHaveBeenCalled();
  });

  it('should show error toastr when user\'s current answer is an empty object', function() {
    quizzController.currentAnswer = {};
    spyOn(quizzController.toastr, 'error');
    quizzController.nextQuestion();
    expect(quizzController.toastr.error).toHaveBeenCalled();
  });
});
