class Item {
  constructor(data) {
    this.id = data.id;
    this.title = data.title || "";
    this.Subtitle = data.Subtitle || 0;
    this.listImage = data.listImage || "";
    this.coverImage = data.coverImage || "";
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

const Items = {
  TAG: "Items",
  save: (item, callback) => {
    buildfire.publicData.save(new Item(item), Items.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
    //callback(null,true);
  },
  insert: (item, callback) => {
    buildfire.publicData.insert(
      new Item(item),
      Items.TAG,
      false,
      (err, res) => {
        if (err) return callback(err, null);
        else return callback(null, res);
      }
    );
    //callback(null,true);
  },
  edit: (id, obj, callback) => {
    buildfire.publicData.update(id, obj, Items.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
  },
  get: (callback) => {
    buildfire.publicData.get(Items.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
  },
  delete: (id, callback) => {
    buildfire.publicData.delete(id, Items.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
  },
  getById: (id, callback) => {
    buildfire.publicData.getById(id, Items.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
  },
  search: (options, callback) => {
    buildfire.publicData.search(options, Items.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
  },

  ui_create: (elementType, appendTo, innerHTML, classNameArray) => {
    let e = document.createElement(elementType);
    if (innerHTML) e.innerHTML = innerHTML;
    if (Array.isArray(classNameArray))
      classNameArray.forEach((c) => e.classList.add(c));
    if (appendTo) appendTo.appendChild(e);
    return e;
  },

  load: (callback) => {
    Items.search({}, (err, res) => {
      if (err) return callback(err, null);
      else {
        return callback(null, res);
      }
    });
  },
  searchFilter: (searchItem, callback) => {
    console.log("from SF", searchItem);
    if (searchItem === "" || searchItem === null) {
      Items.search({}, (err, res) => {
        if (err) return callback(err, null);
        else {
          return callback(null, res);
        }
      });
      return;
    }
    Items.search(
      {
        filter: {
          $or: [
            { "$json.title": searchItem },
            { "$json.Subtitle": searchItem },
          ],
        },
      },
      (err, res) => {
        if (err) return callback(err, null);
        else {
          return callback(null, res);
        }
      }
    );
  },
  searchSort: (sort, callback) => {
    let sortB = null;
    sort > 0 ? (sortB = -1) : (sortB = 1);
    Items.search(
      {
        sort: { title: sort, Subtitle: sortB },
      },
      (err, res) => {
        if (err) return callback(err, null);
        else {
          return callback(null, res);
        }
      }
    );
  },
  thumbnailEvents: (imageUrl) => {
    thumbnail.onChange = (imageUrl) => {
      console.log("Image was changed to", imageUrl);
    };
    thumbnail.onDelete = (imageUrl) => {
      console.log("Image was delted", imageUrl);
    };
    thumbnail.loadbackground(imgUrl);
  },
};
