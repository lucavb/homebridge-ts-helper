import {Service} from 'hap-nodejs';
import {AccessoryConfig, API, Logging, PlatformAccessory} from 'homebridge';

export type HomebridgeApi = API

export interface IAccessoryConfig extends AccessoryConfig {
    description?: string;
    manufacturer?: string;
    serial?: string;
    model?: string;
}

export interface IPlatformConfig {
    platform: string;
}

export type HomebridgeLogging = Logging;

export type HomebridgePlatformAccessory = PlatformAccessory;

export abstract class HomebridgeAccessory {

    protected services: Service[] = [];

    constructor(protected log: HomebridgeLogging, protected config: IAccessoryConfig) {

    }

    public getServices(): Service[] {
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
