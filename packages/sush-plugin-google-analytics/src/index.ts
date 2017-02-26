import { SUSHInfo } from 'sush';

export interface PluginParams {
  analyticsId?: string;
  timeout?: number;
}

/**
 * `SUSHPluginGoogleAnalytics` sends url to Google Analytics.
 */
function SUSHPluginGoogleAnalytics (
  { analyticsId, timeout = 3000 }: PluginParams = {}
) {
  return (info: SUSHInfo) => {
    if (!analyticsId) {
      return info;
    }

    const location: Location =
      (SUSHPluginGoogleAnalytics as any)._location;

    // Init Google Analytics
    if (!('ga' in window)) {
      (window as any).ga = (...args: any[]) => (ga.q = ga.q || []).push(args);
    }
    ga.l = Number(new Date());

    // Load Google Analytics
    const script = document.createElement('script');
    script.src = '//www.google-analytics.com/analytics.js';
    document.head.appendChild(script);

    // Wait for sending to Google Analytics
    return new Promise((resolve, reject) => {
      ga('create', analyticsId, { allowAnchor: true });
      ga('send', 'pageview', {
        page: location.href.replace(location.origin, ''),
        hitCallback(): void {
          resolve(info);
        }
      });
      // When timeouted, throws Error.
      setTimeout(() => reject(new Error('Timeout.')), timeout);
    }) as Promise<SUSHInfo>;
  };
};

// For test
(SUSHPluginGoogleAnalytics as any)._location = location;

export default SUSHPluginGoogleAnalytics;
