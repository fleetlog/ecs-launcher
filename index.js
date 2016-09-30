AWS = require("aws-sdk");

exports.handler = function(event, context, callback) {
	AWS.config.update(event.aws_config);
	var ecs = new AWS.ECS();
	ecs.runTask(event.task_config, callback);
};