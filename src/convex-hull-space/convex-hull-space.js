Polymer({
  is: 'convex-hull-space',

  properties: {
    simulation: {
    	type: Object,
    },

    points: {
    	type: Array,
    },
  },

  create: function() {
    this.set('points', []);
  },

  ready: function() {
  	this.simulation = d3.forceSimulation();
  	this.$.svg.addEventListener('dblclick', (event) => {
  		this._addPoint(event.clientX, event.clientY);
  	});
  },

  _addPoint: function(x, y) {
  	var newPoint = document.createElement('convex-hull-point');
    this.append(newPoint);;
  	newPoint.build(this.$.svg, x, y, 0);
    //this.push('points', newPoint);
  },

});