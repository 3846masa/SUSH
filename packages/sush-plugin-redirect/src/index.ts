import { SUSHInfo } from 'sush';

/**
 * `SUSHPluginRedirect` redirects to URL associated with id.
 */
function SUSHPluginRedirect (
  { fallback }: { fallback?: string } = {}
) {
  return ({ id, stock }: SUSHInfo) => {
    return new Promise((resolve, reject) => {
      const redirectUrl = stock.has(id) ? stock.get(id) : fallback;

      // Throw error if not match
      if (!redirectUrl) {
        return reject(new Error(`"${id}" is not found.`));
      }

      // Redirect via refresh meta tag
      const meta = document.createElement('meta');
      meta.setAttribute('http-equiv', 'refresh');
      meta.setAttribute('content', `0;URL=${redirectUrl}`);
      document.head.appendChild(meta);

      // Redirect via JavaScript Location
      setTimeout(() => {
        (SUSHPluginRedirect as any)._location.href = redirectUrl;
        resolve({ id, stock });
      }, 1000);
    }) as Promise<SUSHInfo>;
  };
};

(SUSHPluginRedirect as any)._location = location;

export default SUSHPluginRedirect;
