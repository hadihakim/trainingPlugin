buildfire.messaging.sendMessageToWidget({
  show: false,
});
let data = null;
let addItem = document.getElementById("addItem");
addItem.addEventListener("click", (e) => {
  showSubPage();
});

let addItemEmptyState = document.getElementById("addItem-empty-state");
addItemEmptyState.addEventListener("click", (e) => {
  showSubPage();
});

Items.load((err, res) => {
  document.getElementById("items-table").style.visibility = "hidden";
  document.getElementById("empty-state").style.display = "none";
  document.getElementById("loading-state").style.display = "block";
  //console.log("from load", res);

  if (err) console.error(err);
  else if (res && res.length > 0) {
    //document.getElementById("empty-state").style.display = "none";
    data = res;
    Items.ui_create(
      "tbody",
      document.getElementById("items-table"),
      `
        ${res
          .map((el) => {
            return uiRow(el, "loadState");
          })
          .join("")}
        
        `,
      ["tableBody"]
    );
    document.getElementById("loading-state").style.display = "none";
    document.getElementById("items-table").style.visibility = "visible";
  } else {
    document.getElementById("loading-state").style.display = "none";
    document.getElementById("empty-state").style.display = "block";
  }
});

let searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", (e) => {
  Items.searchFilter(searchInput.value, (err, res) => {
    if (err) console.error(err);
    else if (res) {
      data = res;
      console.log("res", res);

      document.getElementById("loading-state").style.display = "none";
      var tbl = document.getElementById("items-table"); // Get the table
      if (tbl.getElementsByTagName("tbody").length > 0) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0]); // Remove first instance of body ‏
      }
      if (res.length == 0)
        document.getElementById("items-table").style.display = "none";
      else if (res.length > 0) {
        document.getElementById("items-table").style.display = "table";
        document.getElementById("items-table").style.visibility = "visible";
        Items.ui_create(
          "tbody",
          document.getElementById("items-table"),
          `
          ${res
            .map((el) => {
              return uiRow(el, "searchState");
            })
            .join("")}
          
          `
        );
        Analytics.trackAction("ITEM_SEARCHED");
      }
    }
  });
});

// -------------------------------Sort  ----------------------------------------------------//
let titleSort = document.getElementById("titleSort");
let subTitleSort = document.getElementById("subTitleSort");
let createDateSort = document.getElementById("dateSort");

titleSort.addEventListener("click", (e) => {
  sortevent(titleSort, "title", subTitleSort, createDateSort);
});

subTitleSort.addEventListener("click", (e) => {
  sortevent(subTitleSort, "Subtitle", titleSort, createDateSort);
});

createDateSort.addEventListener("click", (e) => {
  sortevent(createDateSort, "date", titleSort, subTitleSort);
});

const sortevent = (elemenet, sortby, ele1, ele2) => {
  let sort = null;
  elemenet.childNodes[1].classList.remove("hidden");
  elemenet.childNodes[1].classList.add("active");
  ele1.childNodes[1].classList.add("hidden");
  ele2.childNodes[1].classList.add("hidden");

  if (elemenet.childNodes[1]) {
    let el = elemenet.childNodes[1];
    if (el.classList.contains("icon-chevron-down")) {
      sort = -1;
      el.classList.remove("icon-chevron-down");
      el.classList.add("icon-chevron-up");
    } else {
      el.classList.remove("icon-chevron-up");
      el.classList.add("icon-chevron-down");
      sort = 1;
    }
  }
  let sortBy = sortby;
  searchSortHelper(data, sortBy, sort, (err, res) => {
    if (err) console.error(err);
    else if (res) {
      var tbl = document.getElementById("items-table"); // Get the table
      if (tbl.getElementsByTagName("tbody")) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0]);
      }
      Items.ui_create(
        "tbody",
        document.getElementById("items-table"),
        `
        ${res
          .map((el) => {
            return uiRow(el);
          })
          .join("")}
          `
      );
    }
  });
};

const croppedImage = (imgUrl) => {
  let croppedImg = buildfire.imageLib.cropImage(imgUrl, {
    size: "half_width",
    aspect: "1:1",
  });
  console.log("Cropped image url", croppedImg);
  return croppedImg;
};
const croppedCoverImage = (imgUrl) => {
  let croppedImg = buildfire.imageLib.cropImage(imgUrl, {
    size: "half_width",
    aspect: "16:9",
  });
  console.log("Cropped image url", croppedImg);
  return croppedImg;
};

function helpershowSubPage(id, e) {
  e = e || window.event;
  let element = e.target || e.srcElement;
  Items.getById(id, (err, res) => {
    if (err) return console.log(err);
    showSubPage(res, element);
    Analytics.trackAction("ITEM_CLICKED");
  });
}

const showSubPage = (item, element) => {
  if (!item) {
    let btn=document.getElementById("saveBtn");
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("subPage").style.display = "block";
   btn.setAttribute("onclick", `saveItem(${null},${element})`);
  }
  if (item) {
    let id = item["id"];
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("subPage").style.display = "block";
    document.getElementById("title").value = item.data.title;
    document.getElementById("subtitle").value = item.data.Subtitle;
    tinymce.activeEditor.setContent(item.data.description);
    thumbnail.loadbackground(item.data.listImage);
    thumbnail2.loadbackground(item.data.coverImage);
    // send message to widget
    buildfire.messaging.sendMessageToWidget({
      show: true,
      id: item.id,
      data: item.data,
    });
    document.getElementById("saveBtn").onclick = function () {
      saveItem(id, element);
    };
  }
};

const hideSubPage = () => {
  document.getElementById("mainPage").style.display = "block";
  document.getElementById("subPage").style.display = "none";
  title.value = "";
  subtitle.value = "";
  tinymce.activeEditor.setContent("");
  thumbnail.clear();
  thumbnail2.clear();
  buildfire.messaging.sendMessageToWidget({
    show: false,
  });
};

const removeRecord = (e) => {
  var table = document.getElementById("items-table");
  if (e.classList.contains("icon-cross2")) {
    e.parentElement.parentElement.parentElement.parentElement.remove();
  } else e.parentElement.parentElement.parentElement.remove();
  if (table.tBodies[0].rows.length == 0) {
    table.removeChild(table.getElementsByTagName("tbody")[0]);
    document.getElementById("items-table").style.visibility = "hidden";
    document.getElementById("empty-state").style.display = "block";
    return;
  }
  //var tbodyRowCount =;
};

const deleteItem = (id, e) => {
  e = e || window.event;
  let elemenet = e.target || e.srcElement;
  buildfire.dialog.confirm(
    {
      message: "Are you sure you want to delete the item?",
      confirmButton: {
        type: "danger",
        text: "Delete",
      },
    },
    (err, isConfirmed) => {
      if (err) console.error(err);

      if (isConfirmed) {
        Items.delete(id, (err, res) => {
          if (err) return console.error(err);
          else {
            removeRecord(elemenet);
            if (document.querySelectorAll(".searchState").length === 0) {
              document.getElementById("empty-state").style.display = "none";
            }
            Items.load((err, res) => {
              if (err) return console.error(err);
              else {
                if (res.length > 0) {
                  document.getElementById("empty-state").style.display = "none";
                } else {
                  document.getElementById("empty-state").style.display =
                    "block";
                }
              }
            });
          }
          buildfire.dialog.toast({
            message: "deleted",
            type: "success",
          });
        });
        Analytics.trackAction("ITEM_DELETED");
      } else {
        //Prevent action
      }
    }
  );
};

const addNewRow = (el) => {
  let table = document.getElementById("items-table");
  let tbody = null;
  let tr = null;
  if (table.tBodies.length > 0) {
    tbody = table.tBodies[0];
  }
  if (tbody != null) {
    Items.ui_create(
      "tr",
      tbody,
      `<td><div class="img-holder aspect-1-1"><img src="${el.listImage}" alt=""></div></td>
    <td><a class="link" onclick="helpershowSubPage('${el.id}');">${el.title}</a></td>
    <td>${el.Subtitle}</td>
    <td class="text-center">${el.createdOn}</td>
    <td>
                  <div class="pull-right">
                      <button class="btn bf-btn-icon" id="${el.id}" onclick="helpershowSubPage('${el.id}')"><span class="icon icon-pencil"></span></button>
                      <button class="btn bf-btn-icon" onclick="deleteItem('${el.id}')"><span class="icon icon-cross2"></span></button>
                  </div>
              </td>`
    );
  } else {
    Items.ui_create(
      "tbody",
      table,
      `
      <tr>
      <td><div class="img-holder aspect-1-1"><img src="${el.listImage}" alt=""></div></td>
    <td><a class="link" onclick="helpershowSubPage('${el.id}');">${el.title}</a></td>
    <td>${el.Subtitle}</td>
    <td class="text-center">${el.createdOn}</td>
    <td>
                  <div class="pull-right">
                      <button class="btn bf-btn-icon" id="${el.id}" onclick="helpershowSubPage('${el.id}')"><span class="icon icon-pencil"></span></button>
                      <button class="btn bf-btn-icon" onclick="deleteItem('${el.id}')"><span class="icon icon-cross2"></span></button>
                  </div>
              </td>
              </tr>`
    );
  }
  document.getElementById("loading-state").style.display = "none";
  document.getElementById("items-table").style.visibility = "visible";
};

const updateNewRecord = (obj, element) => {
  if (element.classList.contains("icon-pencil")) {
    element.parentElement.parentElement.parentElement.previousElementSibling.innerHTML =
      obj.createdOn;
    element.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.innerHTML =
      obj.Subtitle;
    element.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML = `<a class="link" onclick="helpershowSubPage('${obj.id}');">${obj.title}</a>`;
    element.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.firstChild.src =
      croppedImage(obj.listImage);
  } else {
    element.parentElement.parentElement.previousElementSibling.innerHTML =
      obj.createdOn;
    element.parentElement.parentElement.previousElementSibling.previousElementSibling.innerHTML =
      obj.Subtitle;
    element.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML = `<a class="link" onclick="helpershowSubPage('${obj.id}');">${obj.title}</a>`;
    element.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.firstChild.src =
      obj.listImage;
  }
};

const saveItem = (id, element) => {
  var table = document.getElementById("items-table");
  let newItem = {
    title: title.value,
    Subtitle: subtitle.value,
    listImage: croppedImage(thumbnail.imageUrl),
    coverImage: croppedCoverImage(thumbnail2.imageUrl),
    description: tinymce.activeEditor.getContent(),
  };
  if (id != null) {
    Items.edit(
      id,
      {
        createdOn: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        ...newItem,
      },
      (err, res) => {
        if (err) console.error(err);
        else console.log(res);
        updateNewRecord(
          { id: id, createdOn: res.data.createdOn, ...newItem },
          element
        );
        buildfire.dialog.toast({
          message: "updated",
          type: "success",
        });
      }
    );
  } else {
    if (
      newItem.title !== "" &&
      thumbnail.imageUrl !== "" &&
      thumbnail2.imageUrl !== ""
    ) {
      document.getElementById("items-table").style.visibility = "hidden";
      document.getElementById("empty-state").style.display = "none";
      document.getElementById("loading-state").style.display = "block";
      Items.insert(newItem, (err, res) => {
        document
          .querySelectorAll(".error-message")
          .forEach((el) => el.classList.add("hidden"));
        if (err) {
          if (table.tBodies[0].rows.length == 0) {
            document.getElementById("loading-state").style.display = "none";
            document.getElementById("empty-state").style.display = "block";
          } else {
            document.getElementById("loading-state").style.display = "none";
            document.getElementById("items-table").style.visibility = "visible";
          }
          return console.error(err);
        }
        addNewRow({ id: res.id, createdOn: res.data.createdOn, ...newItem });
      });
      Analytics.trackAction("ITEM_CREATED");
    } else {
      document
        .querySelectorAll(".error-message")
        .forEach((el) => el.classList.remove("hidden"));
      document.getElementById("mainPage").style.display = "none";
      document.getElementById("subPage").style.display = "block";
      return;
    }
  }
  title.value = "";
  subtitle.value = "";
  thumbnail.clear();
  thumbnail2.clear();
  tinymce.activeEditor.setContent("");

  document.getElementById("mainPage").style.display = "block";
  document.getElementById("subPage").style.display = "none";
  // buildfire.messaging.sendMessageToWidget({
  //   show: true,
  // });
};

const uiRow = (el, state) => {
  let row = `
          <tr class="${state}">
          <td><img class="img-holder" src="${croppedImage(
            el.data.listImage
          )}" alt=""></td>
          <td><a class="link" onclick="helpershowSubPage('${el.id}');">${
    el.data.title
  }</a></td>
          <td>${el.data.Subtitle}</td>
          <td class="text-center">${el.data.createdOn}</td>
          <td>
                        <div class="pull-right">
                            <button class="btn bf-btn-icon" id="${
                              el.id
                            }" onclick="helpershowSubPage('${
    el.id
  }')"><span class="icon icon-pencil"></span></button>
                            <button class="btn bf-btn-icon" onclick="deleteItem('${
                              el.id
                            }')"><span class="icon icon-cross2"></span></button>
                        </div>
                    </td>
          </tr>
          `;
  return row;
};

const massaging = () => {
  buildfire.messaging.onReceivedMessage = (message) => {
    console.log("Message received in control", message);
    if (message.show && message.data) {
      showSubPage(message, null);
    } else {
      document.getElementById("mainPage").style.display = "block";
      document.getElementById("subPage").style.display = "none";
    }
  };
};

massaging();
