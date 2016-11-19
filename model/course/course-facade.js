const Model = require('../../lib/facade');
const courseSchema  = require('./course-schema');

class CourseModel extends Model {}

module.exports = new CourseModel(courseSchema);
