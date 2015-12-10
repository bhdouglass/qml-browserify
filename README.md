# QML Browserify #

Browserify for QML

## Install ##

`npm install -g qml-browserify`

## Usage ##

Bundle a js file: `qml-browserify -i index.js -o bundle.js`

Bundle all dependencies in a module: `qml-browserify -o bundle.js`

Bundle and print to the console: `qml-browserify -i index.js`

Bundle without global variable: `qml-browserify --globals`

Bundle with Timer pollyfill (see below for setup): `qml-browserify --timer`

Bundle with Promise pollyfill: `qml-browserify --promise`

## Using the Timer pollyfill

In order to use the Timer pollyfill you have to use a qml Timer component and call
Bundle.setupTimeout() with the id of that Timer. *This pollyfill is very limited
and should be used with caution!* For example:

```
Timer {
  id: timer
  property var callback: function() {}
  interval: 500
  running: false
  repeat: false
  onTriggered: {
    timer.callback();
  }
}

Component.onCompleted: {
  Bundle.setupTimeout(timer);
}
```

## Promise pollyfill

The Promise pollyfill used by qml-browserify is [Promise by taylorhakes ](https://github.com/taylorhakes/promise-polyfill)

## License ##

Copyright (C) 2015 [Brian Douglass](http://bhdouglass.com/)

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3, as published
by the Free Software Foundation.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranties of MERCHANTABILITY, SATISFACTORY QUALITY, or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
