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

  _addEdge: function(source, target, special) {
    var newEdge = document.createElement('convex-hull-edge');
    newEdge.build(svg, source, target);
    if (special) newEdge.makeSpecial();
    this.append(newEdge);
    this.push('edges', newEdge);
  },

  _addPoint: function(x, y) {
  	var newPoint = document.createElement('convex-hull-point');
    this.append(newPoint);
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
      this._convexHull();
    })

  },

  _svgOnTap: function(event) {
    if (event.target == this.$.svg) {
      this._addPoint(event.clientX, event.clientY);
    }
  },

  _convexHull: function() {
    this.points.sort(function(a, b) {
      if (a.y == b.y) return a.x - b.x;
      return a.y - b.y;
    });
    var stack = [0, 1];
    var top = 1;
    var length = this.points.length;

    this.points[0].inConvexHull = false;
    this.points[1].inConvexHull = false;


    var step = 1;
    for (var i = 2; i >= 0; i += step) {
      if (i == length - 1) step = -1;
      if (!this.points[i].inConvexHull) {
        while(top >= 1 && this.points[i].getPosition(this.points[stack[top - 1]], this.points[stack[top]])) {
          this.points[stack[top]].inConvexHull = false;
          stack.pop();
          top--;
        }
        stack.push(i);
        this.points[i].inConvexHull = true;
        top++;
      }
    }

    this.points.forEach((point) => {
      if (point.inConvexHull === true)
        point.makeSpecial();
    });
    for (var i = 1; i < stack.length; i++) {
      this._addEdge(this.points[stack[i]], this.points[stack[i - 1]], true);
    }

  },

});