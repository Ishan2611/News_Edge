if ('serviceWorker' in navigator && 'SyncManager' in window) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(reg => {
          console.log('Service Worker registered ✅');
  
          // Register sync event
          reg.sync.register('sync-news');
        })
        .catch(err => console.error('Service Worker registration failed ❌', err));
    });
  }
  