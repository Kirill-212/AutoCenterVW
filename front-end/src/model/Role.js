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
 * The Role model module.
 * @module model/Role
 * @version v1
 */
export class Role {
  /**
   * Constructs a new <code>Role</code>.
   * @alias module:model/Role
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>Role</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Role} obj Optional instance to populate.
   * @return {module:model/Role} The populated <code>Role</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Role();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('roleName'))
        obj.roleName = ApiClient.convertToType(data['roleName'], 'String');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
Role.prototype.id = undefined;

/**
 * @member {String} roleName
 */
Role.prototype.roleName = undefined;

