class Cache {
  private store: {
    [key: string]: {
      data: unknown;
      validFor: number;
      cachedIn: number;
    };
  } = {};

  public addService(serviceName: string): Cache {
    this.store[serviceName] = {
      data: null,
      validFor: 0,
      cachedIn: 0,
    };

    return this;
  }

  public set(key: string, value: unknown): void {
    this.store[key].data = value;
    this.store[key].cachedIn = new Date().getTime();
  }

  public get(key: string): unknown {
    return this.store[key].data;
  }

  public has(key: string): boolean {
    return !!this.store[key].data;
  }

  public expired(key: string): boolean {
    if (this.store[key].cachedIn) {
      const expirationTime =
        this.store[key].cachedIn + this.store[key].validFor;
      const currentTime = new Date().getTime();
      const expired = expirationTime - currentTime < 0;
      return expired;
    }
    return true;
  }

  public setExpiration(key: string, validFor: number) {
    this.store[key].validFor = validFor;
  }
}

export default new Cache();
