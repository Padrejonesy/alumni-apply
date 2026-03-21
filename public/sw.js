// Service Worker for Push Notifications — v4

// ── Install: skip waiting so the new SW activates immediately on every deploy ──
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

// ── Activate: claim all open tabs immediately so push works right away ─────────
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// ── Push: show the notification ───────────────────────────────────────────────
self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    let data = {};
    try {
      if (event.data) {
        data = event.data.json();
      }
    } catch (e) {
      data = {
        title: 'Alumni Tutoring',
        body: event.data ? event.data.text() : 'You have a new notification',
      };
    }

    const title = data.title || 'Alumni Tutoring';
    const options = {
      body: data.body || 'You have a new notification',
      icon: '/notification-icon.png',
      badge: '/notification-icon.png',
      tag: data.tag || 'notification',
      renotify: true,
      data: {
        url: data.url || '/portal/messages',
      },
    };

    await self.registration.showNotification(title, options);
  })());
});

// ── Notification click: focus existing window or open new one ─────────────────
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url || '/portal/messages';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
