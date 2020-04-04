import * as hap from 'hap-nodejs';
import EventEmitter = NodeJS.EventEmitter;
import {Categories, Service} from 'hap-nodejs';

type VersionNumber = number;
type ServerVersionNumber = string;

export interface HomebridgeApi extends EventEmitter {
    _accessories: object;
    _platforms: object;
    _configurableAccessories: object;
    _dynamicPlatforms: object;
    version: VersionNumber;
    serverVersion: ServerVersionNumber;

    hap: typeof hap;

    platformAccessory: HomebridgePlatformAccessory;

    publishCameraAccessories(pluginName: string, accessories: any): void;

    publishExternalAccessories(pluginName: string, accessories: any): void;

    registerAccessory(pluginName: string,
                      accessoryName: string,
                      constructor: typeof HomebridgeAccessory,
                      configurationRequestHandler?: any): void;

    registerPlatform(pluginName: string, platformName: string, constructor: typeof HomebridgePlatform, dynamic: any): void;

    registerPlatformAccessories(pluginName: string, platformName: string, accessories: HomebridgePlatformAccessory[]): void;

    unregisterPlatformAccessories(pluginName: string, platformName: string, accessories: HomebridgePlatformAccessory[]): void;

    updatePlatformAccessories(accessories: any): void;
}

export interface IAccessoryConfig {
    name: string;
    description?: string;
    manufacturer?: string;
    serial?: string;
    model?: string;
}

export interface IPlatformConfig {
    platform: string;
}

export interface HomebridgeLogging {
    (...args: any[]): void;

    debug: (message?: any, ...optionalParams: any[]) => void;
    info: (message?: any, ...optionalParams: any[]) => void;
    error: (message?: any, ...optionalParams: any[]) => void;
}

export interface HomebridgePlatformAccessory extends EventEmitter {

    displayName: string;

    new(displayName: string, UUID: string, category?: Categories): HomebridgePlatformAccessory;

    addService(service: Service): Service;

    removeService(service: Service): Service;

    getService(name: string): Service;

    getServiceByUUIDAndSubType(uuid: string, subtype: any): Service;

    updateReachability(reachability: boolean): void;
}

export abstract class HomebridgeAccessory {
    protected services: (typeof hap.Service)[] = [];

    constructor(protected log: HomebridgeLogging, protected config: IAccessoryConfig) {

    }

    public getServices(): (typeof hap.Service)[] {
        return this.services;
    }
}

export abstract class HomebridgePlatform {

    protected readonly accessories: HomebridgePlatformAccessory[] = [];

    constructor(protected readonly log: HomebridgeLogging,
                protected readonly config: IPlatformConfig,
                protected readonly api: HomebridgeApi) {
        this.api.on('didFinishLaunching', () => {
            this.onHomebridgeDidFinishLaunching();
        });
    }

    protected abstract onHomebridgeDidFinishLaunching(): void;
}
