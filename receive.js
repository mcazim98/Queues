const { delay, ServiceBusClient, ServiceBusMessage } = require("@azure/service-bus");

// connection string to your Service Bus namespace
const connectionString = "Endpoint=sb://asc-dev.servicebus.windows.net/;SharedAccessKeyName=test1;SharedAccessKey=5OeFMNp0BcdlTq68ZIgFZ10HDQycpyIQ1+QKFSTXvbY=;EntityPath=mytest"

// name of the queue
const queueName = "mytest"

 async function main() {
	// create a Service Bus client using the connection string to the Service Bus namespace
	const sbClient = new ServiceBusClient(connectionString);

	// createReceiver() can also be used to create a receiver for a subscription.
	const receiver = sbClient.createReceiver(queueName);

	// function to handle messages
	const myMessageHandler = async (messageReceived) => {
		console.log(`Received message: ${messageReceived.body}`);
	};

	// function to handle any errors
	const myErrorHandler = async (error) => {
		console.log(error);
	};

	// subscribe and specify the message and error handlers
	receiver.subscribe({
		processMessage: myMessageHandler,
		processError: myErrorHandler
	});

	// Waiting long enough before closing the sender to send messages
	await delay(20000);

	await receiver.close();	
	await sbClient.close();
}    
// call the main function
main().catch((err) => {
	console.log("Error occurred: ", err);
	process.exit(1);
 });