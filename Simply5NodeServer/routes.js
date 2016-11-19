const Router = require('express').Router;
const router = new Router();

const course  = require('./model/course/course-router');


router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to projects API!' });
});

router.use('/course', course);


module.exports = router;
