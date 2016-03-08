"use strict";

var BBox = function BBox() {
  this.reset();
  // width/height act as property, but secretly evaluate when accessed.
  Object.defineProperty(this, "w", {
    get: function get() {
      return this.X - this.x;
    }
  });
  Object.defineProperty(this, "h", {
    get: function get() {
      return this.Y - this.y;
    }
  });
};

BBox.prototype = {
  center: function center() {
    return {
      x: (this.X + this.x) / 2,
      y: (this.Y + this.y) / 2
    };
  },
  grow: function grow(points) {
    var _this = this;

    if (!points.forEach) {
      points = [points];
    }
    points.forEach(function (p) {
      if (p.x < _this.x) {
        _this.x = p.x;
      }
      if (p.y < _this.y) {
        _this.y = p.y;
      }
      if (p.x > _this.X) {
        _this.X = p.x;
      }
      if (p.y > _this.Y) {
        _this.Y = p.y;
      }
    });
    return this;
  },
  expand: function expand(bbox) {
    if (bbox.x < this.x) {
      this.x = bbox.x;
    }
    if (bbox.y < this.y) {
      this.y = bbox.y;
    }
    if (bbox.X > this.X) {
      this.X = bbox.X;
    }
    if (bbox.Y > this.Y) {
      this.Y = bbox.Y;
    }
    return this;
  },
  getPoints: function getPoints() {
    return [{ x: this.x, y: this.y }, { x: this.X, y: this.y }, { x: this.X, y: this.Y }, { x: this.x, y: this.Y }];
  },
  reset: function reset(p) {
    this.x = 999999;
    this.y = 999999;
    this.X = -999999;
    this.Y = -999999;
    if (p) {
      this.grow(p);
    }
    return this;
  }
};

module.exports = BBox;