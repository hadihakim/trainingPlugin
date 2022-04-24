class Item {
  constructor(data) {
    this.id = data.id;
    this.title = data.title || "";
    this.Subtitle = data.Subtitle || 0;
    this.listImage = data.listImage || "";
    this.coverImage = data.coverImage || "";
    this.description = data.description || "";

    this.createdOn =
      data.createdOn ||
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    this.createdBy = data.createdBy || null;
    this.lastUpdatedOn =
      data.lastUpdatedOn ||
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    this.lastUpdatedBy = data.lastUpdatedBy || null;
    this.deletedOn = data.deletedOn || null;
    this.deletedBy = data.deletedBy || null;
    this.isActive = [0, 1].includes(data.isActive) ? data.isActive : 1;
  }
}
const Items = {
  TAG: "Items",
  save: async (item, callback) => {
    await buildfire.publicData.save(new Item(item), Items.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
    //callback(null,true);
  },
  insert: async (item, callback) => {
    await buildfire.publicData.insert(
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
  edit: async (id, obj, callback) => {
    await buildfire.publicData.update(id, obj, Items.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
  },
  get: async (callback) => {
    await buildfire.publicData.get(Items.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
  },
  delete: async (id, callback) => {
    await buildfire.publicData.delete(id, Items.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
  },
  getById: async (id, callback) => {
    await buildfire.publicData.getById(id, Items.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
  },
  search: async (options, callback) => {
    await buildfire.publicData.search(options, Items.TAG, (err, res) => {
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

  load: async (callback) => {
    await Items.search({}, (err, res) => {
      if (err) return callback(err, null);
      else {
        return callback(null, res);
      }
    });
  },
  searchFilter: async (searchItem, callback) => {
    console.log("from SF", searchItem);
    if (searchItem === "" || searchItem === null) {
      await Items.search({}, (err, res) => {
        if (err) return callback(err, null);
        else {
          return callback(null, res);
        }
      });
      return;
    }
    await Items.search(
      {
        filter: {
          $or: [
            { "$json.title": { $regex: searchItem, $options: "i" } },
            { "$json.Subtitle": { $regex: searchItem, $options: "i" } },
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
const searchSortHelper = (data, sort, callback) => {

  let sortB = null;
  sort > 0 ? (sortB = -1) : (sortB = 1);
  console.log(data, "before sort");
  Items.search(
    {
      sort: { title: sort, Subtitle: sortB },
    },
    (err, res) => {
      if (err) return callback(err, null);
      else {
        console.log(res, "after sort");
        similarObj = [];
        res.forEach(el =>{
          if(data.some(item=> item.id === el.id)){
            similarObj.push(el);
          }
        })
          return callback(null, similarObj)

        
      }
    }
  );


}