const PushNotifications = {
  subscribe: (options, callback) => {
    buildfire.notifications.pushNotification.subscribe(options, (err, res) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, res);
    });
  },
  unsubscribe: (options, callback) => {
    if (options.groupName) {
      buildfire.notifications.pushNotification.unsubscribe(
        options,
        (err, res) => {
          if (err) {
            return callback(err, null);
          }
          return callback(null, res);
        }
      );
    }
  },

  schedule: (options, callback) => {
    if (options.title && options.text) {
      buildfire.notifications.pushNotification.schedule(options, (err, res) => {
        if (err) return callback(err, null);
        return callback(null, res);
      });
    }
  },

  cancel: (notificationId, callback) => {
    if (notificationId) {
      buildfire.notifications.PushNotifications.cancel(
        notificationId,
        (err, res) => {
          if (err) return callback(err, null);
          return callback(null, res);
        }
      );
    }
  },
};

const LocalNotification = {
  checkPermission: (callback) => {
    buildfire.notifications.LocalNotification.checkPermission((err, res) => {
      if (err) return callback(err, null);
      return callback(null, res);
    });
  },
  requestPermission: (callback) => {
    buildfire.notifications.LocalNotification.requestPermission((err, res) => {
      if (err) return callback(err, null);
      return callback(null, res);
    });
  },
  schedule: (options, callback) => {
    if (options.title && options.text && options.at) {
      buildfire.notifications.localNotification.schedule(
        options,
        (err, res) => {
          if (err) return callback(err, null);
          return callback(null, res);
        }
      );
    }
  },
  send: (options, callback) => {
    if (options.text && options.title) {
      buildfire.notifications.localNotification.send(options, (err, res) => {
        if (err) return callback(err, null);
        return callback(null, res);
      });
    }
  },
  cancel: (notificationId, callback) => {
    if (notificationId) {
      buildfire.notifications.localNotification.cancel(
        notificationId,
        (err, res) => {
          if (err) return callback(err, null);
          return callback(null, res);
        }
      );
    }
  },
  // Event
  onClick: (callback) => {
    buildfire.notifications.localNotification.onClick = callback;
  },
};
