/**
 * BetterDiscord External Module Manager Module
 * Copyright (c) 2015-present Jiiks/JsSucks - https://github.com/Jiiks / https://github.com/JsSucks
 * All rights reserved.
 * https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import ContentManager from './contentmanager';
import ExtModule from './extmodule';
import path from 'path';

export default class extends ContentManager {

    static get localModules() {
        return this.localContent;
    }

    static get contentType() {
        return 'module';
    }

    static get moduleName() {
        return 'Ext Module Manager';
    }

    static get pathId() {
        return 'modules';
    }

    static get loadAllModules() {
        return this.loadAllContent;
    }

    static get refreshModules() { return this.refreshContent }

    static get loadContent() { return this.loadModule }
    static async loadModule(paths, configs, info, main) {
        const mainPath = path.join(paths.contentPath, main || 'index.js');

        return new ExtModule({
            configs, info, main,
            paths: {
                contentPath: paths.contentPath,
                dirName: paths.dirName,
                mainPath
            }
        });
    }

    static get isExtModule() { return this.isThisContent }
    static isThisContent(module) {
        return module instanceof ExtModule;
    }

    static get findModule() { return this.findContent }
    static get getModuleIndex() { return this.getContentIndex }
    static get getModuleByName() { return this.getContentByName }
    static get getModuleById() { return this.getContentById }
    static get getModuleByPath() { return this.getContentByPath }
    static get getModuleByDirName() { return this.getContentByDirName }

}
