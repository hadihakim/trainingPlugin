const thumbnail = new buildfire.components.images.thumbnail(
  ".thumbnail-picker",
  {
    imageUrl: "",
    title: " ",
    dimensionsLabel: "Recommended: 600 x 600px",
    multiSelection: false,
  }
);
const thumbnail2 = new buildfire.components.images.thumbnail(
  ".thumbnail-picker2",
  {
    imageUrl: "",
    title: " ",
    dimensionsLabel: "Recommended: 1200x675px",
    multiSelection: false,
  }
);

tinymce.init({
  selector: "#wysiwygContent",
});

const navigateToTab = () => {
  buildfire.navigation.navigateToTab(
    {
      tabTitle: "Introduction",
      deeplinkData: { username: "John" },
    },
    (err) => {
      if (err) return console.error(err);
    }
  );
};

// for analytics

Analytics.init();
