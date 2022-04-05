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
import {ApiClient} from "../ApiClient";
import {GetNewDto} from '../model/GetNewDto';
import {PostNewDtoNewWrapperDto} from '../model/PostNewDtoNewWrapperDto';
import {PutNewDtoNewWrapperDto} from '../model/PutNewDtoNewWrapperDto';

/**
* New service.
* @module api/NewApi
* @version v1
*/
export class NewApi {

    /**
    * Constructs a new NewApi. 
    * @alias module:api/NewApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the apiNewsByTitleGet operation.
     * @callback moduleapi/NewApi~apiNewsByTitleGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetNewDto{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.title 
     * @param {module:api/NewApi~apiNewsByTitleGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiNewsByTitleGet(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        'title': opts['title']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = GetNewDto;

      return this.apiClient.callApi(
        '/api/news/by/title', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiNewsDelete operation.
     * @callback moduleapi/NewApi~apiNewsDeleteCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {String} opts.title 
     * @param {module:api/NewApi~apiNewsDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     */
    apiNewsDelete(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        'title': opts['title']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/api/news', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiNewsGet operation.
     * @callback moduleapi/NewApi~apiNewsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/GetNewDto>{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/NewApi~apiNewsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiNewsGet(callback) {
      
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = [GetNewDto];

      return this.apiClient.callApi(
        '/api/news', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiNewsIdGet operation.
     * @callback moduleapi/NewApi~apiNewsIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetNewDto{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Number} id 
     * @param {module:api/NewApi~apiNewsIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    apiNewsIdGet(id, callback) {
      
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling apiNewsIdGet");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json', 'text/json'];
      let returnType = GetNewDto;

      return this.apiClient.callApi(
        '/api/news/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiNewsPost operation.
     * @callback moduleapi/NewApi~apiNewsPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/PostNewDtoNewWrapperDto} opts.body 
     * @param {module:api/NewApi~apiNewsPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
    apiNewsPost(opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = ['application/json', 'text/json', 'application/_*+json'];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/api/news', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the apiNewsPut operation.
     * @callback moduleapi/NewApi~apiNewsPutCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {Object} opts Optional parameters
     * @param {module:model/PutNewDtoNewWrapperDto} opts.body 
     * @param {module:api/NewApi~apiNewsPutCallback} callback The callback function, accepting three arguments: error, data, response
     */
    apiNewsPut(opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = ['application/json', 'text/json', 'application/_*+json'];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/api/news', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}