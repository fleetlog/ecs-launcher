ecs-launcher
============

ECS-launcher is a very simple Lambda function which launches tasks on 
your ECS cluster. We're using it at Fleetlog to start one-off scheduled
tasks from CloudWatch events.

Usage
-----

You should upload the deployment package which can be downloaded from Releases
page to Lambda and create an IAM role, which allows access to ECS' RunTask
call to this function. A basic role, which allows the required actions, may look
like this:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "ecs:RunTask"
            ],
            "Resource": "*"
        }
    ]
}
```

Then you just need to invoke the function with correctly populated event
object. It's a JSON object with 2 fields: `aws_config` and `task_config`.
Both take the same options as their respective AWS Node SDK functions ([AWS config](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html), 
[Task config](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/ECS.html#runTask-property)).

For example, the event data could look like this:
```
{
    "aws_config": {
        "region": "ap-southeast-2"
    },
    "task_config": {
		"cluster": "default",
		"taskDefinition": "long-running-import-task:24",
		"overrides": {
			"containerOverrides": [
				{
					"name": "importer",
					"command": ["node", "import.js", "clean"]
				}
			]
		}
    }
}
```
