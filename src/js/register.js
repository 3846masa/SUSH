import 'babel-polyfill';
import 'source-map-support/register';
import Vue from 'vue';
import validator from 'vue-validator';
import isURL from 'validator/lib/isURL';
import createError from 'create-error';
import url from 'url';
import checkIdAsync from './utils/_checkId.js';
import siteConfig from '../../config/site.config.json';

const CustomError = createError('CustomError');
const CONFIG = siteConfig.register;

Vue.use(validator);
const shortenForm = new Vue({
  el: '#shortenForm',
  data: {
    state: {
      submitted: false,
      done: false
    },
    urlPrefix: location.href.split('/').slice(2, -1).join('/') + '/#/',
    url: '',
    id: '',
    validate: {
      url: [ 'required', 'url' ],
      id: [ 'required', 'id' ]
    }
  },
  computed: {
    shortenURL: function () {
      return `${location.protocol}//${this.urlPrefix}${this.id}`;
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
      check: ()  => true,
      message: 'This URL was already taken.'
    }
  },
  methods: {
    checkValidation: async function () {
      if (this.$validation.invalid) {
        throw new CustomError('Invalid.');
      }

      const validId = await checkIdAsync({
        id: this.id,
        sheetUrl: CONFIG.url.sheet
      });

      if (validId === false) {
        throw new CustomError('This URL was already taken.', { field: 'id' });
      }
    },
    submitData: function () {
      return new Promise((resolve, reject) => {
        const query = { ifq: '', submit: 'Submit' };
        query[ CONFIG.formKey.url ] = this.url;
        query[ CONFIG.formKey.id ] = this.id;
        const baseUrl = CONFIG.url.form.replace('viewform', 'formResponse');
        const sendUrl = url.format(
          Object.assign(url.parse(baseUrl), { query: query, search: null })
        );

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.addEventListener('load', resolve);
        iframe.addEventListener('error', reject);
        iframe.setAttribute('src', sendUrl);
        document.body.appendChild(iframe);
      });
    },
    onSubmit: function () {
      this.state.submitted = true;

      this.checkValidation()
      .then(this.submitData)
      .then(() => {
        this.state.done = true;
      })
      .catch((err) => {
        console.error(err.stack || err);
        if (err.field) this.$setValidationErrors([ err ]);
        this.state.submitted = false;
      });
    }
  }
});
