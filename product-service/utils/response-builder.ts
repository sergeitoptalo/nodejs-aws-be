export class ResponseBuilder {
  static addHeaders() {
    return {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
  }

  static success(payload: unknown) {
    return {
      headers: this.addHeaders(),
      statusCode: 200,
      body: payload ? JSON.stringify(payload) : null,
    };
  }

  static serverError(payload: unknown) {
    return {
      headers: this.addHeaders(),
      statusCode: 500,
      body: payload ? JSON.stringify(payload) : null,
    };
  }

  static clientError(payload: unknown) {
    return {
      headers: this.addHeaders(),
      statusCode: 400,
      body: payload ? JSON.stringify(payload) : null,
    };
  }
}
