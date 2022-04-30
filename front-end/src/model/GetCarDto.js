/*
 * BackEndAutoCenterVw
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.34
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from '../ApiClient';
import {Car} from './Car';
import {User} from './User';

/**
 * The GetCarDto model module.
 * @module model/GetCarDto
 * @version v1
 */
export class GetCarDto {
  /**
   * Constructs a new <code>GetCarDto</code>.
   * @alias module:model/GetCarDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>GetCarDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetCarDto} obj Optional instance to populate.
   * @return {module:model/GetCarDto} The populated <code>GetCarDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new GetCarDto();
      if (data.hasOwnProperty('car'))
        obj.car = Car.constructFromObject(data['car']);
      if (data.hasOwnProperty('totalCost'))
        obj.totalCost = ApiClient.convertToType(data['totalCost'], 'Number');
      if (data.hasOwnProperty('user'))
        obj.user = User.constructFromObject(data['user']);
    }
    return obj;
  }
}

/**
 * @member {module:model/Car} car
 */
GetCarDto.prototype.car = undefined;

/**
 * @member {Number} totalCost
 */
GetCarDto.prototype.totalCost = undefined;

/**
 * @member {module:model/User} user
 */
GetCarDto.prototype.user = undefined;

