describe 'Raffler App TDD ', ->
    @collection = view= Routers = undefined
  beforeEach ->
    @collection = new Raffler.Collections.Entries()
    @collection.fetch()
    view = new Raffler.Views.EntriesIndex(collection: @collection)
  model = new Raffler.Models.Entry
  router= new Raffler.Routers.Entries
  Backbone.history.start()
  describe 'Raffler', ->
    it "should have Raffler defined", ->
    expect(Raffler).toBeDefined()
    it "should have model defined",->
    expect(Raffler.Models.Entry).toBeDefined()
    it "should have collection defined",->
    expect(Raffler.Collections.Entries).toBeDefined()
  describe "test default for models", ->
    it "should have winner set to false", ->
      expect(model.attributes.winner).toEqual false
    it "should have name set to blank", ->
      expect(model.attributes.name).toEqual ''
  describe "test adding new model", ->
    it "should increase collection length", ->
      count = @collection.length
      @collection.create name: 'MOE'
      count2 = @collection.length
      expect(count2).toEqual count + 1
  describe "reseting winners to false", ->
      it "should clear all previous winners", ->
        $(reset).trigger 'click'
        expect(@collection.models.winner).not.toEqual false
  describe "Drawing a new winner", ->
      it "should select a model and set winner to true", ->
        $(draw).trigger 'click'
        expect(model.attributes.winner).not.toEqual true