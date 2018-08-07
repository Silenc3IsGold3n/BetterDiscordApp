/**
 * BetterDiscord Vue Devtools Module
 * Copyright (c) 2015-present Jiiks/JsSucks - https://github.com/Jiiks / https://github.com/JsSucks
 * All rights reserved.
 * https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import electron from 'electron';
import path from 'path';

import BuiltinModule from './BuiltinModule';

import { Globals } from 'modules';
import { Toasts } from 'ui';

export default new class VueDevtoolsModule extends BuiltinModule {

    get settingPath() {
        return ['core', 'advanced', 'vue-devtools'];
    }

    get extensionName() {
        return 'Vue.js devtools';
    }

    get extensionPath() {
        return path.join(Globals.getPath('ext'), 'extensions', 'vdt');
    }

    enabled() {
        if (electron.remote.BrowserWindow.getDevToolsExtensions()[this.extensionName]) return;

        try {
            const res = electron.remote.BrowserWindow.addDevToolsExtension(this.extensionPath);
            if (res !== undefined) {
                Toasts.success(res + ' Installed');
                return;
            }
            Toasts.error('Vue.js devtools install failed');
        } catch (err) {
            Toasts.error('Vue.js devtools install failed');
        }
    }

    disabled() {
        electron.remote.BrowserWindow.removeDevToolsExtension(this.extensionName);
    }

}
