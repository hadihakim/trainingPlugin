const Analytics = {
  eventType: {
    ITEM_CREATED: "ITEM_CREATED",
    ITEM_CLICKED: "ITEM_CLICKED",
    ITEM_SEARCHED: "ITEM_SEARCHED",
    ITEM_DELETED: "ITEM_DELETED",
  },

  trackView: (eventName, metaData) => {
    if (eventName) return buildfire.analytics.trackView(eventName, metaData);
  },
  trackAction: (eventName, metaData) => {
    if (eventName) return buildfire.analytics.trackAction(eventName, metaData);
  },
  registerEvent: (event, options, callback) => {
    if (event.title && event.key) {
      let _options = options.silentNotification || true;
      buildfire.analytics.registerEvent(event, _options, (err, res) => {
        if (err) return callback(err, null);
        return callback(null, res);
      });
    }
  },
  unregisterEvent: (key, callback) => {
    if (key) {
      buildfire.analytics.unregisterEvent(key, (err, res) => {
        if (err) return callback(err, null);
        return callback(null, res);
      });
    }
  },
  showReports: (options, callback) => {
    if (options.eventKey) {
      buildfire.analytics.showReports(options, (err, res) => {
        if (err) return callback(err, null);
        return callback(null, res);
      });
    }
  },

  init: () => {
    Analytics.registerEvent(
      {
        title: "Item Created",
        key: Analytics.eventType.ITEM_CREATED,
        description: "Occurs when a user add a new item",
      },
      { silentNotification: false },
      (err, res) => {
        if (err) console.error(err);
        else console.log("from", res);
      }
    );

    Analytics.registerEvent(
      {
        title: "Item Clicked",
        key: Analytics.eventType.ITEM_CLICKED,
        description: "Occurs when a user click on item",
      },
      { silentNotification: false },
      (err, res) => {
        if (err) console.error(err);
        else console.log("from", res);
      }
    );

    Analytics.registerEvent(
      {
        title: "Item Searched",
        key: Analytics.eventType.ITEM_SEARCHED,
        description: "Occurs when a user search item",
      },
      { silentNotification: false },
      (err, res) => {
        if (err) console.error(err);
        else console.log("from", res);
      }
    );

    Analytics.registerEvent(
      {
        title: "Item Deleted",
        key: Analytics.eventType.ITEM_DELETED,
        description: "Occurs when a user delete item",
      },
      { silentNotification: false },
      (err, res) => {
        if (err) console.error(err);
        else console.log("from", res);
      }
    );
  },
};
