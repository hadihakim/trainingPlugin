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
