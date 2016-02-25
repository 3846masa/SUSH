function SUSHRedirect({ errorRedirect = null }) {
  return async function ({ id, list }) {
    const redirectUrl = list[id] || errorRedirect;

    if (!redirectUrl) {
      document.title = '404 Not Found';
      document.body.textContent = '404 Not Found';
      window.addEventListener('hashchange', location.reload.bind(location));
      throw new Error(`"${id}" is not found.`);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('http-equiv', 'refresh');
      meta.setAttribute('content', `0;URL=${redirectUrl}`);
      document.head.appendChild(meta);
    }

    return { id: id, list: list };
  };
}

export default SUSHRedirect;
