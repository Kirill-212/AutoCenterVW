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
import {Employee} from './Employee';
import {Role} from './Role';
import {Status} from './Status';

/**
 * The User model module.
 * @module model/User
 * @version v1
 */
export class User {
  /**
   * Constructs a new <code>User</code>.
   * @alias module:model/User
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>User</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/User} obj Optional instance to populate.
   * @return {module:model/User} The populated <code>User</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new User();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('urlPhoto'))
        obj.urlPhoto = ApiClient.convertToType(data['urlPhoto'], 'String');
      if (data.hasOwnProperty('firstName'))
        obj.firstName = ApiClient.convertToType(data['firstName'], 'String');
      if (data.hasOwnProperty('lastName'))
        obj.lastName = ApiClient.convertToType(data['lastName'], 'String');
      if (data.hasOwnProperty('surname'))
        obj.surname = ApiClient.convertToType(data['surname'], 'String');
      if (data.hasOwnProperty('dBay'))
        obj.dBay = ApiClient.convertToType(data['dBay'], 'Date');
      if (data.hasOwnProperty('status'))
        obj.status = Status.constructFromObject(data['status']);
      if (data.hasOwnProperty('password'))
        obj.password = ApiClient.convertToType(data['password'], 'String');
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('phoneNumber'))
        obj.phoneNumber = ApiClient.convertToType(data['phoneNumber'], 'String');
      if (data.hasOwnProperty('roleId'))
        obj.roleId = ApiClient.convertToType(data['roleId'], 'Number');
      if (data.hasOwnProperty('employee'))
        obj.employee = Employee.constructFromObject(data['employee']);
      if (data.hasOwnProperty('role'))
        obj.role = Role.constructFromObject(data['role']);
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
User.prototype.id = undefined;

/**
 * @member {String} urlPhoto
 */
User.prototype.urlPhoto = undefined;

/**
 * @member {String} firstName
 */
User.prototype.firstName = undefined;

/**
 * @member {String} lastName
 */
User.prototype.lastName = undefined;

/**
 * @member {String} surname
 */
User.prototype.surname = undefined;

/**
 * @member {Date} dBay
 */
User.prototype.dBay = undefined;

/**
 * @member {module:model/Status} status
 */
User.prototype.status = undefined;

/**
 * @member {String} password
 */
User.prototype.password = undefined;

/**
 * @member {String} email
 */
User.prototype.email = undefined;

/**
 * @member {String} phoneNumber
 */
User.prototype.phoneNumber = undefined;

/**
 * @member {Number} roleId
 */
User.prototype.roleId = undefined;

/**
 * @member {module:model/Employee} employee
 */
User.prototype.employee = undefined;

/**
 * @member {module:model/Role} role
 */
User.prototype.role = undefined;

