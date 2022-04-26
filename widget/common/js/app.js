let view = new buildfire.components.carousel.view("#carousel", []);
let description = document.getElementById("my_container_div");
const listView = new buildfire.components.listView("listViewContainer", {
  enableAddButton: false,
});
const init = () => {
  // load list view
  const getListViewData = async () => {
    let items = [];
    let options = {
      filter: {},
      sort: {},
    };

    await Items.search(options, (err, res) => {
      if (err) console.error(err);
      else {
        res.forEach((element) => {
          console.log(element);
          let itemObj = {
            id: element.id,
            title: element.data.title,
            description: element.data.description,
            imageUrl: element.data.coverImage,
            subTitle: element.data.Subtitle,
            data: element.data,
          };
          items.push(itemObj);
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
    else {
      loadItems(res.data.images);
      description.innerHTML = res.data.description;
    }
  });

  Introductions.onUpdate((e) => {
    console.log("event", e);
    loadItems(e.data.images);
    description.innerHTML = e.data.description;
  });

  // search text filed
  let timer;
  searchInput.addEventListener("keyup", (e) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if (searchInput.value != "") {
        carousel.classList.add("hidden");
        my_container_div.classList.add("hidden");
      } else {
        carousel.classList.remove("hidden");
        my_container_div.classList.remove("hidden");
      }
      search(searchInput.value);
    }, 100);
  });

  //  handle open drawer button click
  sortIcon.addEventListener("click", (e) => {
    drawer();
  });
};

const search = async (input) => {
  await Items.searchFilter(input, (err, res) => {
    if (err) console.error(err);
    else renderListView(res);
  });
};

const renderListView = (data) => {
  listView.clear();
  let items = [];
  data.forEach((element) => {
    console.log(element);
    let itemObj = {
      id: element.id,
      title: element.data.title,
      description: element.data.description,
      imageUrl: element.data.coverImage,
      subTitle: element.data.Subtitle,
      data: element.data,
    };
    items.push(itemObj);
  });

  console.log("items: >>>>", items);
  listView.loadListViewItems(items);
};

// add onClick handler for the items in the list view
listView.onItemClicked = (item) => {
  console.log(item.data, "item in list ");
  viewDetails(item.data);
};

//view details about item in list
const viewDetails = (item) => {
  if (item) {
    carousel.classList.add("hidden");
    my_container_div.classList.add("hidden");
    listViewContainer.classList.add("hidden");
    main.classList.add("hidden");
    // itemDetails_div.innerHTML=item.title;
    ui("img", itemDetails_div, item.coverImage, []);
    ui("img", itemDetails_div, item.listImage, []);
    ui("h3", itemDetails_div, item.title, []);
    ui("p", itemDetails_div, item.Subtitle, []);
    ui("div", itemDetails_div, description.innerHTML, []);
  }
};

function ui(elementType, appendTo, innerHTML, classNameArray) {
  let e = document.createElement(elementType);

  if (innerHTML) {
    if (elementType == "img") e.src = innerHTML;
    e.innerHTML = innerHTML;
  }
  if (Array.isArray(classNameArray))
    classNameArray.forEach((c) => e.classList.add(c));
  if (appendTo) appendTo.appendChild(e);
  return e;
}

const drawer = () => {
  console.log("drawer");
  buildfire.components.drawer.open(
    {
      listItems: [
        {
          id: "AtoZ",
          text: "Sort A - Z",
        },
        {
          id: "ZtoA",
          text: "Sort Z - A",
        },
      ],
    },
    (err, res) => {
      if (err) console.error(err);
      buildfire.components.drawer.closeDrawer();
    }
  );
};

// buildfire.navigation.onBackButtonClick = () => {
//   console.log("BACK BUTTON CLICKED");
// };

init();
