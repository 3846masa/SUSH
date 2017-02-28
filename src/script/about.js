const sheetUrl =
  'https://docs.google.com/spreadsheets/d/1RyoXWAqO4MQykn2NHNvBKgmofikO_1r9ErE4KUc0TCA/edit#gid=748715091';
const formUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSeNEYQFzhQT0eSytjbFHR3V4QRDbOEyUXy-9GJGZf6JNle4eg/formResponse';

function isValidURL(url) {
  try {
    const url = new URL(url);
    if (!url.protocol.match(/^https?:$/)) {
      return false;
    }
    return true;
  } catch (_e) {
    return false;
  }
}

function sendForms(id, url) {
  return new Promise((resolve, reject) => {
    const formUrlObj = new URL(formUrl);

    const query = formUrlObj.searchParams;
    query.set('ifq', '');
    query.set('submit', 'Submit');
    query.set('entry.419640354', id);
    query.set('entry.1711024713', url);

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.addEventListener('load', resolve);
    iframe.addEventListener('error', reject);
    iframe.setAttribute('src', formUrlObj.href);
    document.body.appendChild(iframe);
  });
}

const vue = new Vue({
  data: () => ({
    error: false,
    success: false,
    loading: false,
    url: '',
    id: '',
  }),
  mounted() {
    new Clipboard(this.$refs.copy);
  },
  computed: {
    shorten() {
      return `https://sush.ml/#/${this.id}`;
    },
    disabled() {
      return !this.url || !this.id || this.loading;
    },
  },
  watch: {
    url() {
      this.reset();
    },
    id() {
      this.reset();
    },
  },
  methods: {
    reset() {
      this.error = this.success = false;
    },
    setError(err) {
      this.error = err;
    },
    submit() {
      if (!isValidURL(this.url)) {
        return this.setError('Invalid URL');
      }
      if (sush.stock.has(this.id)) {
        return this.setError(`'${this.shorten}' is already token`);
      }
      this.loading = true;

      sendForms(this.id, this.url)
        .then(() => {
          sush.stock.set(this.id, this.url);
          this.loading = false;
          this.success = true;
        });
    },
  },
});

const sush = new SUSH({
  mode: 'lower'
});

sush.flow([
  SUSH.$spreadsheet({ sheetUrl }),
])
.then(() => {
  vue.$mount('#app');
});
