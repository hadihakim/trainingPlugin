const Analytics={
    trackView: (eventName, metaData) => {
        return buildfire.analytics.trackView(eventName, metaData);
    },
    trackAcion: (eventName, metaData) => {
        return buildfire.analytics.trackAction(eventName, metaData);
    },
    registerEvent: (event, options, callback) => {
        buildfire.analytics.registerEvent(event, options, (err, res)=> {
            if(err) return callback(err, null)
            return callback(null,res)
        })
    },
    unregisterEvent: (key, callback) => {
        buildfire.analytics.unregisterEvent(key, (err, res) => {
            if(err) return callback(err ,null)
            return callback(null, res)
        });
    },
    showReports: (options, callback) => {
        buildfire.analytics.showReports(options,  (err, res) => {
            if(err) return callback(err ,null)
            return callback(null, res)
        });
    },
}