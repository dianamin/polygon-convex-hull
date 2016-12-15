Polymer({
  is: 'convex-hull-edge',

  properties: {
    line: {
      type: Object,
    },

    source: {
      type: Object,
    },

    target: {
      type: Object,
    },

    _namespace: {
      type: String,
      value: 'http://www.w3.org/2000/svg',
    },
  },

  build: function(svg, source, target) {
    this.source = source;
    this.target = target;
    this.line = document.createElementNS(this._namespace, 'line');
    d3.select(this.line).attr('x1', source.cx);
    d3.select(this.line).attr('y1', source.cy);
    d3.select(this.line).attr('x2', target.cx);
    d3.select(this.line).attr('y2', target.cy);
    d3.select(this.line).attr('stroke-width', 0);
    this.line.classList.add('convex-hull-edge');
    this.line.classList.add('line');
    svg.append(this.line);
    d3.select(this.line).transition().duration(300).attr("stroke-width", 1);
  },

  makeSpecial:function() {
    this.line.classList.add('special');
  }
});