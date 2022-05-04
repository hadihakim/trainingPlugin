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
      else return  callback(null, res);
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
    };
    thumbnail.onDelete = (imageUrl) => {
    };
    thumbnail.loadbackground(imgUrl);
  },
};
const searchSortHelper = (data, attribute, sort, callback) => {
  if (attribute == "title") {
    let sortB = null;
    sort > 0 ? (sortB = -1) : (sortB = 1);
    Items.search(
      {
        sort: { title: sort },
      },
      (err, res) => {
        if (err) return callback(err, null);
        else {
          similarObj = [];
          res.forEach((el) => {
            if (data.some((item) => item.id === el.id)) {
              similarObj.push(el);
            }
          });
          return callback(null, similarObj);
        }
      }
    );
  }
  if (attribute == "Subtitle") {
    Items.search(
      {
        sort: { Subtitle: sort },
      },
      (err, res) => {
        if (err) return callback(err, null);
        else {
          similarObj = [];
          res.forEach((el) => {
            if (data.some((item) => item.id === el.id)) {
              similarObj.push(el);
            }
          });
          return callback(null, similarObj);
        }
      }
    );
  }
  if (attribute == "date") {
    Items.search(
      {
        sort: { createdOn: sort },
      },
      (err, res) => {
        if (err) return callback(err, null);
        else {
          similarObj = [];
          res.forEach((el) => {
            if (data.some((item) => item.id === el.id)) {
              similarObj.push(el);
            }
          });
          return callback(null, similarObj);
        }
      }
    );
  }
  ////
};
