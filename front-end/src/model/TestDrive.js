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
import {Car} from './Car';
import {StateTestDrive} from './StateTestDrive';
import {User} from './User';

/**
 * The TestDrive model module.
 * @module model/TestDrive
 * @version v1
 */
export class TestDrive {
  /**
   * Constructs a new <code>TestDrive</code>.
   * @alias module:model/TestDrive
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>TestDrive</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TestDrive} obj Optional instance to populate.
   * @return {module:model/TestDrive} The populated <code>TestDrive</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new TestDrive();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('dateStart'))
        obj.dateStart = ApiClient.convertToType(data['dateStart'], 'Date');
      if (data.hasOwnProperty('time'))
        obj.time = ApiClient.convertToType(data['time'], 'String');
      if (data.hasOwnProperty('stateTestDrive'))
        obj.stateTestDrive = StateTestDrive.constructFromObject(data['stateTestDrive']);
      if (data.hasOwnProperty('carId'))
        obj.carId = ApiClient.convertToType(data['carId'], 'Number');
      if (data.hasOwnProperty('car'))
        obj.car = Car.constructFromObject(data['car']);
      if (data.hasOwnProperty('userId'))
        obj.userId = ApiClient.convertToType(data['userId'], 'Number');
      if (data.hasOwnProperty('user'))
        obj.user = User.constructFromObject(data['user']);
      if (data.hasOwnProperty('isActive'))
        obj.isActive = ApiClient.convertToType(data['isActive'], 'Boolean');
    }
    return obj;
  }
}

/**
 * @member {Number} id
 */
TestDrive.prototype.id = undefined;

/**
 * @member {Date} dateStart
 */
TestDrive.prototype.dateStart = undefined;

/**
 * @member {String} time
 */
TestDrive.prototype.time = undefined;

/**
 * @member {module:model/StateTestDrive} stateTestDrive
 */
TestDrive.prototype.stateTestDrive = undefined;

/**
 * @member {Number} carId
 */
TestDrive.prototype.carId = undefined;

/**
 * @member {module:model/Car} car
 */
TestDrive.prototype.car = undefined;

/**
 * @member {Number} userId
 */
TestDrive.prototype.userId = undefined;

/**
 * @member {module:model/User} user
 */
TestDrive.prototype.user = undefined;

/**
 * @member {Boolean} isActive
 */
TestDrive.prototype.isActive = undefined;

