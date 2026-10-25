/* Project Forward call tap counter, v1. Counts taps on the site's phone number
   links, for the client's Monday report. Stores nothing on the device and sends
   nothing that identifies the visitor. Master copy and how to add it to a site:
   docs/CALL-CLICKS.md in the ProjectForward repo. */
(function () {
  var script = document.currentScript;
  var client = script && script.getAttribute('data-client');
  var host = location.hostname;
  if (!client || location.protocol !== 'https:' || /(^|\.)(pages\.dev|web\.app|firebaseapp\.com)$/.test(host)) return;
  if (navigator.globalPrivacyControl || navigator.doNotTrack === '1' || window.doNotTrack === '1') return;

  var ENDPOINT = 'https://projectforward-web.web.app/api/call-click';
  var sent = false;

  function place(link) {
    if (link.closest('header, nav, [role="banner"]')) return 'header';
    if (link.closest('footer, [role="contentinfo"]')) return 'footer';
    for (var el = link; el && el !== document.body; el = el.parentElement) {
      var position = getComputedStyle(el).position;
      if (position === 'fixed' || position === 'sticky') return 'sticky';
    }
    return 'page';
  }

  document.addEventListener('click', function (event) {
    var target = event.target;
    var link = event.isTrusted && target && target.closest && target.closest('a[href^="tel:"]');
    // One count per page view; the server also counts a repeat within 30 minutes once.
    if (!link || sent) return;
    sent = true;
    try {
      var body = new URLSearchParams({
        client_id: client,
        page: location.pathname,
        where: place(link),
        number: link.getAttribute('href').slice(4)
      });
      if (!(navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, body))) {
        fetch(ENDPOINT, { method: 'POST', body: body, keepalive: true, mode: 'no-cors' });
      }
    } catch (err) {
      // Never get in the way of the call.
    }
  }, true);
})();
