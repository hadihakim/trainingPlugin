let view = new buildfire.components.carousel.view("#carousel", []);
let description = document.getElementById("my_container_div");

const listView = new buildfire.components.listView("listViewContainer", {
  enableAddButton: false,
});
let items = [];
let sortA = "";
let sortB = "";
const init = () => {
  // load list view

  const getListViewData = async () => {
    items = [];
    let list = document.getElementById("listViewContainer");
    let skipItems = list.childNodes.length;
    let options = {
      skip: skipItems,
      limit: 5,
    };

    await Items.search(options, (err, res) => {
      if (err) console.error(err);
      else if (res.length == 0 && skipItems == 0) {
        full_state.style.display = "none";
        empty_state.style.display = "flex";
      } else {
        full_state.style.display = "block";
        empty_state.style.display = "none";
        res.forEach((element) => {
          console.log(element);
          let itemObj = {
            id: element.id,
            title: element.data.title,
            description: element.data.description,
            imageUrl: element.data.listImage,
            subTitle: element.data.Subtitle,
            data: element.data,
          };
          items.push(itemObj);
        });
        listView.clear();
        createList(items);
      }
    });
  };

  const searchAndAddItems = async (listViewSize, items) => {
    buildfire.publicData.search(
      {
        skip: listViewSize,
        limit: 5,
      },
      "Items",
      (err, res) => {
        if (err)
          return console.error("there was a problem retrieving your data");
        res.forEach((element) => {
          let itemObj = {
            id: element.id,
            title: element.data.title,
            description: element.data.description,
            imageUrl: element.data.listImage,
            subTitle: element.data.Subtitle,
            data: element.data,
          };
          items.push(itemObj);
        });
        createList(items);
      }
    );
  };

  const UpdateOnList = (listViewSize, items) => {
    listViewSize < 5 ? (listViewSize = 5) : true;
    buildfire.publicData.search(
      {
        skip: 0,
        limit: listViewSize,
      },
      "Items",
      (err, res) => {
        if (err)
          return console.error("there was a problem retrieving your data");
        if (res.length == 0) {
          full_state.style.display = "none";
          empty_state.style.display = "flex";
          return;
        }
        full_state.style.display = "block";
        empty_state.style.display = "none";
        res.forEach((element) => {
          let itemObj = {
            id: element.id,
            title: element.data.title,
            description: element.data.description,
            imageUrl: element.data.listImage,
            subTitle: element.data.Subtitle,
            data: element.data,
          };
          items.push(itemObj);
        });
        listView.clear();
        createList(items);
      }
    );
  };

  const getNewItemsOnUpdate = async () => {
    let list = document.getElementById("listViewContainer");
    let listViewSize = list.childNodes.length;
    let items = [];
    await searchAndAddItems(listViewSize, items);
  };

  const onscrollHelper = async () => {
    let list = document.getElementById("listViewContainer");
    let listViewSize = list.childNodes.length;
    let items = [];
    if ((list.scrollTop + list.clientHeight) / list.scrollHeight > 0.99) {
      await searchAndAddItems(listViewSize, items);
    }
  };

  let scrollTimer;
  document.getElementById("listViewContainer").onscroll = function (e) {
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
      onscrollHelper();
    }, 100);
  };

  getListViewData();
  // load the list view
  const createList = (list) => {
    listView.loadListViewItems(list);
  };

  let onUpdateTimer;
  // on update the public data
  buildfire.publicData.onUpdate((event) => {
    full_state.style.display = "block";
    empty_state.style.display = "none";
    if (onUpdateTimer) {
      clearTimeout(onUpdateTimer);
    }
    onUpdateTimer = setTimeout(() => {
      if (event.tag == "Items") {
        UpdateOnList(
          document.getElementById("listViewContainer").childNodes.length,
          []
        );
        subItemInfoHandler(event);
      }
    }, 300);
  });

  // load the carousel items
  const loadItems = (carouselItems) => {
    //console.log("loadItems", carouselItems);
    // create an instance and pass it the items if you don'itemList have items yet just pass []
    view.loadItems(carouselItems);
  };

  //   get carousel items
  Introductions.get((err, res) => {
    if (err) console.error(err);
    else {
      loadItems(res.data.images);
      description.innerHTML = res.data.description;
    }
  });

  // get language data
  Languages.get((err, res) => {
    if (err) console.error(err);
    searchInput.placeholder = res.data.screenOne.search.value;
    sortA = res.data.screenOne.sortAsc.value;
    sortB = res.data.screenOne.sortDesc.value;
    console.log(res.data.screenOne, "language get data");
  });

  buildfire.datastore.onUpdate((e) => {
    if (e.tag == "Introduction") {
      console.log("event intro", e);
      loadItems(e.data.images);
      description.innerHTML = e.data.description;
    }
    if (e.tag == "$bfLanguageSettings_en-us") {
      console.log("event lang", e);
      searchInput.placeholder = e.data.screenOne.search.value;
      sortA = e.data.screenOne.sortAsc.value;
      sortB = e.data.screenOne.sortDesc.value;
    }
  });

  // buildfire.datastore.onUpdate((e)=>{

  // })

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
    }, 500);
  });

  //  handle open drawer button click
  sortIcon.addEventListener("click", (e) => {
    drawer();
  });

  // buildfire.publicData.onUpdate((event) => {
  //   //console.log("Data has been updated ", event);

  //   getListViewData(event);
  // });

  // on back Button Click

  let backTimer;

  buildfire.navigation.onBackButtonClick = () => {
    if (backTimer) {
      clearTimeout(backTimer);
    }

    backTimer = setTimeout(() => {
      if (mainPage.classList.contains("hidden") == true) {
        mainPage.classList.remove("hidden");
        subPage.classList.add("hidden");
        return;
      }
      buildfire.auth.login({}, (err, user) => {
        console.log(err, user);
      });
    }, 100);
  };
};

const search = async (input) => {
  Items.searchFilter(input, (err, res) => {
    if (err) console.error(err);
    else renderListView(res);
  });
};

const renderListView = (data) => {
  listView.clear();
  items = [];
  data.forEach((element) => {
    //console.log(element);
    let itemObj = {
      id: element.id,
      title: element.data.title,
      description: element.data.description,
      imageUrl: element.data.listImage,
      subTitle: element.data.Subtitle,
      data: element.data,
    };
    items.push(itemObj);
  });

  //console.log("items: >>>>", items);
  listView.loadListViewItems(items);
};

// add onClick handler for the items in the list view
listView.onItemClicked = (item) => {
  //console.log(item.data, "item in list ");
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
  buildfire.components.drawer.open(
    {
      listItems: [
        {
          id: 1,
          text: sortA,
        },
        {
          id: -1,
          text: sortB,
        },
      ],
    },
    (err, res) => {
      if (err) console.error(err);
      buildfire.components.drawer.closeDrawer();
      searchSortHelper(items, res.id, (err, res) => {
        if (err) console.log(err);

        items = [];
        listView.clear();
        res.forEach((element) => {
          console.log(element);
          let itemObj = {
            id: element.id,
            title: element.data.title,
            description: element.data.description,
            imageUrl: element.data.listImage,
            subTitle: element.data.Subtitle,
            data: element.data,
          };
          items.push(itemObj);
        });
        listView.loadListViewItems(items);
      });
    }
  );
};

const supPageHandler = () => {
  listView.onItemClicked = (item) => {
    subItemInfoHandler(item);
    console.log("item selected", item);
    buildfire.messaging.sendMessageToControl({
      show: true,
      data: item.data,
    });
  };
};

// show item data in sub page
const subItemInfoHandler = (item) => {
  title.innerHTML = item.data.title;
  subtitle.innerHTML = item.data.Subtitle;
  coverImage.src = item.data.coverImage;
  listImage.src = item.data.listImage;
  my_sub_container_div.innerHTML = item.data.description;
  mainPage.classList.add("hidden");
  subPage.classList.remove("hidden");
};

const imagePreviewer = (imgUrl) => {
  buildfire.imagePreviewer.show({
    images: [imgUrl],
  });
};

// croped image
const cropImageHandler = (imgUrl) => {
  let croppedImage = buildfire.imageLib.cropImage(imgUrl, {
    size: "half_width",
    aspect: "16:9",
  });
  return croppedImage;
};

// massaging

const massaging = () => {
  buildfire.messaging.onReceivedMessage = (message) => {
    if (!message.show) {
      mainPage.classList.remove("hidden");
      subPage.classList.add("hidden");
    }

    if (message.data && message.show) {
      subItemInfoHandler(message);
    }
  };
};
<<<<<<< HEAD

=======
document.getElementById("listViewContainer").classList.remove("full-width");
>>>>>>> ab211d6eba0b89ee2e75f140aab04b71323a19a0
massaging();
supPageHandler();
init();
