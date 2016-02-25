import Vue from 'vue';
import validator from 'vue-validator';
import isURL from 'validator/lib/isURL';

Vue.use(validator);
const shortenForm = new Vue({
  el: '#shortenForm',
  data: {
    state: {
      submitted: false,
      done: false
    },
    urlPrefix: `${location.host}/#/`,
    shortenURL: '#',
    url: '',
    id: '',
    validate: {
      url: [ 'required', 'url' ],
      id: [ 'required', 'id' ]
    }
  },
  validators: {
    required: {
      check: Vue.validator('required'),
      message: 'Please fill out this field.'
    },
    url: {
      check: (val) => isURL(val, { require_protocol: true }),
      message: 'Please set valid URL.'
    },
    id: {
      check: (val)  => true,
      message: 'This URL was already taken.'
    }
  },
  methods: {
    onSubmit: function () {
      if (this.$validation.invalid) return;
      this.state.submitted = true;
      console.log('submitted');
      this.$setValidationErrors([{
        field: 'id',
        message: 'This URL was already taken.'
      }]);
    }
  }
});
