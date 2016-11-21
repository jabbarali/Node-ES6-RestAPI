var mongoose = require('mongoose');

module.exports = function (app) {
	'use strict';

	var conf = {
		PORT: process.env.PORT || 5000,
		MONGO_DB: 'mongodb://user1:abc_123@ds013545.mlab.com:13545/simply5'
	};

	app.set('config', conf);

	mongoose.connect(conf.MONGO_DB, {
		server: {
			auto_reconnect: true
		}
	});
};

