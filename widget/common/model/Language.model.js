class Language {
    constructor(data = {}) {
      this.search = data.search || "search";
      this.sortA = data.sortA || "Sort A - Z";
      this.sortB = data.sortB || "Sort Z - A";
  
      this.createdOn = data.createdOn || new Date();
      this.createdBy = data.createdBy || null;
      this.lastUpdatedOn = data.lastUpdatedOn || new Date();
      this.lastUpdatedBy = data.lastUpdatedBy || null;
      this.deletedOn = data.deletedOn || null;
      this.deletedBy = data.deletedBy || null;
      this.isActive = [0, 1].includes(data.isActive) ? data.isActive : 1;
    }
  }
  