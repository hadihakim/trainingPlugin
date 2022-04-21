let strings;
function loadLanguage(lang) {
  console.log(lang);
  stringsContainer.classList.add("hidden");
  strings = new buildfire.services.Strings(lang, stringsConfig);
  strings.init().then(() => {
    showNewLanguageState(strings.id);
    strings.inject();
  });
  stringsUI.init("stringsContainer", strings, stringsConfig);
}
loadLanguage("en-us");

function showNewLanguageState(show) {
  if (show) {
    deleteButton.classList.remove("hidden");
    saveButton.classList.remove("hidden");
    stringsContainer.classList.remove("hidden");
    createButton.classList.add("hidden");
  } else {
    deleteButton.classList.add("hidden");
    saveButton.classList.add("hidden");
    stringsContainer.classList.add("hidden");
    createButton.classList.remove("hidden");
  }
}

function createLanguage(language) {
  stringsContainer.disabled = true;
  strings.createLanguage(language, () => {
    stringsContainer.disabled = false;
  });
  showNewLanguageState(true);
  return false;
}

function deleteLanguage() {
  buildfire.notifications.confirm(
    {
      message: "Are you sure you want to remove support fo this language?",
      confirmButton: { type: "danger" },
    },
    (e, r) => {
      if (r.selectedButton.key == "confirm") {
        strings.deleteLanguage(() => {
          loadLanguage(langOptions.value);
        });
      }
    }
  );
}

function save() {
  strings.save(() => {
    buildfire.messaging.sendMessageToWidget({ cmd: "refresh" });
  });
}
