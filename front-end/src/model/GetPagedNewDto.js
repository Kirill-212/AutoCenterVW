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
import {GetNewDto} from './GetNewDto';

/**
 * The GetPagedNewDto model module.
 * @module model/GetPagedNewDto
 * @version v1
 */
export class GetPagedNewDto {
  /**
   * Constructs a new <code>GetPagedNewDto</code>.
   * @alias module:model/GetPagedNewDto
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>GetPagedNewDto</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetPagedNewDto} obj Optional instance to populate.
   * @return {module:model/GetPagedNewDto} The populated <code>GetPagedNewDto</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new GetPagedNewDto();
      if (data.hasOwnProperty('getNewDto'))
        obj.getNewDto = ApiClient.convertToType(data['getNewDto'], [GetNewDto]);
      if (data.hasOwnProperty('totalCount'))
        obj.totalCount = ApiClient.convertToType(data['totalCount'], 'Number');
      if (data.hasOwnProperty('pageSize'))
        obj.pageSize = ApiClient.convertToType(data['pageSize'], 'Number');
      if (data.hasOwnProperty('currentPage'))
        obj.currentPage = ApiClient.convertToType(data['currentPage'], 'Number');
      if (data.hasOwnProperty('totalPages'))
        obj.totalPages = ApiClient.convertToType(data['totalPages'], 'Number');
      if (data.hasOwnProperty('hasNext'))
        obj.hasNext = ApiClient.convertToType(data['hasNext'], 'Boolean');
      if (data.hasOwnProperty('hasPrevious'))
        obj.hasPrevious = ApiClient.convertToType(data['hasPrevious'], 'Boolean');
    }
    return obj;
  }
}

/**
 * @member {Array.<module:model/GetNewDto>} getNewDto
 */
GetPagedNewDto.prototype.getNewDto = undefined;

/**
 * @member {Number} totalCount
 */
GetPagedNewDto.prototype.totalCount = undefined;

/**
 * @member {Number} pageSize
 */
GetPagedNewDto.prototype.pageSize = undefined;

/**
 * @member {Number} currentPage
 */
GetPagedNewDto.prototype.currentPage = undefined;

/**
 * @member {Number} totalPages
 */
GetPagedNewDto.prototype.totalPages = undefined;

/**
 * @member {Boolean} hasNext
 */
GetPagedNewDto.prototype.hasNext = undefined;

/**
 * @member {Boolean} hasPrevious
 */
GetPagedNewDto.prototype.hasPrevious = undefined;

