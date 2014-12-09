/*globals window, navigator, screen*/
(function (win, nav, scr) {

    'use strict';

    var viewportWidthElement = document.getElementsByClassName('viewport-width')[0],
        viewportHeightElement = document.getElementsByClassName('viewport-height')[0],
        mobileDeviceElement = document.getElementsByClassName('mobile-device')[0],
        userAgentElement = document.getElementsByClassName('user-agent')[0],
        orientationTypeElement = document.getElementsByClassName('orientation-type')[0],
        orientationAngleElement = document.getElementsByClassName('orientation-angle')[0],
        bodyElement = document.getElementsByTagName('body')[0],
        viewport,
        userAgent,
        mobileDevice,
        orientation;

    function identifyUserAgent() {
        userAgent = nav.userAgent;
        userAgentElement.innerHTML = userAgent;
    }

    function identifyViewport() {
        viewport = viewport || {};
        viewport.width = win.innerWidth;
        viewport.height = win.innerHeight;
        viewportWidthElement.innerHTML = viewport.width;
        viewportHeightElement.innerHTML = viewport.height;
    }

    function identifyMobileDevice() {
        if (userAgent.toLowerCase().indexOf('android') > -1) {
            mobileDevice = 'Android';
        } else if (userAgent.toLowerCase().indexOf('blackberry') > -1) {
            mobileDevice = 'BlackBerry';
        } else if (userAgent.toLowerCase().indexOf('iemobile') > -1) {
            mobileDevice = 'WindowsPhone';
        } else if (userAgent.toLowerCase().indexOf('iphone') > -1) {
            mobileDevice = 'iPhone';
        } else if (userAgent.toLowerCase().indexOf('ipad') > -1) {
            mobileDevice = 'iPad';
        } else if (userAgent.toLowerCase().indexOf('ipod') > -1) {
            mobileDevice = 'iPod';
        } else if (userAgent.toLowerCase().indexOf('kindle') > -1) {
            mobileDevice = 'Kindle';
        } else {
            mobileDevice = 'is not mobile';
        }
        mobileDeviceElement.innerHTML = mobileDevice;
    }

    function identifyOrientation() {
        orientation = orientation || {};
        if (scr.orientation) {
            orientation.type = scr.orientation.type.toLowerCase();
            orientation.type = (orientation.type.indexOf('landscape') > -1) ? 'landscape' : 'portrait';
            orientation.angle = scr.orientation.angle;
        } else if (win.orientation) {
            orientation.angle = win.orientation;
            orientation.type = (orientation.angle === 90 || orientation.angle === -90) ? 'landscape' : 'portrait';
        }
        orientationTypeElement.innerHTML = orientation.type;
        orientationAngleElement.innerHTML = orientation.angle;
    }

    function refresh() {
        identifyUserAgent();
        identifyViewport();
        identifyMobileDevice();
        identifyOrientation();
    }

    function init() {
        win.onresize = refresh;
        win.onscroll = refresh;
        if (scr.orientation) {
            scr.orientation.onchange = refresh;
        } else if (win.onorientationchange) {
            win.onorientationchange = function (e) {
                console.log('#', e);
                refresh();
            };
        }

        refresh();

        win.onload = function () {
            console.log(bodyElement);
            bodyElement.setAttribute('class', 'loaded');
        };
    }

    init();

}(window, navigator, screen));