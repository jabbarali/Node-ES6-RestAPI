var mongoose = require('mongoose');
var CourseBite = mongoose.model('CourseBite');
var Users = mongoose.model('Users');

var FCM = require('fcm-push');
var _ = require('lodash');

var serverKey = 'AIzaSyBEo-w8P_99NgUObe0_7LV2RB-ja2XuRE4';
var fcm = new FCM(serverKey);


module.exports = function (app) {
	'use strict';

	var router = app.get('router');

	router.get('/coursebite', function (req, res) {
        CourseBite.find().sort({createdAt: -1}).lean().exec(function (err, cb) {
			if (err) {
				return res.json({error: err});
			}

			res.json({error: null, courseBite: cb});
		});
	});

	router.get('/coursebite/:id', function (req, res) {
		var id = req.params.id;
        CourseBite.findById(id).lean().exec(function (err, cb) {
			if (err) {
				return res.json({error: err});
			}

			res.json({error: null, courseBite: cb});
		});
	});

	router.post('/coursebite', function (req, res) {
		var username = req.body.username;
		var text = req.body.text;

		var cb = new CourseBite({
			username: username,
			text: text
		});

        cb.save(function (err, cb) {
			process.nextTick(function () {
				sendPush(cb);
			});
			res.redirect('/add-coursebite');
		});
    });

    function sendPush(courseBite) {
        var text = courseBite.text.substr(0, 100);
        Users.find({ deviceRegistered: true }).lean().exec(function (err, users) {
            if (!err) {
                for (var i = 0; i < users.length; i++) {
                    var user = users[i];
                    
                    var message = {
                        to: 'registration_token_or_topics', // required fill with device token or topics
                        collapse_key: 'your_collapse_key', 
                        data: {
                            your_custom_data_key: 'your_custom_data_value'
                        },
                        notification: {
                            title: 'New Reading Material',
                            body: text
                        }
                    };
                    
                    fcm.send(message, function (err, response) {
                        if (err) {
                            console.log("Something has gone wrong!");
                        } else {
                            console.log("Successfully sent with response: ", response);
                        }
                    });
                }
            }
        });
    }
};