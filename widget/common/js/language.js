class Language{
    constructor(data){
        this.search = data.search || "";
        this.sortA = data.sortA || "";
        this.sortB = data.sortA || "";
    }
}

const Languages={
    TAG: "Language",
    get: (callback)=> {
        buildfire.datastore.get(Languages.TAG, (err, res) => {
            if(err) return callback(err, null);
            else return callback(null, res);
        })
    }, 
    save: (obj,callback)=> {
        buildfire.datastore.save(new Language(obj), Languages.TAG, (err, res) => {
            if(err) return callback(err, null);
            else return callback(null, res);
        })
    },
    update: (id,obj,callback)=> {
        buildfire.datastore.update(id,obj,Languages.TAG, (err, res) => {
            if(err) return callback(err, null);
            else return callback(null, res);
        })
    }
    
}