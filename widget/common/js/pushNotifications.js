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
    buildfire.notifications.pushNotification.unsubscribe(
      options,
      (err, res) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, res);
      }
    );
  },

  schedule: (options, callback) => {
    buildfire.notifications.pushNotification.schedule(options, (err, res) => {
      if (err) return callback(err, null);
      return callback(null, res);
    });
  },

  cancel: (notificationId, callback) => {
    buildfire.notifications.PushNotifications.cancel(
      notificationId,
      (err, res) => {
        if (err) return callback(err, null);
        return callback(null, res);
      }
    );
  },
};
