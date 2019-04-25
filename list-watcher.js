var ListWatcher = function(t) {
  this.stage = t,
  this.color = "#ee7d16",
  this.listName = "list",
  this.label = "list-watcher",
  this.contents = [],
  this.visible = !0,
  this.x = 5,
  this.y = 5,
  this.width = 102,
  this.height = 202,
  this.scrollbarWidth = 10,
  this.scrollbarMarginRight = 4,
  this.cellGap = 20,
  this.cellHeight = 15,
  this.scrollbarY = this.cellGap,
  this.start = 0
};
ListWatcher.prototype.fromJSON = function(t) {
  if (t.color) {
    var i = (t.color < 0 ? t.color + 16777216 : t.color).toString(16);
    this.color = "#000000".slice(0, -i.length) + i
  }
  return this.label = t.listName || "",
  this.listName = t.listName || "",
  this.contents = t.contents || [],
  this.visible = null == t.visible || t.visible,
  this.x = t.x || 0,
  this.y = t.y || 0,
  this.width = t.width || 0,
  this.height = t.height || 0,
  this.targetName = t.target || "Stage",
  this.maxCell = Math.floor((this.height - 2 * this.cellGap) / this.cellHeight),
  this
}
,
ListWatcher.prototype.resolve = function() {
  this.target = this.stage.getObject(this.targetName),
  this.target && (this.target.watchers[this.listName] = this),
  this.target.isSprite && (this.label = this.target.objName + ": " + this.label)
}
,
ListWatcher.prototype.fixValue = function(t) {
  "number" == typeof t && (t < .001 || .001 < t) && (t = Math.round(1e3 * t) / 1e3),
  t = "" + t
}
,
ListWatcher.prototype.draw = function(t) {
  if (this.contents = this.target.lists[this.listName],
  this.contents) {
    if (this.stage.mousePressed && this.stage.mouseMoving) {
      var i = this.stage.mouseX + 240 - this.x
        , h = 180 - this.stage.mouseY - this.y;
      i <= this.width && i >= this.width - this.scrollbarWidth - this.scrollbarMarginRight - this.width / 4 && 0 <= h && h <= this.height && (h = h < this.cellGap ? this.cellGap : h,
      this.scrollbarY = h,
      this.contents.length > this.maxCell ? this.start = Math.min(Math.ceil((h - this.cellGap) / (this.height - 2 * this.cellGap) * this.contents.length), this.contents.length - this.maxCell) : this.start = 0)
    } else
      this.contents.length > this.maxCell ? this.start = Math.min(Math.ceil((this.scrollbarY - this.cellGap) / (this.height - 2 * this.cellGap) * this.contents.length), this.contents.length - this.maxCell) : this.start = 0;
    for (var s = 0; s < this.contents.length; s++)
      this.fixValue(this.contents[s]);
    null == this.labelWidth && (t.font = "bold 11px sans-serif",
    this.labelWidth = t.measureText(this.label).width),
    t.save(),
    t.translate(this.x, this.y),
    t.font = "bold 11px sans-serif";
    var e = this.width
      , l = this.height;
    t.strokeStyle = "rgb(148, 145, 145)",
    t.fillStyle = "rgb(193, 196, 199)",
    t.lineWidth = 2,
    t.beginPath(),
    t.arc(6, 6, 5, Math.PI, 3 * Math.PI / 2, !1),
    t.arc(e - 5 - 1, 6, 5, 3 * Math.PI / 2, 0, !1),
    t.arc(e - 5 - 1, l - 5 - 1, 5, 0, Math.PI / 2, !1),
    t.arc(6, l - 5 - 1, 5, Math.PI / 2, Math.PI, !1),
    t.closePath(),
    t.stroke(),
    t.fill(),
    t.fillStyle = "#000",
    t.fillText(this.label, this.width / 2 - this.labelWidth / 2, 14);
    var a = "长度: " + this.contents.length || 0;
    if (t.fillText(a, this.width / 2 - t.measureText(a).width / 2, this.height - 8),
    0 === this.contents.length) {
      var r = "(empty)";
      t.fillText(r, this.width / 2 - t.measureText(r).width / 2, this.height / 2)
    }
    var n = this.start || 0
      , c = Math.min(this.contents.length, n + this.maxCell);
    for (s = n; s < c; s++) {
      var o = this.contents[s]
        , g = this.width - 2 * this.cellGap
        , f = this.cellHeight
        , b = this.cellGap
        , M = this.cellGap + (s - n) * f;
      if (M + f > this.height)
        break;
      t.save(),
      t.translate(b, M),
      t.strokeStyle = "#fff",
      t.fillStyle = this.color,
      t.lineWidth = 2,
      t.beginPath(),
      t.arc(5, 5, 4, Math.PI, 3 * Math.PI / 2, !1),
      t.arc(g - 4 - 1, 5, 4, 3 * Math.PI / 2, 0, !1),
      t.arc(g - 4 - 1, f - 4 - 1, 4, 0, Math.PI / 2, !1),
      t.arc(5, f - 4 - 1, 4, Math.PI / 2, Math.PI, !1),
      t.closePath(),
      t.stroke(),
      t.fill(),
      t.fillStyle = "#fff",
      t.textAlign = "center",
      t.fillText(o, g / 2, f - 4),
      t.fillStyle = "#333",
      t.fillText(s + 1, -10, f - 4),
      t.restore()
    }
    if (this.contents.length > this.maxCell) {
      var P = this.scrollbarWidth
        , m = l - 2 * this.cellGap
        , d = Math.max(m * (1 - (this.contents.length - this.maxCell) / this.contents.length), 10);
      this.scrollbarY + d > this.height - this.cellGap && (this.scrollbarY = this.height - this.cellGap - d),
      t.save(),
      t.translate(e - P - this.scrollbarMarginRight, this.cellGap),
      t.strokeStyle = "rgb(203, 205, 207)",
      t.fillStyle = "rgb(203, 205, 207)",
      t.lineWidth = 2,
      t.beginPath(),
      t.arc(5, 5, 4, Math.PI, 3 * Math.PI / 2, !1),
      t.arc(P - 4 - 1, 5, 4, 3 * Math.PI / 2, 0, !1),
      t.arc(P - 4 - 1, m - 4 - 1, 4, 0, Math.PI / 2, !1),
      t.arc(5, m - 4 - 1, 4, Math.PI / 2, Math.PI, !1),
      t.stroke(),
      t.fill(),
      t.restore(),
      t.save(),
      t.translate(e - P - this.scrollbarMarginRight, this.scrollbarY),
      t.strokeStyle = "rgb(66, 68, 71)",
      t.fillStyle = "rgb(66, 68, 71)",
      t.lineWidth = 2,
      t.beginPath(),
      t.arc(5, 5, 4, Math.PI, 3 * Math.PI / 2, !1),
      t.arc(P - 4 - 1, 5, 4, 3 * Math.PI / 2, 0, !1),
      t.arc(P - 4 - 1, d - 4 - 1, 4, 0, Math.PI / 2, !1),
      t.arc(5, d - 4 - 1, 4, Math.PI / 2, Math.PI, !1),
      t.closePath(),
      t.stroke(),
      t.fill(),
      t.restore()
    }
    t.restore()
  }
}
;
