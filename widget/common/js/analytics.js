<<<<<<< HEAD
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
=======
const Analytics={
    trackView: (eventName, metaData) => {
        if(eventName)
            return buildfire.analytics.trackView(eventName, metaData);
        },
    trackAcion: (eventName, metaData) => {
        if(eventName)
            return buildfire.analytics.trackAction(eventName, metaData);
    },
    registerEvent: (event, options, callback) => {
        if(event.title && event.key){
            let _options = options.silentNotification || true;
            buildfire.analytics.registerEvent(event, _options, (err, res)=> {
                if(err) return callback(err, null)
                return callback(null,res)
            })
        }    
    },
    unregisterEvent: (key, callback) => {
        if(key){
            buildfire.analytics.unregisterEvent(key, (err, res) => {
                if(err) return callback(err ,null)
                return callback(null, res)
            });
        }
    },
    showReports: (options, callback) => {
        if(options.eventKey){
            buildfire.analytics.showReports(options,  (err, res) => {
                if(err) return callback(err ,null)
                return callback(null, res)
            });
        } 
    },
>>>>>>> ce72be661502704b5a042193f05ad475ac4a878b
}