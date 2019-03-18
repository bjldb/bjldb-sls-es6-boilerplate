export default class BaseProcessor {
  constructor() {
    this.DEFAULT_SUCCESS_STATUS = 200;
    this.DEFAULT_ERROR_STATUS = 500;
  }

  async handleRequest(event, context) {
    try {
      console.log(context);
      console.log('PROCESSING EVENT', event.httpMethod, event.resource);
      const result = await this.processEvent(event);
      return this.sendProxySuccess(result);
    } catch (err) {
      return this.sendProxyError(err);
    }
  }

  async processEvent(event) {
    return this.sendProxySuccess({
      event,
      message: 'default handler result',
    });
  }

  sendProxySuccess(resultBody) {
    const response = resultBody && resultBody.statusCode ? resultBody : {
      statusCode: resultBody.statusCode || this.DEFAULT_SUCCESS_STATUS,
      body: JSON.stringify(resultBody),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    return response;
  }

  sendProxyError(errorBody) {
    console.log('ERROR:', errorBody.stack || errorBody);
    let status = errorBody.statusCode || this.DEFAULT_ERROR_STATUS;
    let message = errorBody.message || JSON.stringify(errorBody);
    const m = errorBody.message && errorBody.message.match(/^\[(\d+)\] *(.*)$/);
    if (m) {
      [, status, message] = m;
    }
    const response = {
      statusCode: status,
      body: JSON.stringify({ errorMessage: message }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    return response;
  }
}
