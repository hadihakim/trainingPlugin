mocha.setup("bdd");
mocha.checkLeaks();

let expect = chai.expect;
describe("Control - Widget", function () {
  describe("Items Screen", function () {
    describe("Item Tests", function () {
      it("expect Item to be an function", function () {
        expect(Item).to.be.an("function");
      });
      let i = new Item({});
      it("expect Item to have a property title", function () {
        expect(i).to.have.property("title");
      });
      it("expect Item to have a property Subtitle", function () {
        expect(i).to.have.property("Subtitle");
      });
      it("expect Item to have a property listImage", function () {
        expect(i).to.have.property("listImage");
      });
      it("expect Item to have a property coverImage", function () {
        expect(i).to.have.property("coverImage");
      });
      it("expect Item to have a property description", function () {
        expect(i).to.have.property("description");
      });
      it("expect Items to be an object", function () {
        expect(Items).to.be.an("object");
      });
      it("expect Items to have function save", function () {
        expect(Items).to.have.property("save").to.be.an("function");
      });
      it("expect Items to have function edit", function () {
        expect(Items).to.have.property("edit").to.be.an("function");
      });
      it("expect Items to have function delete", function () {
        expect(Items).to.have.property("delete").to.be.an("function");
      });
      it("expect Items to have function getById", function () {
        expect(Items).to.have.property("getById").to.be.an("function");
      });
      it("expect Items to have function search", function () {
        expect(Items).to.have.property("search").to.be.an("function");
      });
    });
  });

  describe("Introduction Screen", function () {
    describe("introduction Tests", function () {
      it("expect Introduction to be an function", function () {
        expect(Introduction).to.be.an("function");
      });
      let intro = new Introduction({});
      it("expect Introduction to have a property images", function () {
        expect(intro).to.have.property("images");
      });
      it("expect Introduction to have a property description", function () {
        expect(intro).to.have.property("description");
      });
      it("expect Introductions to be an object", function () {
        expect(Introductions).to.be.an("object");
      });
      it("expect Introductions to have function get", function () {
        expect(Introductions).to.have.property("get").to.be.an("function");
      });
      it("expect Introductions to have function save", function () {
        expect(Introductions).to.have.property("save").to.be.an("function");
      });
      it("expect Introductions to have function update", function () {
        expect(Introductions).to.have.property("update").to.be.an("function");
      });
    });
  });

  describe("Language Screen", function () {
    describe("language Tests", function () {
      it("expect Language to be an function", function () {
        expect(Language).to.be.an("function");
      });
      let lang = new Language({});
      it("expect Language to have a property search", function () {
        expect(lang).to.have.property("search");
      });
      it("expect Language to have a property sortA", function () {
        expect(lang).to.have.property("sortA");
      });
      it("expect Language to have a property sortB", function () {
        expect(lang).to.have.property("sortB");
      });
      it("expect Languages to have function get", function () {
        expect(Languages).to.have.property("get").to.be.an("function");
      });
      it("expect Languages to have function save", function () {
        expect(Languages).to.have.property("save").to.be.an("function");
      });
      it("expect Languages to have function update", function () {
        expect(Languages).to.have.property("update").to.be.an("function");
      });
    });
  });
});
mocha.run();
