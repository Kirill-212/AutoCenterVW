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
 * The ImgDto model module.
 * @module model/ImgDto
 * @version v1
 */
export class ImgDto {
  /**
   * Constructs a new <code>ImgDto</code>.
   * @alias module:model/ImgDto
   * @class
   * @param url {String} 
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * Constructs a <code>ImgDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ImgDto} obj Optional instance to populate.
   * @return {module:model/ImgDto} The populated <code>ImgDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ImgDto();
      if (data.hasOwnProperty('url'))
        obj.url = ApiClient.convertToType(data['url'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} url
 */
ImgDto.prototype.url = undefined;

