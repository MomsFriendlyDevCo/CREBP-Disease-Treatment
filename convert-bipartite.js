var _ = require('lodash');
var data = require('./abc.json');

var bipartite = [];

var diseases = _.uniq(_.pluck(data, 'Diseases'));//uniq(array) produces a duplicate-free arrray, 
//.pluck(array, propertyname) extracts an array of the property's value. they are all from underscore.js
var diseaseWeight = {};
var interventions = _.uniq(_.pluck(data, 'Interventions'));
var interventionsWeight = {};

_.forEach(data, function(item) {
	var diseaseKey = item.Diseases + '-' + item.Intervention;
	if (!diseaseWeight[diseaseKey]) diseaseWeight[diseaseKey] = 0;
	diseaseWeight[diseaseKey]++;//count how many a-b relationships

	var interventionKey = item.Intervention + '-' + item.Diseases;
	if (!interventionsWeight[interventionKey]) interventionsWeight[interventionKey] = 0;
	interventionsWeight[interventionKey]++;//count how many b-a relationships
});

_.forEach(diseaseWeight, function(weight, dw) {//_.forEach (array, function(n, key) is from lodash.js
	var disease = dw.split('-')[0];
	var intervention = dw.split('-')[1];

	var interventionWeight = interventionsWeight[intervention + '-' + disease];

	if (!interventionWeight) return;

	bipartite.push([
		disease,
		intervention,
		weight,
		interventionWeight,
//push a-b relationships number and b-a relationships number together into the array
	]);

	if (weight != interventionsWeight[intervention + '-' + disease]) console.log('ALERT', disease, intervention, weight, interventionsWeight[intervention + '-' + disease]);
});

console.log(bipartite);
console.log(bipartite.length);
