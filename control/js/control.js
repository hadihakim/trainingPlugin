let addItem = document.getElementById("addItem");
addItem.addEventListener("click", (e) => {
  showSubPage();
});

Items.load((err, res) => {
  //console.log("from load", res);

  if (err) console.error(err);
  else if (res && res.length > 0) {
    document.getElementById("empty-state").style.display = "none";
    Items.ui_create(
      "tbody",
      document.getElementById("items-table"),
      `
        ${res
        .map((el) => {
          return `
          <tr>
          <td><div class="img-holder aspect-1-1"><img src="${el.data.listImage}" alt=""></div></td>
          <td>${el.data.title}</td>
          <td>${el.data.Subtitle}</td>
          <td class="text-center">${el.data.createdOn}</td>
          <td>
                        <div class="pull-right">
                            <button class="btn bf-btn-icon" id="${el.id}" onclick="helpershowSubPage('${el.id}')"><span class="icon icon-pencil"></span></button>
                            <button class="btn bf-btn-icon" onclick="deleteItem('${el.id}')"><span class="icon icon-cross2"></span></button>
                        </div>
                    </td>
          </tr>
          `;
        })
        .join("")}
        
        `,
      ["tableBody"]
    );
  } else {
    document.getElementById("items-table").style.display = "none";
  }
});

let searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", (e) => {
  Items.searchFilter(searchInput.value, (err, res) => {
    if (err) console.error(err);
    else if (res) {
      var tbl = document.getElementById("items-table"); // Get the table

      if (tbl.getElementsByTagName("tbody").length > 0) {
        tbl.removeChild(tbl.getElementsByTagName("tbody")[0]); // Remove first instance of body‏
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
          <td><div class="img-holder aspect-1-1"><img src="${el.data.listImage}" alt=""></div></td>
          <td>${el.data.title}</td>
          <td>${el.data.Subtitle}</td>
          <td class="text-center">${el.data.createdOn}</td>
          <td>
                        <div class="pull-right">
                        <button class="btn bf-btn-icon" id="${el.id}" onclick="helpershowSubPage('${el.id}')"><span class="icon icon-pencil"></span></button>
                        <button class="btn bf-btn-icon" onclick="deleteItem('${el.id}')"><span class="icon icon-cross2"></span></button>
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
          <td><div class="img-holder aspect-1-1"><img src="${el.data.listImage}" alt=""></div></td>
          <td>${el.data.title}</td>
          <td>${el.data.Subtitle}</td>
          <td class="text-center">${el.data.createdOn}</td>
          <td>
                        <div class="pull-right">
                        <button class="btn bf-btn-icon" id="${el.id}" onclick="helpershowSubPage('${el.id}')"><span class="icon icon-pencil"></span></button>
                        <button class="btn bf-btn-icon" onclick="deleteItem('${el.id}')"><span class="icon icon-cross2"></span></button>
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
    size: "600px",
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
      document.getElementById('saveBtn').setAttribute('onclick',`saveItem(${null},${element})`)
  }
  if (item) {
    let id = item['id'];
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("subPage").style.display = "block";
    document.getElementById("title").value = item.data.title;
    document.getElementById("subtitle").value = item.data.Subtitle;
    tinymce.activeEditor.setContent(item.data.description);
    thumbnail.loadbackground(item.data.listImage);
    thumbnail2.loadbackground(item.data.coverImage);


    document
      .getElementById("saveBtn")
      .addEventListener("click", (e) => saveItem(item));
  }
};
const saveItem = (id) => {
  let newItem = {
    title: title.value,
    Subtitle: subtitle.value,
    listImage: thumbnail.imageUrl,
    coverImage: thumbnail2.imageUrl,
    description: tinymce.activeEditor.getContent(),
  };
  console.log("new item", newItem);
  if (id) {
    Items.edit(id.id, { createdOn: new Date(), ...newItem }, (err, res) => {
      if (err) console.error(err);
      else console.log(res);
    });
  } else {
    Items.insert(newItem, (err, res) => {
      if (err) console.error(err);
      else console.log(res);
    });
  }

  document.getElementById("mainPage").style.display = "block";
  document.getElementById("subPage").style.display = "none";
  location.reload();
};
const hideSubPage = () => {
  document.getElementById("mainPage").style.display = "block";
  document.getElementById("subPage").style.display = "none";
  document.getElementById("title").value = "";
};

const removeRecord = (e) => {
  if (e.classList.contains('icon-cross2')) {
    e.parentElement.parentElement.parentElement.parentElement.remove();
  } else e.parentElement.parentElement.parentElement.remove()
}

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
          else removeRecord(elemenet);
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
    Items.ui_create('tr', tbody, `<td><div class="img-holder aspect-1-1"><img src="${el.listImage}" alt=""></div></td>
    <td>${el.title}</td>
    <td>${el.Subtitle}</td>
    <td class="text-center">${el.createdOn}</td>
    <td>
                  <div class="pull-right">
                      <button class="btn bf-btn-icon" id="${el.id}" onclick="helpershowSubPage('${el.id}')"><span class="icon icon-pencil"></span></button>
                      <button class="btn bf-btn-icon" onclick="deleteItem('${el.id}')"><span class="icon icon-cross2"></span></button>
                  </div>
              </td>`)
  }
}

const updateNewRecord = (obj, element) => {
  if (element.classList.contains('icon-pencil')) {
    element.parentElement
      .parentElement
      .parentElement.previousElementSibling.innerHTML = obj.createdOn;
    element.parentElement
      .parentElement
      .parentElement.previousElementSibling
      .previousElementSibling
      .innerHTML = obj.Subtitle;
    element.parentElement
      .parentElement
      .parentElement.previousElementSibling
      .previousElementSibling
      .previousElementSibling
      .innerHTML = obj.title;
    element.parentElement
      .parentElement
      .parentElement.previousElementSibling
      .previousElementSibling
      .previousElementSibling
      .previousElementSibling.firstChild.firstChild.src = obj.listImage
  } else {
    element.parentElement
      .parentElement.previousElementSibling.innerHTML = obj.createdOn;
    element.parentElement
      .parentElement.previousElementSibling
      .previousElementSibling
      .innerHTML = obj.Subtitle;
    element.parentElement
      .parentElement.previousElementSibling
      .previousElementSibling
      .previousElementSibling
      .innerHTML = obj.title;
    element.parentElement
      .parentElement.previousElementSibling
      .previousElementSibling
      .previousElementSibling
      .previousElementSibling.firstChild.firstChild.src = obj.listImage
  }
}

const saveItem = (id, element) => {
  console.log(id, element, "save Item safsfdds");
  let newItem = {
    title: title.value,
    Subtitle: subtitle.value,
    listImage: thumbnail.imageUrl,
    coverImage: thumbnail2.imageUrl,
    description: tinymce.activeEditor.getContent()
  }
  if (id != null) {
    Items.edit(id, { createdOn: new Date(), ...newItem }, (err, res) => {
      if (err) console.error(err);
      else console.log(res);
      updateNewRecord({ id: id, createdOn: res.data.createdOn, ...newItem }, element);
    })
  } else {
    Items.insert(newItem, (err, res) => {
      if (err) console.error(err);
      else console.log(res);
      addNewRow({ id: res.id, createdOn: res.data.createdOn, ...newItem });
    })
  }
  document.getElementById("mainPage").style.display = "block";
  document.getElementById("subPage").style.display = "none";
}