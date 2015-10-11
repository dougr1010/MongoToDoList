/**
 * Created by dougritzinger on 10/11/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toDoSchema = new Schema({
    priority: Number,
    task: String
});

var ToDo = mongoose.model('toDo',toDoSchema);

module.exports = ToDo;
