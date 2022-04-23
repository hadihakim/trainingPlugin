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
    Items.ui_create(
      "tbody",
      document.getElementById("items-table"),
      `
        ${res
          .map((el) => {
            return `
          <tr>
          <td><div class="img-holder aspect-1-1"><img src="${croppedImage(
            el.data.listImage
          )}" alt=""></div></td>
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
      document.getElementById("loading-state").style.display = "none";
      var tbl = document.getElementById("items-table"); // Get the table

      if (tbl.getElementsByTagName("tbody").length > 0) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0]); // Remove first instance of body ‏
      }
      if (res.length == 0) return;
      Items.ui_create(
        "tbody",
        document.getElementById("items-table"),
        `
        ${res
          .map((el) => {
            return `
          <tr>
          <td><div class="img-holder aspect-1-1"><img src="${croppedImage(
            el.data.listImage
          )}" alt=""></div></td>
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
          })
          .join("")}
        
        `
      );
    }
  });
});

let titleSort = document.getElementById("titleSort");
titleSort.addEventListener("click", (e) => {
  let sort = null;
  if (titleSort.childNodes[1]) {
    let el = titleSort.childNodes[1];
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
  Items.searchSort(sort, (err, res) => {
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
            return `
          <tr>
          <td><div class="img-holder aspect-1-1"><img src="${croppedImage(
            el.data.listImage
          )}" alt=""></div></td>
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
          })
          .join("")}
        
        `
      );
    }
  });
});

const croppedImage = (imgUrl) => {
  let croppedImg = buildfire.imageLib.cropImage(imgUrl, {
    size: "xs",
    aspect: "1:1",
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
  });
}

const showSubPage = (item, element) => {
  if (!item) {
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("subPage").style.display = "block";
    document
      .getElementById("saveBtn")
      .setAttribute("onclick", `saveItem(${null},${element})`);
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
    document.getElementById("saveBtn").onclick = function () {
      saveItem(id, element);
    };
  }
};

const hideSubPage = () => {
  document.getElementById("mainPage").style.display = "block";
  document.getElementById("subPage").style.display = "none";
  document.getElementById("title").value = "";
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
          }
          buildfire.dialog.toast({
            message: "deleted",
            type: "success",
          });
        });
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
    element.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML =
    `<a class="link" onclick="helpershowSubPage('${obj.id}');">${obj.title}</a>`;
    element.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.firstChild.firstChild.src =
      croppedImage(obj.listImage);
  } else {
    element.parentElement.parentElement.previousElementSibling.innerHTML =
      obj.createdOn;
    element.parentElement.parentElement.previousElementSibling.previousElementSibling.innerHTML =
      obj.Subtitle;
    element.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML =
    `<a class="link" onclick="helpershowSubPage('${obj.id}');">${obj.title}</a>`;
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
    coverImage: thumbnail2.imageUrl,
    description: tinymce.activeEditor.getContent(),
  };
  if (id != null) {
    Items.edit(id, { createdOn: new Date(), ...newItem }, (err, res) => {
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
    });
  } else {
    if (
      newItem.title !== "" &&
      (newItem.listImage !== "") & (newItem.coverImage !== "")
    ) {
      document.getElementById("items-table").style.visibility = "hidden";
      document.getElementById("empty-state").style.display = "none";
      document.getElementById("loading-state").style.display = "block";
      217;
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
};
