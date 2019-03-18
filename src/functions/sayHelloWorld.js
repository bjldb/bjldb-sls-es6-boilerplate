import { HelloWorldProcessor } from '../processors/helloWorld/helloWorldProcessor';

export async function handleRequest(event, context) {
  const result = await new HelloWorldProcessor().handleRequest(event);
  return result;
}
