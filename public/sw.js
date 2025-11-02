/* eslint-env serviceworker */

// Service Worker para manejar notificaciones push
// Este archivo debe estar en la raíz public para ser accesible

self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalado');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activado');
  event.waitUntil(self.clients.claim());
});

// Manejar eventos push
self.addEventListener('push', (event) => {
  console.log('Service Worker: Notificación push recibida');

  let notificationData = {
    title: 'Alerta DIR-Soacha',
    body: 'Nueva alerta climática',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    data: { url: '/alerts' }
  };

  // Parsear datos si están disponibles
  if (event.data) {
    try {
      const payload = event.data.json();
      notificationData = {
        ...notificationData,
        ...payload
      };
    } catch (error) {
      console.error('Error parseando datos de notificación:', error);
    }
  }

  // Configurar opciones de notificación según severidad
  const severity = notificationData.severity || 'medium';
  let notificationOptions = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    data: notificationData.data,
    requireInteraction: severity === 'high', // Notificaciones de alta severidad requieren interacción
    vibrate: severity === 'high' ? [200, 100, 200, 100, 200] : [200, 100, 200],
    actions: [
      {
        action: 'view',
        title: 'Ver Detalles',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/icons/icon-192x192.png'
      }
    ]
  };

  // Añadir etiqueta visual según severidad
  if (severity === 'high') {
    notificationOptions.tag = 'alert-high';
    notificationOptions.renotify = true;
  } else if (severity === 'medium') {
    notificationOptions.tag = 'alert-medium';
  } else {
    notificationOptions.tag = 'alert-low';
  }

  // Mostrar la notificación
  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationOptions)
  );
});

// Manejar clics en la notificación
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notificación clickeada');
  
  event.notification.close();

  // Determinar la acción
  const action = event.action;
  const notificationData = event.notification.data || {};
  const urlToOpen = notificationData.url || '/alerts';

  if (action === 'close') {
    return;
  }

  // Abrir o enfocar la ventana de la aplicación
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Buscar una ventana abierta con la URL
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // Si no hay ventana abierta, abrir una nueva
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      })
  );
});

// Manejar cierre de notificación
self.addEventListener('notificationclose', (event) => {
  console.log('Service Worker: Notificación cerrada', event.notification.tag);
});
