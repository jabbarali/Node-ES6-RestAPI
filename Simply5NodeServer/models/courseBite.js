var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
	'use strict';

	var CourseBiteSchema = new Schema({
		username: String,
		text: String,
		createdAt: {type: Date, default: Date.now}
	});

	mongoose.model('CourseBite', CourseBiteSchema, 'CourseBite');
};
