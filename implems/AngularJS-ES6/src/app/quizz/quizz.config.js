function config(toastr) {
  'ngInject';

  toastr.options.timeOut = 1000;
  toastr.options.hideDuration = 200;
  toastr.options.positionClass = 'toast-top-right';
  toastr.options.preventDuplicates = true;
}

export default config;
