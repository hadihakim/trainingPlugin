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
  get: async (callback) => {
    await buildfire.datastore.get(Introductions.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
  },
  save: async (obj, callback) => {
    await buildfire.datastore.save(
      new Introduction(obj),
      Introductions.TAG,
      (err, res) => {
        if (err) return callback(err, null);
        else return callback(null, res);
      }
    );
  },
  update: async (id, obj, callback) => {
    await buildfire.datastore.update(id, obj, Introductions.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
  },
  onUpdate: async (callback) => {
    await buildfire.datastore.onUpdate((e) => {
      return callback(e);
    });
  },
  carouselEvents: () => {
    // this method will be called when a new item added to the list
    editor.onAddItems = function (items) {
      Introductions._saveCP({
        images: editor.items,
        description: tinymce.activeEditor.getContent() || "",
      });
      //console.log(tinymce.activeEditor.getContent(), "Testing WYSIWYG ")
    };
    // this method will be called when an item deleted from the list
    editor.onDeleteItem = function (item, index) {
      Introductions._saveCP({
        images: editor.items,
        description: tinymce.activeEditor.getContent() || "",
      });
    };
    // this method will be called when you edit item details
    editor.onItemChange = function (item) {
      Introductions._saveCP({
        images: editor.items,
        description: tinymce.activeEditor.getContent() || "",
      });
    };
    // this method will be called when you change the order of items
    editor.onOrderChange = function (item, oldIndex, newIndex) {
      Introductions._saveCP({
        images: editor.items,
        description: tinymce.activeEditor.getContent() || "",
      });
    };
  },
  getImages: () => {
    return editor.items;
  },
  //handle the loading
  loadItemsCP: (images, description) => {
    // create an instance and pass it the items if you don't have items yet just pass []
    editor.loadItems(images);
    if (description) tinymce.activeEditor.setContent(`${description}`);
    else tinymce.activeEditor.setContent("");
  },
  //save any changes in items
  _saveCP: (items) => {
    Introductions.save(items, (err, res) => {
      if (err) console.error(err);
      else console.log("item saved in datastore");
    });
  },
};
