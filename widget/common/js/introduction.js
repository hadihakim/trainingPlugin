
class Introduction{
    constructor(data){
        this.images = data.images || [];
        this.description = data.description || "";
    }
}

const Introductions={
    TAG: "Introduction",
    get: (callback)=> {
        buildfire.datastore.get(Introductions.TAG, (err, res) => {
            if(err) return callback(err, null);
            else return callback(null, res);
        })
    }, 
    save: (obj,callback)=> {
        buildfire.datastore.save(new Introduction(obj), Introductions.TAG, (err, res) => {
            if(err) return callback(err, null);
            else return callback(null, res);
        })
    },
    update: (id,obj,callback)=> {
        buildfire.datastore.update(id,obj,Introductions.TAG, (err, res) => {
            if(err) return callback(err, null);
            else return callback(null, res);
        })
    }
    
}