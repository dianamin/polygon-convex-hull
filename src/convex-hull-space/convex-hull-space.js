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
      this._convexHull();
    })

  },

  _svgOnTap: function(event) {
    console.log(this);
    if (event.target == this.$.svg) {
      this._addPoint(event.clientX, event.clientY);
    }
  },

  _convexHull: function() {
    this.points.sort(function(a, b) {
      if (a.cy == b.cy) return a.cx < b.cx;
      return a.cy > b.cy;
    });
    this.points.forEach((point) => {
      console.log(point.cx + " " + point.cy);
    })
    var stack = [0, 1];
    var top = 1;
    var length = this.points.length;

    this.points[0].inConvexHull = false;
    this.points[1].inConvexHull = true;


    var step = 1;
    for (var i = 2; i >= 0; i += step) {
      if (i == length - 1) step = -1;
      if (!this.points[i].inConvexHull) {
        while(stack.length >= 1 && this.points[i].getPosition(this.points[stack[top - 1]], this.points[stack[top]])) {
          this.points[stack[top]].inConvexHull = false;
          stack.pop();
          top--;
        }
        stack.push(i);
        this.points[i].inConvexHull = true;
        top++;
      }
    }

    console.log(stack);

    for (var i = 1; i < stack.length; i++) {
      this._addEdge(this.points[stack[i]], this.points[stack[i - 1]], true);
    }

  }
/*
 
void rezolva() {
    int nr = 2;
    stiva[1] = 1; pus[1] = false;
    stiva[2] = 2; pus[2] = true;
    int pas = 1;
    for (int i = 3; i > 0; i += pas) {
        if (i == n) pas = -1;
        if (!pus[i]) {
            while (nr >= 2 && semn(punct[stiva[nr - 1]], punct[stiva[nr]], punct[i])) pus[stiva[nr--]] = false;
            stiva[++nr] = i;
            pus[i] = true;
        }
    }
    nr--;
    g << nr << '\n';
    for (int i = 1; i <= nr; i++) {
        g << fixed << setprecision(6) << punct[stiva[i]].x << ' ' << punct[stiva[i]].y << '\n';
    }
}*/
 
 

});