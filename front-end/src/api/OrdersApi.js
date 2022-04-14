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
import { Order } from "../model/Order";
import { PostOrderDto } from "../model/PostOrderDto";
import { UpdateStateOrderDto } from "../model/UpdateStateOrderDto";
import { GetOrderBuyerDto } from "../model/GetOrderBuyerDto";
/**
* Orders service.
* @module api/OrdersApi
* @version v1
*/
export class OrdersApi {
  /**
    * Constructs a new OrdersApi. 
    * @alias module:api/OrdersApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }
  apiOrdersConfirmUserPut(jwt, opts, callback) {
    opts = opts || {};
    let postBody = opts["body"];

    let pathParams = {};
    let queryParams = {
      email: opts["email"]
    };
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = ["application/json", "text/json", "application/_*+json"];
    let accepts = [];
    let returnType = null;

    return this.apiClient.callApi(
      "/api/orders/confirm/user",
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
  apiOrdersCancelUserPut(jwt, opts, callback) {
    opts = opts || {};
    let postBody = opts["body"];

    let pathParams = {};
    let queryParams = {
      email: opts["email"]
    };
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = ["application/json", "text/json", "application/_*+json"];
    let accepts = [];
    let returnType = null;

    return this.apiClient.callApi(
      "/api/orders/cancel/user",
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
     * Callback function to receive the result of the apiOrdersBuyerGet operation.
     * @callback moduleapi/OrdersApi~apiOrdersBuyerGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Order>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.email 
     * @param {module:api/OrdersApi~apiOrdersBuyerGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
  apiOrdersBuyerGet(jwt, opts, callback) {
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
    let returnType = [GetOrderBuyerDto];

    return this.apiClient.callApi(
      "/api/orders/buyer",
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
     * Callback function to receive the result of the apiOrdersCancelPut operation.
     * @callback moduleapi/OrdersApi~apiOrdersCancelPutCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {module:model/UpdateStateOrderDto} opts.body 
     * @param {module:api/OrdersApi~apiOrdersCancelPutCallback} callback The callback function, accepting three arguments: error, data, response
     */
  apiOrdersCancelPut(jwt, opts, callback) {
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
      "/api/orders/cancel",
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
     * Callback function to receive the result of the apiOrdersConfirmPut operation.
     * @callback moduleapi/OrdersApi~apiOrdersConfirmPutCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {module:model/UpdateStateOrderDto} opts.body 
     * @param {module:api/OrdersApi~apiOrdersConfirmPutCallback} callback The callback function, accepting three arguments: error, data, response
     */
  apiOrdersConfirmPut(jwt, opts, callback) {
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
      "/api/orders/confirm",
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
     * Callback function to receive the result of the apiOrdersEmployeeGet operation.
     * @callback moduleapi/OrdersApi~apiOrdersEmployeeGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Order>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {module:api/OrdersApi~apiOrdersEmployeeGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
  apiOrdersEmployeeGet(jwt, callback) {
    let postBody = null;

    let pathParams = {};
    let queryParams = {};
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["text/plain", "application/json", "text/json"];
    let returnType = [Order];

    return this.apiClient.callApi(
      "/api/orders/employee",
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
     * Callback function to receive the result of the apiOrdersPaidPut operation.
     * @callback moduleapi/OrdersApi~apiOrdersPaidPutCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {module:model/UpdateStateOrderDto} opts.body 
     * @param {module:api/OrdersApi~apiOrdersPaidPutCallback} callback The callback function, accepting three arguments: error, data, response
     */
  apiOrdersPaidPut(jwt, opts, callback) {
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
      "/api/orders/paid",
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
     * Callback function to receive the result of the apiOrdersPost operation.
     * @callback moduleapi/OrdersApi~apiOrdersPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {module:model/PostOrderDto} opts.body 
     * @param {module:api/OrdersApi~apiOrdersPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
  apiOrdersPost(jwt, opts, callback) {
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
      "/api/orders",
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
     * Callback function to receive the result of the apiOrdersUserGet operation.
     * @callback moduleapi/OrdersApi~apiOrdersUserGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Order>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.email 
     * @param {module:api/OrdersApi~apiOrdersUserGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
  apiOrdersUserGet(jwt, opts, callback) {
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
    let returnType = [Order];

    return this.apiClient.callApi(
      "/api/orders/user",
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
