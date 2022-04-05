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
import {ApiClient} from '../ApiClient';

/**
 * The PutEmployeeDto model module.
 * @module model/PutEmployeeDto
 * @version v1
 */
export class PutEmployeeDto {
  /**
   * Constructs a new <code>PutEmployeeDto</code>.
   * @alias module:model/PutEmployeeDto
   * @class
   * @param address {String} 
   * @param email {String} 
   * @param roleName {String} 
   */
  constructor(address, email, roleName) {
    this.address = address;
    this.email = email;
    this.roleName = roleName;
  }

  /**
   * Constructs a <code>PutEmployeeDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PutEmployeeDto} obj Optional instance to populate.
   * @return {module:model/PutEmployeeDto} The populated <code>PutEmployeeDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PutEmployeeDto();
      if (data.hasOwnProperty('address'))
        obj.address = ApiClient.convertToType(data['address'], 'String');
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('roleName'))
        obj.roleName = ApiClient.convertToType(data['roleName'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} address
 */
PutEmployeeDto.prototype.address = undefined;

/**
 * @member {String} email
 */
PutEmployeeDto.prototype.email = undefined;

/**
 * @member {String} roleName
 */
PutEmployeeDto.prototype.roleName = undefined;

