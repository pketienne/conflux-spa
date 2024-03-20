import { Table, StackContext } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
	const table = new Table(stack, "counter", {
  	fields: {
  	  counter: "string",
  	},
  	primaryIndex: { partitionKey: "counter" },
	});

  stack.addOutputs({});
}
