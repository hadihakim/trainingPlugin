class Introduction {
  constructor(data) {
    this.images = data.images || [];
    this.description = data.description || "";

    this.createdOn = data.createdOn || new Date();
    this.createdBy = data.createdBy || null;
    this.lastUpdatedOn = data.lastUpdatedOn || new Date();
    this.lastUpdatedBy = data.lastUpdatedBy || null;
    this.deletedOn = data.deletedOn || null;
    this.deletedBy = data.deletedBy || null;
    this.isActive = [0, 1].includes(data.isActive) ? data.isActive : 1;
  }
}

const Introductions = {
    TAG: "Introduction",
    get: (callback) => {
        buildfire.datastore.get(Introductions.TAG, (err, res) => {
            if (err) return callback(err, null);
            else return callback(null, res);
        })
    },
    save: (obj, callback) => {
        buildfire.datastore.save(new Introduction(obj), Introductions.TAG, (err, res) => {
            if (err) return callback(err, null);
            else return callback(null, res);
        })
    },
    update: (id, obj, callback) => {
        buildfire.datastore.update(id, obj, Introductions.TAG, (err, res) => {
            if (err) return callback(err, null);
            else return callback(null, res);
        })
    },
    carouselEvents: () => {
        // this method will be called when a new item added to the list
        editor.onAddItems = function (items) {
            save({ images: editor.items, description: tinymce.activeEditor.getContent() || "" });
            //console.log(tinymce.activeEditor.getContent(), "Testing WYSIWYG ")
        };
        // this method will be called when an item deleted from the list
        editor.onDeleteItem = function (item, index) {
            save({ images: editor.items, description: tinymce.activeEditor.getContent() || "" });
        };
        // this method will be called when you edit item details
        editor.onItemChange = function (item) {
            save({ images: editor.items, description: tinymce.activeEditor.getContent() || "" });
        };
        // this method will be called when you change the order of items
        editor.onOrderChange = function (item, oldIndex, newIndex) {
            save({ images: editor.items, description: tinymce.activeEditor.getContent() || "" });
        };
    },
    getImages: () => {
        return editor.items;
    },
    //handle the loading
    loadItems: (images, description) => {
        // create an instance and pass it the items if you don't have items yet just pass []
        editor.loadItems(images);
        tinymce.activeEditor.setContent(`${description}`);
    }
}
