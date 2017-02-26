import { SUSHInfo } from 'sush';

/**
 * `SUSHPluginRedirect` redirects to URL associated with id.
 */
function SUSHPluginRedirect (
  { fallback }: { fallback?: string } = {}
) {
  return ({ id, stock }: SUSHInfo) => {
    const redirectUrl = stock.has(id) ? stock.get(id) : fallback;

    // Throw error if not match
    if (!redirectUrl) {
      throw new Error(`"${id}" is not found.`);
    }

    // Redirect via refresh meta tag
    const meta = document.createElement('meta');
    meta.setAttribute('http-equiv', 'refresh');
    meta.setAttribute('content', `0;URL=${redirectUrl}`);
    document.head.appendChild(meta);

    // Redirect via JavaScript Location
    (SUSHPluginRedirect as any)._location.href = redirectUrl;

    return { id, stock } as SUSHInfo;
  };
};

(SUSHPluginRedirect as any)._location = location;

export default SUSHPluginRedirect;
