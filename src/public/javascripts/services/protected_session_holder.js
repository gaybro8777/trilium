import utils from "./utils.js";
import optionsInitService from './options_init.js';

let lastProtectedSessionOperationDate = null;
let protectedSessionTimeout = null;
let protectedSessionId = null;

optionsInitService.optionsReady.then(options => protectedSessionTimeout = options.protectedSessionTimeout);

setInterval(() => {
    if (lastProtectedSessionOperationDate !== null && new Date().getTime() - lastProtectedSessionOperationDate.getTime() > protectedSessionTimeout * 1000) {
        resetProtectedSession();
    }
}, 5000);

function setProtectedSessionTimeout(encSessTimeout) {
    protectedSessionTimeout = encSessTimeout;
}

function getProtectedSessionId() {
    return protectedSessionId;
}

function setProtectedSessionId(id) {
    protectedSessionId = id;
}

function resetProtectedSession() {
    protectedSessionId = null;

    // most secure solution - guarantees nothing remained in memory
    // since this expires because user doesn't use the app, it shouldn't be disruptive
    utils.reloadApp();
}

function isProtectedSessionAvailable() {
    return protectedSessionId !== null;
}

function touchProtectedSession() {
    if (isProtectedSessionAvailable()) {
        lastProtectedSessionOperationDate = new Date();
    }
}

export default {
    getProtectedSessionId,
    setProtectedSessionId,
    resetProtectedSession,
    isProtectedSessionAvailable,
    setProtectedSessionTimeout,
    touchProtectedSession
};