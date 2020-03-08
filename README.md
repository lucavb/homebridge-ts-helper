# homebridge-ts-helper

This is a small repository that provides interfaces for writing 
code for [homebridge](https://github.com/nfarina/homebridge) in [Typescript](https://www.typescriptlang.org/).
At the moment this is only the abstract class `HomebridgeAccessory` and the two interfaces `HomebridgeApi` and 
`IAccessoryConfig`.

## How do I use this?

Well, start by turning your homebridge plugin into a Typescript project, and then add this project as
dependency.

```
npm i typescript @types/node --save-dev
npm i homebridge-ts-helper --save-dev
```

You can then write your plugin like this

```typescript
export default (homebridge: HomebridgeApi): void => {
    homebridgeService = homebridge.hap.Service;

    homebridge.registerAccessory('homebridge-my-amazing-plugin', 'my-amazing-plugin', MyPlugin);
};

class MyPlugin extends HomebridgeAccessory {
}
``` 

For further questions have a look at either [the official reference repo for typescript plugins](https://github.com/nfarina/homebridge-tesla)
or [my other project](https://github.com/lucavb/homebridge-http-motion-sensor)

## Contributions / Suggestions

They are always welcome, anything that makes homebridge better. Note: I am using `hap-nodejs` in version `^0.4.53` because 
that is the version that homebridge uses at the moment. With `^0.5.0` nfarina has extended the typing 
and I would like to switch to this version. However, there appears to be something wrong with either the types for
services or the way apparently every call to the constructor in homebridge plugins happens. So be careful here. 
