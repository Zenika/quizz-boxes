describe('controller: QuizzController', function() {

  beforeEach(module('quizz'));

  beforeEach(inject(function($controller) {
    this.quizzController = $controller('QuizzController');
    this.quizzController.questions = [
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
    this.quizzController.currentAnswer = { 1: true, 3: true };
    spyOn(this.quizzController.toastr, 'success');
    this.quizzController.nextQuestion();
    expect(this.quizzController.toastr.success).toHaveBeenCalled();
  });

  it('should show error toastr when user\'s current answer is invalid', function() {
    this.quizzController.currentAnswer = { 3: true };
    spyOn(this.quizzController.toastr, 'error');
    this.quizzController.nextQuestion();
    expect(this.quizzController.toastr.error).toHaveBeenCalled();
  });

  it('should show error toastr when user\'s current answer is undefined', function() {
    spyOn(this.quizzController.toastr, 'error');
    this.quizzController.nextQuestion();
    expect(this.quizzController.toastr.error).toHaveBeenCalled();
  });

  it('should show error toastr when user\'s current answer is an empty object', function() {
    this.quizzController.currentAnswer = {};
    spyOn(this.quizzController.toastr, 'error');
    this.quizzController.nextQuestion();
    expect(this.quizzController.toastr.error).toHaveBeenCalled();
  });

  it('should have a result of 3 valid answers when user\'s 3 answers are all valid', inject(function($timeout) {
    expect(this.quizzController.validAnswersCount).toBe(0);

    this.quizzController.currentAnswer = { 1: true, 3: true };
    this.quizzController.nextQuestion();
    $timeout.flush();
    this.quizzController.currentAnswer = { 2: true };
    this.quizzController.nextQuestion();
    $timeout.flush();
    this.quizzController.currentAnswer = { 1: true, 2: true, 3: true };
    this.quizzController.nextQuestion();
    $timeout.flush();

    expect(this.quizzController.validAnswersCount).toBe(3);
  }));

  it('should reset valid answers count when quizz has reset', inject(function($timeout) {
    this.quizzController.currentAnswer = { 1: true, 3: true };
    this.quizzController.nextQuestion();
    $timeout.flush();
    expect(this.quizzController.validAnswersCount).toBe(1);
    this.quizzController.reset();
    expect(this.quizzController.validAnswersCount).toBe(0);
  }));
});
