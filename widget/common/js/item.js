class Item{
    constructor(data){
        this.title = data.title || "";
        this.Subtitle = data.Subtitle || 0;
        this.listImage = data.listImage || "";
        this.coverImage = data.coverImage || "";
        this.description = data.description || "";
    }
}

const Items={
    TAG: "Items",
    save: (item,callback)=> {
        buildfire.publicData.save(new Item(item), Items.TAG, (err, res) => {
            if(err) return callback(err, null);
            else return callback(null, res);
        })
        //callback(null,true);
    },
    edit: (id, obj,callback)=>{
        buildfire.publicData.update(id,obj,Items.TAG, (err, res)=> {
            if(err) return callback(err, null);
            else return callback(null, res);
        })
    },
    delete: (id, callback)=> {
        buildfire.publicData.delete(id, Items.TAG,(err, res)=> {
            if(err) return callback(err, null);
            else return callback(null, res);
        })
    },
    getById: (id,callback)=>{
        buildfire.publicData.getById(id, Items.TAG, (err, res) =>{
            if(err) return callback(err, null);
            else return callback(null, res);
        })
        
    },
    search: (options, callback)=>{
        buildfire.publicData.search(options, Items.TAG, (err, res) =>{
            if(err) return callback(err, null);
            else return callback(null, res);
        })
    }
}