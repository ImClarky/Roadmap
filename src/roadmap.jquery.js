;
(function ($) {
  $.Roadmap = function (el, options, dataset) {
    var self = this;
    self.el = el;
    self.$el = $(el);

    self.init = function () {
      self.options = $.extend({}, $.Roadmap.defaultOptions, options);
      self.months = $.Roadmap.months;

      if (typeof dataset === "object") {
        self.data = dataset;
      } else {
        throw "Error: Invalid dataset passed. Please pass a valid JSON object";
      }

      self.build();
    }

    self.build = function () {
      var isRight = true;

      $("<div/>", {class: "roadmap"}).appendTo(self.$el);
      $("<div/>", {class: "timeline"}).appendTo('.roadmap');

      $.each(self.data.events, function (i, event) {
        var $event = $("<div/>", {class: "event"});
        $('<span/>', {class: "point"}).appendTo($event);
        $('<div/>', {class: "body"}).appendTo($event);
        $('<div/>', {class: "header", text: event.title}).appendTo($($event).find('.body'));
        $('<div/>', {class: "content", text: event.content}).appendTo($($event).find('.body'));
        $('<div/>', {class: "timestamp", text: event.datetime}).appendTo($($event).find('.body'));

        var previousDT = (typeof self.data.events[i - 1] !== "undefined") ? self.data.events[i - 1].datetime : null;

        if (!self.inSameSection(event.datetime, previousDT)) {
          isRight = !isRight;
          var lOrR = (isRight) ? "right" : "left";

          $('<div/>', {class: "section " + lOrR}).appendTo('.timeline');
          $('<div/>', {class: "section-head", text: self.getSectionHeader(event.datetime)}).appendTo('.section:last');
        }

        $event.appendTo(".section:last");
      });
    }

    self.inSameSection = function (newDT, prevDT) {
      if (prevDT === null) {
        return false;
      } else {
        var newDT = new Date(newDT);
        var prevDT = new Date(prevDT);

        switch (self.options.sGroupBy) {
          case "d":
            // split doesnt remove timestamp at end of datetime
            // so use substr to get first 2 characters
            return (newDT.getDate() === prevDT.getDate() && newDT.getMonth() === prevDT.getMonth() && newDT.getFullYear() === prevDT.getFullYear());
          case "m":
            return (newDT.getMonth() === prevDT.getMonth() && newDT.getFullYear() === prevDT.getFullYear());
          case "y":
            return (newDT.getFullYear() === prevDT.getFullYear());
          default:
            throw "Error: Invalid sGroupBy value.";
        }
      }
    }

    self.getSectionHeader = function (dt) {
      var d = new Date(dt);
      switch (self.options.sGroupBy) {
        case "d":
          return $.Roadmap.days[d.getDay()] + ", " + d.getDate() + " " + $.Roadmap.months[d.getMonth()] + " " + d.getFullYear();
        case "m":
          return $.Roadmap.months[d.getMonth()] + " " + d.getFullYear();
        case "y":
          return d.getFullYear();
        default:
          throw "Error: Invalid sGroupBy value. Please use either 'd', 'm' or 'y' to group the events by day, month or year, respectively";
      }
    }

    self.init();
  }

  $.Roadmap.defaultOptions = {
    sGroupBy: "m"
  }

  $.Roadmap.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $.Roadmap.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  $.fn.roadmap = function (dataset, options) {
    return this.each(function () {
      (new $.Roadmap(this, options, dataset));
    });
  }
}(jQuery));

