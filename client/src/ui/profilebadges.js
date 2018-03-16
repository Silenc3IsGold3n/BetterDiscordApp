/**
 * BetterDiscord Developer/Contributor Profile Badges
 * Copyright (c) 2015-present Jiiks/JsSucks - https://github.com/Jiiks / https://github.com/JsSucks
 * All rights reserved.
 * https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import { EventListener } from 'modules';
import DOM from './dom';
import { BdBadge, BdMessageBadge } from './components/bd';
import VueInjector from './vueinjector';

export default class extends EventListener {

    bindings() {
        this.uiEvent = this.uiEvent.bind(this);
        this.messageBadge = this.messageBadge.bind(this);
        this.badges = this.badges.bind(this);
        this.userlistBadge = this.userlistBadge.bind(this);
    }

    get eventBindings() {
        return [
            { id: 'discord:MESSAGE_CREATE', callback: this.messageBadge },
            { id: 'discord:MESSAGE_UPDATE', callback: this.messageBadge },
            { id: 'server-switch', callback: this.badges },
            { id: 'channel-switch', callback: this.badges },
            { id: 'ui:loadedmore', callback: this.badges },
            { id: 'ui:useridset', callback: this.userlistBadge },
            { id: 'ui-event', callback: this.uiEvent }
        ];
    }

    uiEvent(e) {
        const { event, data } = e;
        if (event !== 'profile-popup-open') return;
        const { userid } = data;
        if (!userid) return;

        this.inject(userid);
    }

    badges() {
        for (const messageGroup of document.querySelectorAll('.message-group')) {
            this.messageBadge({ element: messageGroup });
        }
    }

    messageBadge(e) {
        if (!e.element) return;
        const msgGroup = e.element.closest('.message-group');
        if (msgGroup.dataset.hasBadges) return;
        msgGroup.setAttribute('data-has-badges', true);
        if (!msgGroup.dataset.authorId) return;
        const c = this.contributors.find(c => c.id === msgGroup.dataset.authorId);
        if (!c) return;
        const root = document.createElement('span');
        const wrapperParent = msgGroup.querySelector('.username-wrapper').parentElement;
        if (!wrapperParent || wrapperParent.children.length < 2) return;
        wrapperParent.insertBefore(root, wrapperParent.children[1]);

        VueInjector.inject(root, {
            template: `<BdMessageBadge :developer="c.developer" :webdev="c.webdev" :contributor="c.contributor" />`,
            components: { BdMessageBadge },
            data: { c }
        });
    }

    userlistBadge(e) {
        const c = this.contributors.find(c => c.id === e.dataset.userId);
        if (!c) return;
        const memberUsername = e.querySelector('.member-username');
        if (!memberUsername) return;
        const root = document.createElement('span');
        memberUsername.append(root);

        VueInjector.inject(root, {
            template: `<BdMessageBadge :developer="c.developer" :webdev="c.webdev" :contributor="c.contributor" />`,
            components: { BdMessageBadge },
            data: { c }
        });
    }

    inject(userid) {
        const c = this.contributors.find(c => c.id === userid);
        if (!c) return;

        setTimeout(() => {
            let hasBadges = false;
            let root = document.querySelector('[class*="profileBadges"]');
            if (root) {
                hasBadges = true;
            } else {
                root = document.querySelector('[class*="headerInfo"]');
            }

            VueInjector.inject(root, {
                template: `<BdBadge :hasBadges="hasBadges" :developer="c.developer" :webdev="c.webdev" :contributor="c.contributor" />`,
                components: { BdBadge },
                data: { c, hasBadges }
            }, DOM.createElement('div', null, 'bdprofilebadges'));
        }, 400);
    }

    get contributors() {
        return [
            { 'id': '81388395867156480', 'webdev': true, 'developer': true, 'contributor': true }, // Jiiks
            { 'id': '98003542823944192', 'webdev': false, 'developer': true, 'contributor': true }, // Pohky
            { 'id': '138850472541814784', 'webdev': true, 'developer': false, 'contributor': true }, // Hammock
            { 'id': '249746236008169473', 'webdev': false, 'developer': true, 'contributor': true }, // Zerebos
            { 'id': '125367412370440192', 'webdev': false, 'developer': true, 'contributor': true }, // Pierce
            { 'id': '284056145272766465', 'webdev': false, 'developer': true, 'contributor': true }, // Samuel Elliott
            { 'id': '184021060562321419', 'webdev': false, 'developer': false, 'contributor': true }, // Lilian Tedone
            { 'id': '76052829285916672', 'webdev': false, 'developer': false, 'contributor': true }, // samfun123
            { 'id': '171005991272316937', 'webdev': false, 'developer': false, 'contributor': true }, // samogot
        ];
    }

}
