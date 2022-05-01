buildfire.messaging.sendMessageToWidget({
  show: false,
});
tinymce.init({
  selector: "#wysiwygIntroduction",
  setup: (editor) => {
    editor.on("keyup change", (e) => {
      let content = tinymce.activeEditor.getContent();
      Introductions.save(
        { images: Introductions.getImages(), description: content },
        (err, res) => {
          if (err) console.error(err);
          return res;
        }
      );
    });
  },
});
//create a new instance of the buildfire carousel editor
let editor = new buildfire.components.carousel.editor(".carousel");

Introductions.get((err, res) => {
  if (err) console.error(err);
  else Introductions.loadItemsCP(res.data.images, res.data.description);
});
Introductions.carouselEvents();
