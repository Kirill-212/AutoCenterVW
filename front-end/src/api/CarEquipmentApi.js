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
import { CarEquipment } from "../model/CarEquipment";
import { CarEquipmentFormDto } from "../model/CarEquipmentFormDto";
import { PostCarEquipmentDto } from "../model/PostCarEquipmentDto";
import { PostCarEquipmentFormDto } from "../model/PostCarEquipmentFormDto";
import { PutCarEquipmentDto } from "../model/PutCarEquipmentDto";
import { PutCarEquipmentFormDto } from "../model/PutCarEquipmentFormDto";

/**
* CarEquipment service.
* @module api/CarEquipmentApi
* @version v1
*/
export class CarEquipmentApi {
  /**
    * Constructs a new CarEquipmentApi. 
    * @alias module:api/CarEquipmentApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  /**
     * Callback function to receive the result of the apiCarequipmentsDelete operation.
     * @callback moduleapi/CarEquipmentApi~apiCarequipmentsDeleteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.name 
     * @param {module:api/CarEquipmentApi~apiCarequipmentsDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     */
  apiCarequipmentsNameGet(jwt, opts, callback) {
    opts = opts || {};
    let postBody = null;

    let pathParams = {};
    let queryParams = {
      name: opts["name"]
    };
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["text/plain", "application/json", "text/json"];
    let returnType = CarEquipmentFormDto;

    return this.apiClient.callApi(
      "/api/carequipments/name",
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

  apiCarequipmentsDelete(jwt, opts, callback) {
    opts = opts || {};
    let postBody = null;

    let pathParams = {};
    let queryParams = {
      name: opts["name"]
    };
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = [];
    let returnType = null;

    return this.apiClient.callApi(
      "/api/carequipments",
      "DELETE",
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
     * Callback function to receive the result of the apiCarequipmentsEquipmentDelete operation.
     * @callback moduleapi/CarEquipmentApi~apiCarequipmentsEquipmentDeleteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.name 
     * @param {module:api/CarEquipmentApi~apiCarequipmentsEquipmentDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     */
  apiCarequipmentsEquipmentDelete(jwt, opts, callback) {
    opts = opts || {};
    let postBody = null;

    let pathParams = {};
    let queryParams = {
      name: opts["name"]
    };
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = [];
    let returnType = null;

    return this.apiClient.callApi(
      "/api/carequipments/equipment",
      "DELETE",
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
     * Callback function to receive the result of the apiCarequipmentsEquipmentGet operation.
     * @callback moduleapi/CarEquipmentApi~apiCarequipmentsEquipmentGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/CarEquipment>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {module:api/CarEquipmentApi~apiCarequipmentsEquipmentGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
  apiCarequipmentsEquipmentGet(jwt, callback) {
    let postBody = null;

    let pathParams = {};
    let queryParams = {};
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["text/plain", "application/json", "text/json"];
    let returnType = [CarEquipment];

    return this.apiClient.callApi(
      "/api/carequipments/equipment",
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

  apiCarequipmentsEquipmentIdDetailGet(jwt, id, callback) {
    let postBody = null;
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error(
        "Missing the required parameter 'id' when calling apiCarequipmentsEquipmentIdDetailGet"
      );
    }

    let pathParams = {
      id: id
    };
    let queryParams = {};
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["text/plain", "application/json", "text/json"];
    let returnType = CarEquipment;

    return this.apiClient.callApi(
      "/api/carequipments/equipment/{id}/detail",
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
     * Callback function to receive the result of the apiCarequipmentsEquipmentIdGet operation.
     * @callback moduleapi/CarEquipmentApi~apiCarequipmentsEquipmentIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CarEquipment{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {String} id 
     * @param {module:api/CarEquipmentApi~apiCarequipmentsEquipmentIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
  apiCarequipmentsEquipmentIdGet(jwt, id, callback) {
    let postBody = null;
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error(
        "Missing the required parameter 'id' when calling apiCarequipmentsEquipmentIdGet"
      );
    }

    let pathParams = {
      id: id
    };
    let queryParams = {};
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["text/plain", "application/json", "text/json"];
    let returnType = CarEquipment;

    return this.apiClient.callApi(
      "/api/carequipments/equipment/{id}",
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
     * Callback function to receive the result of the apiCarequipmentsEquipmentNameGet operation.
     * @callback moduleapi/CarEquipmentApi~apiCarequipmentsEquipmentNameGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CarEquipment{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.name 
     * @param {module:api/CarEquipmentApi~apiCarequipmentsEquipmentNameGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
  apiCarequipmentsEquipmentNameGet(opts, callback) {
    opts = opts || {};
    let postBody = null;

    let pathParams = {};
    let queryParams = {
      name: opts["name"]
    };
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["text/plain", "application/json", "text/json"];
    let returnType = CarEquipment;

    return this.apiClient.callApi(
      "/api/carequipments/equipment/name",
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
     * Callback function to receive the result of the apiCarequipmentsEquipmentPost operation.
     * @callback moduleapi/CarEquipmentApi~apiCarequipmentsEquipmentPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {module:model/PostCarEquipmentDto} opts.body 
     * @param {module:api/CarEquipmentApi~apiCarequipmentsEquipmentPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
  apiCarequipmentsEquipmentPost(jwt, opts, callback) {
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
      "/api/carequipments/equipment",
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
     * Callback function to receive the result of the apiCarequipmentsEquipmentPut operation.
     * @callback moduleapi/CarEquipmentApi~apiCarequipmentsEquipmentPutCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {module:model/PutCarEquipmentDto} opts.body 
     * @param {module:api/CarEquipmentApi~apiCarequipmentsEquipmentPutCallback} callback The callback function, accepting three arguments: error, data, response
     */
  apiCarequipmentsEquipmentPut(opts, callback) {
    opts = opts || {};
    let postBody = opts["body"];

    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = ["application/json", "text/json", "application/_*+json"];
    let accepts = [];
    let returnType = null;

    return this.apiClient.callApi(
      "/api/carequipments/equipment",
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
     * Callback function to receive the result of the apiCarequipmentsFormGet operation.
     * @callback moduleapi/CarEquipmentApi~apiCarequipmentsFormGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/CarEquipmentFormDto>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {module:api/CarEquipmentApi~apiCarequipmentsFormGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
  apiCarequipmentsFormGet(jwt, callback) {
    let postBody = null;

    let pathParams = {};
    let queryParams = {};
    let headerParams = jwt;
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["text/plain", "application/json", "text/json"];
    let returnType = [CarEquipmentFormDto];

    return this.apiClient.callApi(
      "/api/carequipments/form",
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
     * Callback function to receive the result of the apiCarequipmentsIdGet operation.
     * @callback moduleapi/CarEquipmentApi~apiCarequipmentsIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CarEquipmentFormDto{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {String} id 
     * @param {module:api/CarEquipmentApi~apiCarequipmentsIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
  apiCarequipmentsIdGet(id, callback) {
    let postBody = null;
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error(
        "Missing the required parameter 'id' when calling apiCarequipmentsIdGet"
      );
    }

    let pathParams = {
      id: id
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["text/plain", "application/json", "text/json"];
    let returnType = CarEquipmentFormDto;

    return this.apiClient.callApi(
      "/api/carequipments/{id}",
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
     * Callback function to receive the result of the apiCarequipmentsPost operation.
     * @callback moduleapi/CarEquipmentApi~apiCarequipmentsPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {module:model/PostCarEquipmentFormDto} opts.body 
     * @param {module:api/CarEquipmentApi~apiCarequipmentsPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
  apiCarequipmentsPost(jwt, opts, callback) {
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
      "/api/carequipments",
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
     * Callback function to receive the result of the apiCarequipmentsPut operation.
     * @callback moduleapi/CarEquipmentApi~apiCarequipmentsPutCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

  /**
     * @param {Object} opts Optional parameters
     * @param {module:model/PutCarEquipmentFormDto} opts.body 
     * @param {module:api/CarEquipmentApi~apiCarequipmentsPutCallback} callback The callback function, accepting three arguments: error, data, response
     */
  apiCarequipmentsPut(jwt, opts, callback) {
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
      "/api/carequipments",
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
}
