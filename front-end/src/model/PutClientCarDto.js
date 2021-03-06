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
import { PutCarDto } from "./PutCarDto";

/**
 * The PutClientCarDto model module.
 * @module model/PutClientCarDto
 * @version v1
 */
export class PutClientCarDto {
  /**
   * Constructs a new <code>PutClientCarDto</code>.
   * @alias module:model/PutClientCarDto
   * @class
   * @param putCarDto {module:model/PutCarDto} 
   * @param email {String} 
   * @param changeRegisterNumber {Boolean} 
   */
  constructor(
    newEmail,
    registerNumber,
    newRegisterNumber,
    putCarDto,
    email,
    changeRegisterNumber
  ) {
    this.putCarDto = putCarDto;
    this.email = email;
    this.changeRegisterNumber = changeRegisterNumber;
    this.newEmail = newEmail;
    this.registerNumber = registerNumber;
    this.newRegisterNumber = newRegisterNumber;
  }

  /**
   * Constructs a <code>PutClientCarDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PutClientCarDto} obj Optional instance to populate.
   * @return {module:model/PutClientCarDto} The populated <code>PutClientCarDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PutClientCarDto();
      if (data.hasOwnProperty("putCarDto"))
        obj.putCarDto = PutCarDto.constructFromObject(data["putCarDto"]);
      if (data.hasOwnProperty("email"))
        obj.email = ApiClient.convertToType(data["email"], "String");
      if (data.hasOwnProperty("newEmail"))
        obj.newEmail = ApiClient.convertToType(data["newEmail"], "String");
      if (data.hasOwnProperty("registerNumber"))
        obj.registerNumber = ApiClient.convertToType(
          data["registerNumber"],
          "String"
        );
      if (data.hasOwnProperty("newRegisterNumber"))
        obj.newRegisterNumber = ApiClient.convertToType(
          data["newRegisterNumber"],
          "String"
        );
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
 * @member {module:model/PutCarDto} putCarDto
 */
PutClientCarDto.prototype.putCarDto = undefined;

/**
 * @member {String} email
 */
PutClientCarDto.prototype.email = undefined;

/**
 * @member {String} newEmail
 */
PutClientCarDto.prototype.newEmail = undefined;

/**
 * @member {String} registerNumber
 */
PutClientCarDto.prototype.registerNumber = undefined;

/**
 * @member {String} newRegisterNumber
 */
PutClientCarDto.prototype.newRegisterNumber = undefined;

/**
 * @member {Boolean} changeRegisterNumber
 */
PutClientCarDto.prototype.changeRegisterNumber = undefined;
