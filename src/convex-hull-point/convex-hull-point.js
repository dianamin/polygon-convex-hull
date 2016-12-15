Polymer({
  is: 'convex-hull-point',

  properties: {
    circle: {
      type: Object,
    },

    inConvexHull: {
      type: Boolean,
    },

    index: {
      type: Number,
    },

    cx: {
      type: Number,
    },

    cy: {
      type: Number,
    },

    _namespace: {
      type: String,
      value: 'http://www.w3.org/2000/svg',
    },
  },

  build: function(svg, cx, cy, index) {
    this.index = index;
    this.cx = cx;
    this.cy = cy;
    this.inConvexHull = false;
    this.circle = document.createElementNS(this._namespace, 'circle');
    d3.select(this.circle).attr('cx', cx);
    d3.select(this.circle).attr('cy', cy);
    d3.select(this.circle).attr('r', 0);
    this.circle.classList.add('convex-hull-point');
    this.circle.classList.add('circle');
    this.circle.addEventListener('click', () => {
        this.fire('click', index);
    });
    svg.append(this.circle);
    console.log(d3.select(this.circle).attr('r'));
    d3.select(this.circle).transition().duration(300).attr("r", 15);
  },

  getPosition: function(a, b) {
    var x = a.x * b.y + b.x * this.y + this.x * a.y - a.y * b.x - b.y * this.x - this.x * a.x;
    return x < 0;
  },

});