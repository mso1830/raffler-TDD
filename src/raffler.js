// Generated by CoffeeScript 1.6.3
(function() {
  var _ref, _ref1, _ref2, _ref3, _ref4, _ref5,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Raffler = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function() {
      new Raffler.Routers.Entries;
      return Backbone.history.start();
    }
  };

  $(document).ready(function() {
    return Raffler.init();
  });

  Raffler.Routers.Entries = (function(_super) {
    __extends(Entries, _super);

    function Entries() {
      _ref = Entries.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Entries.prototype.routes = {
      '': 'index',
      'entries/:id': 'show'
    };

    Entries.prototype.initialize = function() {
      this.collection = new Raffler.Collections.Entries();
      return this.collection.fetch();
    };

    Entries.prototype.index = function() {
      var view;
      view = new Raffler.Views.EntriesIndex({
        collection: this.collection
      });
      return $('#container').html(view.render().el);
    };

    return Entries;

  })(Backbone.Router);

  Raffler.Models.Entry = (function(_super) {
    __extends(Entry, _super);

    function Entry() {
      _ref1 = Entry.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Entry.prototype.defaults = {
      name: '',
      winner: false
    };

    return Entry;

  })(Backbone.Model);

  Raffler.Collections.Entries = (function(_super) {
    __extends(Entries, _super);

    function Entries() {
      _ref2 = Entries.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Entries.prototype.model = Raffler.Models.Entry;

    Entries.prototype.localStorage = new Store("second-backbone-coffee-raffle");

    return Entries;

  })(Backbone.Collection);

  Raffler.Views.EntriesIndex = (function(_super) {
    __extends(EntriesIndex, _super);

    function EntriesIndex() {
      _ref3 = EntriesIndex.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    EntriesIndex.prototype.template = _.template($('#item-template').html());

    EntriesIndex.prototype.events = {
      'click #new': 'createEntry',
      'click #draw': 'drawWinner',
      'click #reset': 'resetls',
      'click li': 'delete'
    };

    EntriesIndex.prototype.initialize = function() {
      this.collection.on('sync', this.render, this);
      this.collection.on('add', this.render, this);
      this.collection.on('change', this.render, this);
      return this.collection.on('destroy', this.render, this);
    };

    EntriesIndex.prototype.render = function() {
      $(this.el).html(this.template({
        entries: this.collection.toJSON()
      }));
      return this;
    };

    EntriesIndex.prototype.createEntry = function() {
      return this.collection.create({
        name: $('#new_entry').val()
      });
    };

    EntriesIndex.prototype.drawWinner = function() {
      var winner;
      winner = this.collection.shuffle()[0];
      if (winner) {
        winner.set({
          winner: true
        });
        return winner.save();
      }
    };

    EntriesIndex.prototype["delete"] = function(ev) {
      var item;
      console.log($(ev.target).attr('id'));
      item = this.collection.find(function(model) {
        return model.get("id") === $(ev.target).attr('id');
      });
      return item.destroy();
    };

    EntriesIndex.prototype.resetls = function() {
      return this.collection.each(function(item) {
        item.set({
          winner: false
        });
        return item.save();
      });
    };

    return EntriesIndex;

  })(Backbone.View);

  Raffler.Models.Entry = (function(_super) {
    __extends(Entry, _super);

    function Entry() {
      _ref4 = Entry.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    Entry.prototype.defaults = {
      name: '',
      winner: false
    };

    return Entry;

  })(Backbone.Model);

  Raffler.Collections.Entries = (function(_super) {
    __extends(Entries, _super);

    function Entries() {
      _ref5 = Entries.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    Entries.prototype.model = Raffler.Models.Entry;

    Entries.prototype.localStorage = new Store("backbone-reset");

    return Entries;

  })(Backbone.Collection);

}).call(this);
