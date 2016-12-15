Polymer({
  is: 'convex-hull-space',

  properties: {
    edges: {
      type: Array,
      value: [],
    },

    points: {
    	type: Array,
      value: [],
    },
  },

  create: function() {
    this.set('points', []);
    this.set('edges', []);
  },

  ready: function() {
  	this.listen(this.$.svg, 'click', '_svgOnTap');
  },

  _addEdge: function(source, target) {
    var newEdge = document.createElement('convex-hull-edge');
    newEdge.build(svg, source, target);
    this.append(newEdge);
    this.push('edges', newEdge);
  },

  _addPoint: function(x, y) {
  	var newPoint = document.createElement('convex-hull-point');
    this.append(newPoint);
    console.log(this.points);
    var index = this.points.length;
  	newPoint.build(this.$.svg, x, y, index);
    this.push('points', newPoint);
    if (index != 0) {
      this._addEdge(this.points[index - 1], this.points[index]);
    }

    newPoint.addEventListener('click', (event) => {
      if (event.detail != 0) return;
      var length = this.points.length;
      this._addEdge(this.points[length - 1], this.points[0]);

      this.unlisten(this.$.svg, 'click', '_svgOnTap');
    })

  },

  _svgOnTap: function(event) {
    console.log(this);
    if (event.target == this.$.svg) {
      this._addPoint(event.clientX, event.clientY);
    }
  },

});