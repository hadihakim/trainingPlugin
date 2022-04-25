let view = new buildfire.components.carousel.view("#carousel", []);
let description = document.getElementById("my_container_div");
const listView = new buildfire.components.listView("listViewContainer", {
  enableAddButton: true,
});
const init = () => {
  // load list view
  const getListViewData = async () => {
    let itemList = new ListViewItem();
    let items = [];
    let options = {
      filter: {},
      sort: {},
    };

    await Items.search({}, (err, res) => {
      if (err) console.error(err);
      else {
        res.forEach((element) => {
          itemList.id = element.id;
          itemList.title = element.data.title;
          itemList.description = element.data.description;
          itemList.imageUrl = element.data.coverImage;
          itemList.subTitle = element.data.Subtitle;
          itemList.data = element.data;
          items.push(itemList);
        });
      }
    });
   setTimeout(() => {
       
       console.log("items: >>>>", items);
       listView.loadListViewItems(items);
   }, 1000);
  };

  // load the carousel items
  const loadItems = (carouselItems) => {
    console.log("loadItems", carouselItems);
    // create an instance and pass it the items if you don'itemList have items yet just pass []
    view.loadItems(carouselItems);
    getListViewData();
  };

  //   get carousel items
  Introductions.get((err, res) => {
    if (err) console.error(err);
    else loadItems(res.data.images);
  });

  Introductions.onUpdate((e) => {
    console.log("event", e);
    loadItems(e.data.images);
    description.innerHTML = e.data.description;
  });
};

init();
