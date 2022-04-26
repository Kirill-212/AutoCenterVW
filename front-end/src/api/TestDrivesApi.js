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
import { TestDrive } from "../model/TestDrive";
import { TestDriveDto } from "../model/TestDriveDto";

/**
* TestDrives service.
* @module api/TestDrivesApi
* @version v1
*/
export class TestDrivesApi {
  /**
    * Constructs a new TestDrivesApi. 
    * @alias module:api/TestDrivesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }
  apiTestdrivesVinWithEmailGet(jwt, opts, callback) {
    opts = opts || {};
    let postBody = null;

    let pathParams = {};
    let queryParams = {
      vin: opts["vin"],
      date: opts["_date"]
    };
    let headerParams = jwt;

    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["text/plain", "application/json", "text/json"];
    let returnType = [TestDrive];

    return this.apiClient.callApi(
      "/api/testdrives/vin/with/email",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
     * Callback function to receive the result of the apiTestdrivesCancelPut operation.
     * @callback moduleapi/TestDrivesApi~apiTestdrivesCancelPutCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {module:model/TestDriveDto} opts.body 
     * @param {module:api/TestDrivesApi~apiTestdrivesCancelPutCallback} callback The callback function, accepting three arguments: error, data, response
     */
  apiTestdrivesCancelPut(jwt, opts, callback) {
    opts = opts || {};
    let postBody = opts["body"];

    let pathParams = {};
    let queryParams = {};
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = ["application/json", "text/json", "application/_*+json"];
    let accepts = [];
    let returnType = null;

    return this.apiClient.callApi(
      "/api/testdrives/cancel",
      "PUT",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
     * Callback function to receive the result of the apiTestdrivesConfirmPut operation.
     * @callback moduleapi/TestDrivesApi~apiTestdrivesConfirmPutCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {module:model/TestDriveDto} opts.body 
     * @param {module:api/TestDrivesApi~apiTestdrivesConfirmPutCallback} callback The callback function, accepting three arguments: error, data, response
     */

  apiTestdrivesCancelUserPut(jwt, opts, callback) {
    opts = opts || {};
    let postBody = opts["body"];

    let pathParams = {};
    let queryParams = {};
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = ["application/json", "text/json", "application/_*+json"];
    let accepts = [];
    let returnType = null;

    return this.apiClient.callApi(
      "/api/testdrives/cancel/user",
      "PUT",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  apiTestdrivesConfirmPut(jwt, opts, callback) {
    opts = opts || {};
    let postBody = opts["body"];

    let pathParams = {};
    let queryParams = {};
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = ["application/json", "text/json", "application/_*+json"];
    let accepts = [];
    let returnType = null;

    return this.apiClient.callApi(
      "/api/testdrives/confirm",
      "PUT",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
     * Callback function to receive the result of the apiTestdrivesEmployeeGet operation.
     * @callback moduleapi/TestDrivesApi~apiTestdrivesEmployeeGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/TestDrive>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {module:api/TestDrivesApi~apiTestdrivesEmployeeGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
  apiTestdrivesEmployeeGet(jwt, callback) {
    let postBody = null;

    let pathParams = {};
    let queryParams = {};
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["text/plain", "application/json", "text/json"];
    let returnType = [TestDrive];

    return this.apiClient.callApi(
      "/api/testdrives/employee",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
     * Callback function to receive the result of the apiTestdrivesPost operation.
     * @callback moduleapi/TestDrivesApi~apiTestdrivesPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {module:model/TestDriveDto} opts.body 
     * @param {module:api/TestDrivesApi~apiTestdrivesPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
  apiTestdrivesPost(jwt, opts, callback) {
    opts = opts || {};
    let postBody = opts["body"];

    let pathParams = {};
    let queryParams = {};
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = ["application/json", "text/json", "application/_*+json"];
    let accepts = [];
    let returnType = null;

    return this.apiClient.callApi(
      "/api/testdrives",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
     * Callback function to receive the result of the apiTestdrivesUserGet operation.
     * @callback moduleapi/TestDrivesApi~apiTestdrivesUserGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/TestDrive>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.email 
     * @param {module:api/TestDrivesApi~apiTestdrivesUserGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
  apiTestdrivesUserGet(jwt, opts, callback) {
    opts = opts || {};
    let postBody = null;

    let pathParams = {};
    let queryParams = {
      email: opts["email"]
    };
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["text/plain", "application/json", "text/json"];
    let returnType = [TestDrive];

    return this.apiClient.callApi(
      "/api/testdrives/user",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
}
