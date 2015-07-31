'use strict';

describe('controller: QuizzController', function() {

  var quizzController;

  beforeEach(module('quizz'));

  beforeEach(inject(function($controller) {
    quizzController = $controller('QuizzController');
    quizzController.questions = [
      {
        label: 'question1?',
        answers: [
          { id: 1, label: 'answer 1', valid: true },
          { id: 2, label: 'answer 2', valid: false },
          { id: 3, label: 'answer 3', valid: true },
          { id: 4, label: 'answer 4', valid: false }
        ]
      },
      {
        label: 'question2?',
        answers: [
          { id: 1, label: 'answer 1', valid: false },
          { id: 2, label: 'answer 2', valid: true },
          { id: 3, label: 'answer 3', valid: false }
        ]
      },
      {
        label: 'question3?',
        answers: [
          { id: 1, label: 'answer 1', valid: true },
          { id: 2, label: 'answer 2', valid: true },
          { id: 3, label: 'answer 3', valid: true },
          { id: 4, label: 'answer 4', valid: false }
        ]
      }
    ];
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

  it('should have a result of X valid answers when user\'s answer are all valid', inject(function($timeout) {
    expect(quizzController.validAnswersCount).toBe(0);

    quizzController.currentAnswer = { 1: true, 3: true };
    quizzController.nextQuestion();
    $timeout.flush();
    quizzController.currentAnswer = { 2: true };
    quizzController.nextQuestion();
    $timeout.flush();
    quizzController.currentAnswer = { 1: true, 2: true, 3: true };
    quizzController.nextQuestion();
    $timeout.flush();

    expect(quizzController.validAnswersCount).toBe(3);
  }));

  it('should reset valid answers count when quizz has reset', inject(function($timeout) {
    quizzController.currentAnswer = { 1: true, 3: true };
    quizzController.nextQuestion();
    $timeout.flush();
    expect(quizzController.validAnswersCount).toBe(1);
    quizzController.reset();
    expect(quizzController.validAnswersCount).toBe(0);
  }));
});
