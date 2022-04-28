class Language {
  constructor(data = {}) {
    this.search = data.search || "search";
    this.sortA = data.sortA || "";
    this.sortB = data.sortB || "";

    this.createdOn = data.createdOn || new Date();
    this.createdBy = data.createdBy || null;
    this.lastUpdatedOn = data.lastUpdatedOn || new Date();
    this.lastUpdatedBy = data.lastUpdatedBy || null;
    this.deletedOn = data.deletedOn || null;
    this.deletedBy = data.deletedBy || null;
    this.isActive = [0, 1].includes(data.isActive) ? data.isActive : 1;
  }
}

const Languages = {
  TAG: "$bfLanguageSettings_en-us",
  get: async (callback) => {
    await buildfire.datastore.get(Languages.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
  },
  save: async (obj, callback) => {
    await buildfire.datastore.save(
      new Language(obj),
      Languages.TAG,
      (err, res) => {
        if (err) return callback(err, null);
        else return callback(null, res);
      }
    );
  },
  update: async (id, obj, callback) => {
    await buildfire.datastore.update(id, obj, Languages.TAG, (err, res) => {
      if (err) return callback(err, null);
      else return callback(null, res);
    });
  },
  onUpdate: async (callback) => {
    await buildfire.datastore.onUpdate((e) => {
      return callback(e);
    });
  },
};
