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
 * The PutValueCarEquipmentDto model module.
 * @module model/PutValueCarEquipmentDto
 * @version v1
 */
export class PutValueCarEquipmentDto {
  /**
   * Constructs a new <code>PutValueCarEquipmentDto</code>.
   * @alias module:model/PutValueCarEquipmentDto
   * @class
   * @param value {String} 
   * @param isDeleted {Boolean} 
   * @param cost {Number} 
   */
  constructor(value, isDeleted, cost) {
    this.value = value;
    this.isDeleted = isDeleted;
    this.cost = cost;
  }

  /**
   * Constructs a <code>PutValueCarEquipmentDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PutValueCarEquipmentDto} obj Optional instance to populate.
   * @return {module:model/PutValueCarEquipmentDto} The populated <code>PutValueCarEquipmentDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PutValueCarEquipmentDto();
      if (data.hasOwnProperty('value'))
        obj.value = ApiClient.convertToType(data['value'], 'String');
      if (data.hasOwnProperty('isDeleted'))
        obj.isDeleted = ApiClient.convertToType(data['isDeleted'], 'Boolean');
      if (data.hasOwnProperty('cost'))
        obj.cost = ApiClient.convertToType(data['cost'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {String} value
 */
PutValueCarEquipmentDto.prototype.value = undefined;

/**
 * @member {Boolean} isDeleted
 */
PutValueCarEquipmentDto.prototype.isDeleted = undefined;

/**
 * @member {Number} cost
 */
PutValueCarEquipmentDto.prototype.cost = undefined;

