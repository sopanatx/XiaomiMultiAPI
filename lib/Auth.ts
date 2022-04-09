import fetch from "node-fetch";
const cookie = require("cookie");
const crypto = require("crypto");

export default class MiIOAuth {
  #loginUrl = "https://account.xiaomi.com/pass/serviceLoginAuth2";

  /**
   * @param {string} password
   * @return {string}
   */
  #getPasswordHash(password: string) {
    return crypto
      .createHash("md5")
      .update(password)
      .digest("hex")
      .toUpperCase();
  }

  async login(login: string, password: string) {
    let data = new URLSearchParams();
    data.append("sid", "xiaomiio");
    data.append("hash", this.#getPasswordHash(password));
    data.append("user", login);
    data.append("_json", "true");

    let response = await fetch(this.#loginUrl, {
      method: "POST",
      body: data,
    });

    let json = await this.#responseToJson(response);
    let { userId, ssecurity, location } = json;

    if (!ssecurity || !location) {
      throw new Error("Can`t login");
    }

    return {
      ssecurity,
      token: await this.#getServiceToken(location),
      userId,
    };
  }

  async #getServiceToken(location: any) {
    let response = await fetch(location);
    if (response.status !== 200) {
      throw new Error("Can`t get service token");
    }

    let cookies: any = {};
    response.headers.raw()["set-cookie"].forEach((item: any) => {
      cookies = { ...cookies, ...cookie.parse(item) };
    });

    let token = cookies["serviceToken"] || false;
    if (!token) {
      throw new Error("Can`t get service token from cookies");
    }

    return token;
  }

  async #responseToJson(response: any) {
    let body = await response.text();
    if (body.indexOf("&&&START&&&") === 0) {
      body = body.substring(11);
      return JSON.parse(body);
    }

    throw new Error("Can`t login");
  }

  async getSign() {
    const url =
      "https://account.xiaomi.com/pass/serviceLogin?sid=xiaomiio&_json=true";
    const response = await fetch(url);

    let json = await this.#responseToJson(response);
    if ("_sign" in json) {
      return json["_sign"];
    }

    throw new Error("Can`t get sign");
  }
}
