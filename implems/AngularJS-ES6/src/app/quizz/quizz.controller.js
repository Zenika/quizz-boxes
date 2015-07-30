class QuizzController {
  constructor (toastr, $timeout) {
    'ngInject';

    this.toastr = toastr;
    this.$timeout = $timeout;
    this.qIndex = 0;
    this.nextQuestionReady = true;
    this.validAnswersCount = 0;

    this.questions = [
      {
        label: 'What is the best yeoman generator for angular?',
        answers: [
          { id: 1, label: 'angular', valid: false },
          { id: 2, label: 'angular-fullstack', valid: false },
          { id: 3, label: 'jhipster', valid: false },
          { id: 4, label: 'gulp-angular', valid: true }
        ]
      },
      {
        label: 'What is the best tribe within Zenika?',
        answers: [
          { id: 1, label: 'Architecture', valid: false },
          { id: 2, label: 'Web', valid: true },
          { id: 3, label: 'Big Data', valid: false },
          { id: 4, label: 'Agile', valid: false }
        ]
      },
      {
        label: 'Which tags are valid HTML5 elements?',
        answers: [
          { id: 1, label: '<abbr>', valid: true },
          { id: 2, label: '<acronym>', valid: false },
          { id: 3, label: '<nav>', valid: true },
          { id: 4, label: '<strike>', valid: false },
          { id: 5, label: '<frameset>', valid: false }
        ]
      }
    ];
  }

  currentQuestion() {
    return this.questions[this.qIndex] || {};
  }

  currentQuestionLabel() {
    return `#${this.qIndex + 1}. ${this.currentQuestion().label}`;
  }

  questionsLeftCount() {
    return this.questions.length - this.qIndex;
  }

  isAnswerValid() {
    if (_.isUndefined(this.currentAnswer) || _.isEmpty(this.currentAnswer)) {
      return false;
    }
    let answerValid = true;
    const answers = this.currentQuestion().answers;
    _.forEach(answers, (answer) => {
      const answerItem = this.currentAnswer[answer.id];
      if ((answer.valid && !answerItem) || (!answer.valid && answerItem)) {
        answerValid = false;
      }
    });
    return answerValid;
  }

  nextQuestion() {
    this.nextQuestionReady = false;

    if (this.isAnswerValid()) {
      this.toastr.success(`Yup, that's right.`);
      ++this.validAnswersCount;
    } else {
      this.toastr.error(`Nope! Wrong answer.`);
    }

    if (this.qIndex < this.questions.length) {
      this.$timeout(() => {
        ++this.qIndex;
        this.currentAnswer = {};
        this.nextQuestionReady = true;
      }, 1000);
    }
  }

  reset() {
    this.qIndex = 0;
    this.currentAnswer = {};
    this.validAnswersCount = 0;
  }
}

export default QuizzController;
