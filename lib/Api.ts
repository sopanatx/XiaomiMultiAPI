import fetch from "node-fetch";
const crypto = require("crypto");

export default class MiIOApi {
  #apiUrl = "https://api.io.mi.com/app";
  #allowCounty = ["", "ru", "us", "tw", "sg", "cn", "de", "in", "i2"];

  constructor(country = "") {
    this.#apiUrl = this.getApiUrl(country);
  }

  getApiUrl(country: string) {
    if (this.#allowCounty.includes(country) === false) {
      throw new Error("Country is not allow");
    }

    let countryDomain = country ? (country === "cn" ? "" : country + ".") : "";

    return `https://${countryDomain}api.io.mi.com/app`;
  }

  generateNonce = (security: any) => {
    let nonce = crypto.randomBytes(12);
    let value = Buffer.from(security, "base64");
    value = Buffer.concat([value, nonce]);

    return {
      nonce: nonce.toString("base64"),
      signedNonce: crypto.createHash("sha256").update(value).digest("base64"),
    };
  };

  /**
   * @param {string} uri
   * @param {string} signedNonce
   * @param {string} nonce
   * @param {{}} data
   * @return {string}
   */
  generateSignature(
    uri: string,
    signedNonce: string,
    nonce: string,
    data = {}
  ) {
    let signatureParams = [
      uri,
      signedNonce,
      nonce,
      `data=${JSON.stringify(data)}`,
    ];
    let signedString = signatureParams.join("&");

    return crypto
      .createHmac("sha256", Buffer.from(signedNonce, "base64"))
      .update(signedString)
      .digest("base64");
  }

  async getDeviceList(
    userId: number,
    security: any,
    token: string,
    country: string
  ) {
    let url = country === null ? this.#apiUrl : this.getApiUrl(country);

    let { nonce, signedNonce } = this.generateNonce(security);
    let data = { getVirtualModel: false, getHuamiDevices: 1 };

    let action = "/home/device_list";
    let signature = this.generateSignature(action, signedNonce, nonce, data);

    let body = new URLSearchParams();
    body.append("_nonce", nonce);
    body.append("signature", signature);
    body.append("data", JSON.stringify(data));

    let response = await fetch(url + action, {
      method: "POST",
      headers: {
        "x-xiaomi-protocal-flag-cli": "PROTOCAL-HTTP2",
        Cookie: `userId=${userId}; serviceToken=${token}`,
      },
      body: body,
    });

    let json: any = await response.json();
    console.log(json.result.list);
    return json.result.list;
  }

  async getHome(userId: number, security: any, token: string, country: string) {
    let url = country === null ? this.#apiUrl : this.getApiUrl(country);

    let { nonce, signedNonce } = this.generateNonce(security);
    let data = { getVirtualModel: false, getHuamiDevices: 1 };
    let action = "/homeroom/gethome";
    let signature = this.generateSignature(action, signedNonce, nonce, data);

    let body = new URLSearchParams();
    body.append("_nonce", nonce);
    body.append("signature", signature);
    body.append("data", JSON.stringify(data));

    let response = await fetch(url + action, {
      method: "POST",
      headers: {
        "x-xiaomi-protocal-flag-cli": "PROTOCAL-HTTP2",
        Cookie: `userId=${userId}; serviceToken=${token}`,
      },
      body: body,
    });

    let json: any = await response.json();
    return json.result;
  }

  async getRoom(userId: number, security: any, token: string, country: string) {
    let url = country === null ? this.#apiUrl : this.getApiUrl(country);

    let { nonce, signedNonce } = this.generateNonce(security);
    let data = { getVirtualModel: false, getHuamiDevices: 1 };
    let action = "/homeroom/getroom";
    let signature = this.generateSignature(action, signedNonce, nonce, data);

    let body = new URLSearchParams();
    body.append("_nonce", nonce);
    body.append("signature", signature);
    body.append("data", JSON.stringify(data));

    let response = await fetch(url + action, {
      method: "POST",
      headers: {
        "x-xiaomi-protocal-flag-cli": "PROTOCAL-HTTP2",
        Cookie: `userId=${userId}; serviceToken=${token}`,
      },
      body: body,
    });

    let json: any = await response.json();
    return json.result;
  }

  async getPluginUpdate(
    userId: number,
    security: any,
    token: string,
    country: string,
    model: string
  ) {
    let url = country === null ? this.#apiUrl : this.getApiUrl(country);

    let { nonce, signedNonce } = this.generateNonce(security);
    let data = {
      plugins: [{ model: model, package_id: 0, type: "mpk" }],
      api_level: 88,
      app_version: 62843,
      app_platform: "phone",
    };
    let action = "/plugin/update_plugin";
    let signature = this.generateSignature(action, signedNonce, nonce, data);

    let body = new URLSearchParams();
    body.append("_nonce", nonce);
    body.append("signature", signature);
    body.append("data", JSON.stringify(data));

    let response = await fetch(url + action, {
      method: "POST",
      headers: {
        "x-xiaomi-protocal-flag-cli": "PROTOCAL-HTTP2",
        Cookie: `userId=${userId}; serviceToken=${token}`,
      },
      body: body,
    });

    let json: any = await response.json();
    console.log({ json });
    return json.result;
  }
}
