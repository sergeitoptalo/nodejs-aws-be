export class ResponseBuilder {
  static addHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }

  static success() {
    return { ...this.addHeaders(), statusCode: 200 };
  }

  static serverError() {
    return { ...this.addHeaders(), statusCode: 500 };
  }

  static clientError() {
    return { ...this.addHeaders(), statusCode: 400 };
  }
}
