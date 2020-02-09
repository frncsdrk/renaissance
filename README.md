# renaissance

[![Build Status](https://api.cirrus-ci.com/github/frncsdrk/renaissance.svg)](https://cirrus-ci.com/github/frncsdrk/renaissance)

Structure your apps

Originally inspired by [twitter's flightjs](https://flightjs.github.io/).

## Usage

For an example on how renaissance components, adapters and plugins work together
you can have a look at the [renaissance-demo repo](https://github.com/frncsdrk/renaissance-demo).

## API

### r.registerAdapter({string} name, {constructor} Adapter)

make an adapter available to renaissance

### r.registerPlugin({string} name, {constructor} Plugin)

make a plugin available to renaissance

### r.registerMixin({string} name, {constructor} Component, {function} callback)

make a mixin available to given component constructor and thus to all instances of the component

### r.Component

base component class which you can derive all your components from

### r.Component.trigger({string} event, {*} data)

trigger a registered event

### r.Component.before({string} event, {function} callback)

register a callback on the before handler of an event

### r.Component.on({string} event, {function} callback)

register a callback directly on the event

### r.Component.after({string} event, {function} callback)

register a callback on the after handler of an event

### r.Component.onInit()

with this method you can call the handler for the `init`-method

## Contributing

See [CONTRIBUTING](https://github.com/frncsdrk/renaissance/blob/master/CONTRIBUTING.md)

## Credits

See [CREDITS](https://github.com/frncsdrk/renaissance/blob/master/CREDITS)

## License

[MIT](https://github.com/frncsdrk/renaissance/blob/master/LICENSE) (c) 2016 - 2020 frncsdrk and contributors
