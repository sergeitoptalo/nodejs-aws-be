export class ResponseBuilder {
  static success() {
    return { ...this.addHeaders(), statusCode: 200 };
  }

  static addHeaders() {
    return {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };
  }

  static serverError() {
    return { ...this.addHeaders(), statusCode: 500 };
  }

  static clientError() {
    return { ...this.addHeaders(), statusCode: 400 };
  }
}
