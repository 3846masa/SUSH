/* global ga */
function SUSHGoogleAnalytics({ analyticsId, timeout = 1000 }) {
  return async function ({ id, list }) {
    window.ga = window.ga || function() { (ga.q = ga.q || []).push(arguments); };
    ga.l =+ new Date;
    const script = document.createElement('script');
    script.src = '//www.google-analytics.com/analytics.js';
    document.head.appendChild(script);

    await new Promise((resolve, reject) => {
      ga('create', analyticsId, { allowAnchor: true });
      ga('send', 'pageview', {
        page: location.pathname + location.search  + location.hash,
        hitCallback: resolve
      });
      setTimeout(reject, timeout);
    })
    .catch(() => {
      console.error(new Error('Failed to send analytics').stack);
    });

    return { id: id, list: list };
  };
}

export default SUSHGoogleAnalytics;
