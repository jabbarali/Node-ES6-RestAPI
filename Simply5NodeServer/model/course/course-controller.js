const Controller = require('../../lib/controller');
const courseFacade  = require('./course-facade');

class CourseController extends Controller {}

module.exports = new CourseController(courseFacade);
