/**
 * @format
 */

import App from './App';
import {AppRegistry} from 'react-native';
import {LogBox} from 'react-native';
import {name as appName} from './app.json';

// Ignore all log notifications:
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
