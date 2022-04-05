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
 * The ImgCar model module.
 * @module model/ImgCar
 * @version v1
 */
export class ImgCar {
  /**
   * Constructs a new <code>ImgCar</code>.
   * @alias module:model/ImgCar
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ImgCar</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ImgCar} obj Optional instance to populate.
   * @return {module:model/ImgCar} The populated <code>ImgCar</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ImgCar();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('url'))
        obj.url = ApiClient.convertToType(data['url'], 'String');
      if (data.hasOwnProperty('carId'))
        obj.carId = ApiClient.convertToType(data['carId'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
ImgCar.prototype.id = undefined;

/**
 * @member {String} url
 */
ImgCar.prototype.url = undefined;

/**
 * @member {Number} carId
 */
ImgCar.prototype.carId = undefined;

