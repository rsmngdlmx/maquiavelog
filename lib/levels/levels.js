/**
 * levels.js
 * Main logic for log levels.
 * 
 * Copyright (c) 2023 Ricardo Mendoza.
 * Licensed under the MIT License.
 */

'use strict';

const _levelsByLabel = {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
    silent: Infinity
};

const _levelsByValue = {
    10: 'trace',
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
    60: 'fatal',
    Infinity: 'silent'
};

function getLevel() {
    return this._level;
};

function setLevel(rawLevel) {
    if (typeof rawLevel === 'string') {
        const level = rawLevel.toLowerCase();

        if (_levelsByLabel.hasOwnProperty(level)) {
            this._level = { label: level, value: _levelsByLabel[level] };
            return;
        }
    } else if (typeof rawLevel === 'number' && _levelsByValue.hasOwnProperty(rawLevel)) {
        this._level = { label: _levelsByValue[rawLevel], value: rawLevel };
        return;
    }

    throw new Error('Unknown level');
};

function isLevelEnabled(rawLevel) {
    if (!this._level) {
        return false;
    }

    let level;

    if (typeof rawLevel === 'string') {
        level = rawLevel.toLowerCase();
    } else if (typeof rawLevel === 'number' && _levelsByValue.hasOwnProperty(rawLevel)) {
        level = _levelsByValue[rawLevel];
    }

    if (level === 'silent') {
        return this._level.label === level;
    } else {
        return level && _levelsByLabel.hasOwnProperty(level) ? _levelsByLabel[level] >= _levelsByLabel[this._level.label] : false;
    }
};

module.exports = {
    levels: _levelsByLabel,
    getLevel,
    setLevel,
    isLevelEnabled
};
