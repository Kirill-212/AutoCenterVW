/*
 * BackEndAutoCenterVw
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.33
 *
 * Do not edit the class manually.
 *
 */
import { ApiClient } from "../ApiClient";

/**
 * The PostOrderDto model module.
 * @module model/PostOrderDto
 * @version v1
 */
export class PostOrderDto {
  /**
   * Constructs a new <code>PostOrderDto</code>.
   * @alias module:model/PostOrderDto
   * @class
   * @param emailBuyer {String} 
   * @param changeRegisterNumber {Boolean} 
   */
  constructor(emailOwner, emailBuyer, changeRegisterNumber,vin) {
    this.emailOwner = emailOwner;
    this.emailBuyer = emailBuyer;
    this.changeRegisterNumber = changeRegisterNumber;
    this.vin=vin;
  }

  /**
   * Constructs a <code>PostOrderDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PostOrderDto} obj Optional instance to populate.
   * @return {module:model/PostOrderDto} The populated <code>PostOrderDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PostOrderDto();
      if (data.hasOwnProperty("vin"))
        obj.vin = ApiClient.convertToType(data["vin"], "String");
      if (data.hasOwnProperty("emailOwner"))
        obj.emailOwner = ApiClient.convertToType(data["emailOwner"], "String");
      if (data.hasOwnProperty("emailBuyer"))
        obj.emailBuyer = ApiClient.convertToType(data["emailBuyer"], "String");
      if (data.hasOwnProperty("changeRegisterNumber"))
        obj.changeRegisterNumber = ApiClient.convertToType(
          data["changeRegisterNumber"],
          "Boolean"
        );
    }
    return obj;
  }
}

/**
 * @member {String} vin
 */
PostOrderDto.prototype.vin = undefined;

/**
 * @member {String} emailOwner
 */
PostOrderDto.prototype.emailOwner = undefined;

/**
 * @member {String} emailBuyer
 */
PostOrderDto.prototype.emailBuyer = undefined;

/**
 * @member {Boolean} changeRegisterNumber
 */
PostOrderDto.prototype.changeRegisterNumber = undefined;
