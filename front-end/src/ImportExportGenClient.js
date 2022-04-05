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
import {ApiClient} from './ApiClient';
import {ActionCar} from './model/ActionCar';
import {AuthDto} from './model/AuthDto';
import {Car} from './model/Car';
import {CarEquipment} from './model/CarEquipment';
import {CarEquipmentFormDto} from './model/CarEquipmentFormDto';
import {CarEquipmentFormItem} from './model/CarEquipmentFormItem';
import {CarEquipmentFormItemDto} from './model/CarEquipmentFormItemDto';
import {CarRepair} from './model/CarRepair';
import {ClientCar} from './model/ClientCar';
import {Employee} from './model/Employee';
import {GetEmployeeDto} from './model/GetEmployeeDto';
import {GetNewDto} from './model/GetNewDto';
import {GetUserDto} from './model/GetUserDto';
import {ImgCar} from './model/ImgCar';
import {ImgDto} from './model/ImgDto';
import {Order} from './model/Order';
import {PostCarDto} from './model/PostCarDto';
import {PostCarEquipmentDto} from './model/PostCarEquipmentDto';
import {PostCarEquipmentFormDto} from './model/PostCarEquipmentFormDto';
import {PostCarRepairDto} from './model/PostCarRepairDto';
import {PostClientCarDto} from './model/PostClientCarDto';
import {PostEmployeeDto} from './model/PostEmployeeDto';
import {PostNewDto} from './model/PostNewDto';
import {PostNewDtoNewWrapperDto} from './model/PostNewDtoNewWrapperDto';
import {PostOrderDto} from './model/PostOrderDto';
import {PostUserDto} from './model/PostUserDto';
import {PutCarDto} from './model/PutCarDto';
import {PutCarEquipmentDto} from './model/PutCarEquipmentDto';
import {PutCarEquipmentFormDto} from './model/PutCarEquipmentFormDto';
import {PutClientCarDto} from './model/PutClientCarDto';
import {PutEmployeeDto} from './model/PutEmployeeDto';
import {PutNewDto} from './model/PutNewDto';
import {PutNewDtoNewWrapperDto} from './model/PutNewDtoNewWrapperDto';
import {PutUserDto} from './model/PutUserDto';
import {PutValueCarEquipmentDto} from './model/PutValueCarEquipmentDto';
import {Role} from './model/Role';
import {State} from './model/State';
import {StateCarRepair} from './model/StateCarRepair';
import {StateTestDrive} from './model/StateTestDrive';
import {Status} from './model/Status';
import {TestDrive} from './model/TestDrive';
import {TestDriveDto} from './model/TestDriveDto';
import {UpdateStateCarRepairDto} from './model/UpdateStateCarRepairDto';
import {UpdateStateCarRepairForStartWorkDto} from './model/UpdateStateCarRepairForStartWorkDto';
import {UpdateStateOrderDto} from './model/UpdateStateOrderDto';
import {User} from './model/User';
import {ValueCarEquipment} from './model/ValueCarEquipment';
import {ValueCarEquipmentDto} from './model/ValueCarEquipmentDto';
import {AuthApi} from './api/AuthApi';
import {CarEquipmentApi} from './api/CarEquipmentApi';
import {CarRepairsApi} from './api/CarRepairsApi';
import {CarsApi} from './api/CarsApi';
import {ClientCarsApi} from './api/ClientCarsApi';
import {EmployeesApi} from './api/EmployeesApi';
import {NewApi} from './api/NewApi';
import {OrdersApi} from './api/OrdersApi';
import {RolesApi} from './api/RolesApi';
import {TestDrivesApi} from './api/TestDrivesApi';
import {UsersApi} from './api/UsersApi';

/**
* Object.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var BackEndAutoCenterVw = require('index'); // See note below*.
* var xxxSvc = new BackEndAutoCenterVw.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new BackEndAutoCenterVw.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new BackEndAutoCenterVw.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new BackEndAutoCenterVw.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version v1
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The ActionCar model constructor.
     * @property {module:model/ActionCar}
     */
    ActionCar,

    /**
     * The AuthDto model constructor.
     * @property {module:model/AuthDto}
     */
    AuthDto,

    /**
     * The Car model constructor.
     * @property {module:model/Car}
     */
    Car,

    /**
     * The CarEquipment model constructor.
     * @property {module:model/CarEquipment}
     */
    CarEquipment,

    /**
     * The CarEquipmentFormDto model constructor.
     * @property {module:model/CarEquipmentFormDto}
     */
    CarEquipmentFormDto,

    /**
     * The CarEquipmentFormItem model constructor.
     * @property {module:model/CarEquipmentFormItem}
     */
    CarEquipmentFormItem,

    /**
     * The CarEquipmentFormItemDto model constructor.
     * @property {module:model/CarEquipmentFormItemDto}
     */
    CarEquipmentFormItemDto,

    /**
     * The CarRepair model constructor.
     * @property {module:model/CarRepair}
     */
    CarRepair,

    /**
     * The ClientCar model constructor.
     * @property {module:model/ClientCar}
     */
    ClientCar,

    /**
     * The Employee model constructor.
     * @property {module:model/Employee}
     */
    Employee,

    /**
     * The GetEmployeeDto model constructor.
     * @property {module:model/GetEmployeeDto}
     */
    GetEmployeeDto,

    /**
     * The GetNewDto model constructor.
     * @property {module:model/GetNewDto}
     */
    GetNewDto,

    /**
     * The GetUserDto model constructor.
     * @property {module:model/GetUserDto}
     */
    GetUserDto,

    /**
     * The ImgCar model constructor.
     * @property {module:model/ImgCar}
     */
    ImgCar,

    /**
     * The ImgDto model constructor.
     * @property {module:model/ImgDto}
     */
    ImgDto,

    /**
     * The Order model constructor.
     * @property {module:model/Order}
     */
    Order,

    /**
     * The PostCarDto model constructor.
     * @property {module:model/PostCarDto}
     */
    PostCarDto,

    /**
     * The PostCarEquipmentDto model constructor.
     * @property {module:model/PostCarEquipmentDto}
     */
    PostCarEquipmentDto,

    /**
     * The PostCarEquipmentFormDto model constructor.
     * @property {module:model/PostCarEquipmentFormDto}
     */
    PostCarEquipmentFormDto,

    /**
     * The PostCarRepairDto model constructor.
     * @property {module:model/PostCarRepairDto}
     */
    PostCarRepairDto,

    /**
     * The PostClientCarDto model constructor.
     * @property {module:model/PostClientCarDto}
     */
    PostClientCarDto,

    /**
     * The PostEmployeeDto model constructor.
     * @property {module:model/PostEmployeeDto}
     */
    PostEmployeeDto,

    /**
     * The PostNewDto model constructor.
     * @property {module:model/PostNewDto}
     */
    PostNewDto,

    /**
     * The PostNewDtoNewWrapperDto model constructor.
     * @property {module:model/PostNewDtoNewWrapperDto}
     */
    PostNewDtoNewWrapperDto,

    /**
     * The PostOrderDto model constructor.
     * @property {module:model/PostOrderDto}
     */
    PostOrderDto,

    /**
     * The PostUserDto model constructor.
     * @property {module:model/PostUserDto}
     */
    PostUserDto,

    /**
     * The PutCarDto model constructor.
     * @property {module:model/PutCarDto}
     */
    PutCarDto,

    /**
     * The PutCarEquipmentDto model constructor.
     * @property {module:model/PutCarEquipmentDto}
     */
    PutCarEquipmentDto,

    /**
     * The PutCarEquipmentFormDto model constructor.
     * @property {module:model/PutCarEquipmentFormDto}
     */
    PutCarEquipmentFormDto,

    /**
     * The PutClientCarDto model constructor.
     * @property {module:model/PutClientCarDto}
     */
    PutClientCarDto,

    /**
     * The PutEmployeeDto model constructor.
     * @property {module:model/PutEmployeeDto}
     */
    PutEmployeeDto,

    /**
     * The PutNewDto model constructor.
     * @property {module:model/PutNewDto}
     */
    PutNewDto,

    /**
     * The PutNewDtoNewWrapperDto model constructor.
     * @property {module:model/PutNewDtoNewWrapperDto}
     */
    PutNewDtoNewWrapperDto,

    /**
     * The PutUserDto model constructor.
     * @property {module:model/PutUserDto}
     */
    PutUserDto,

    /**
     * The PutValueCarEquipmentDto model constructor.
     * @property {module:model/PutValueCarEquipmentDto}
     */
    PutValueCarEquipmentDto,

    /**
     * The Role model constructor.
     * @property {module:model/Role}
     */
    Role,

    /**
     * The State model constructor.
     * @property {module:model/State}
     */
    State,

    /**
     * The StateCarRepair model constructor.
     * @property {module:model/StateCarRepair}
     */
    StateCarRepair,

    /**
     * The StateTestDrive model constructor.
     * @property {module:model/StateTestDrive}
     */
    StateTestDrive,

    /**
     * The Status model constructor.
     * @property {module:model/Status}
     */
    Status,

    /**
     * The TestDrive model constructor.
     * @property {module:model/TestDrive}
     */
    TestDrive,

    /**
     * The TestDriveDto model constructor.
     * @property {module:model/TestDriveDto}
     */
    TestDriveDto,

    /**
     * The UpdateStateCarRepairDto model constructor.
     * @property {module:model/UpdateStateCarRepairDto}
     */
    UpdateStateCarRepairDto,

    /**
     * The UpdateStateCarRepairForStartWorkDto model constructor.
     * @property {module:model/UpdateStateCarRepairForStartWorkDto}
     */
    UpdateStateCarRepairForStartWorkDto,

    /**
     * The UpdateStateOrderDto model constructor.
     * @property {module:model/UpdateStateOrderDto}
     */
    UpdateStateOrderDto,

    /**
     * The User model constructor.
     * @property {module:model/User}
     */
    User,

    /**
     * The ValueCarEquipment model constructor.
     * @property {module:model/ValueCarEquipment}
     */
    ValueCarEquipment,

    /**
     * The ValueCarEquipmentDto model constructor.
     * @property {module:model/ValueCarEquipmentDto}
     */
    ValueCarEquipmentDto,

    /**
    * The AuthApi service constructor.
    * @property {module:api/AuthApi}
    */
    AuthApi,

    /**
    * The CarEquipmentApi service constructor.
    * @property {module:api/CarEquipmentApi}
    */
    CarEquipmentApi,

    /**
    * The CarRepairsApi service constructor.
    * @property {module:api/CarRepairsApi}
    */
    CarRepairsApi,

    /**
    * The CarsApi service constructor.
    * @property {module:api/CarsApi}
    */
    CarsApi,

    /**
    * The ClientCarsApi service constructor.
    * @property {module:api/ClientCarsApi}
    */
    ClientCarsApi,

    /**
    * The EmployeesApi service constructor.
    * @property {module:api/EmployeesApi}
    */
    EmployeesApi,

    /**
    * The NewApi service constructor.
    * @property {module:api/NewApi}
    */
    NewApi,

    /**
    * The OrdersApi service constructor.
    * @property {module:api/OrdersApi}
    */
    OrdersApi,

    /**
    * The RolesApi service constructor.
    * @property {module:api/RolesApi}
    */
    RolesApi,

    /**
    * The TestDrivesApi service constructor.
    * @property {module:api/TestDrivesApi}
    */
    TestDrivesApi,

    /**
    * The UsersApi service constructor.
    * @property {module:api/UsersApi}
    */
    UsersApi
};