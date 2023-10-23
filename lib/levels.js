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

function getLevel(level) {
    if (level === undefined || level === null) {
        return this._level;
    }

    switch (typeof level) {
        case 'string':
            const label = level.toLowerCase();
            return _levelsByLabel[label] ? { label, value: _levelsByLabel[label] } : null;
        case 'number':
            return _levelsByValue[level] ? { label: _levelsByValue[level], value: level } : null;
        default:
            return null;
    }
}

function setLevel(level) {
    if (typeof level === 'string') {
        const label = level.toLowerCase();

        if (_levelsByLabel[label]) {
            this._level = { label, value: _levelsByLabel[label] };
            return;
        }
    } else if (typeof level === 'number' && _levelsByValue[level]) {
        this._level = { label: _levelsByValue[level], value: level };
        return;
    }

    throw new Error('The level provided is not valid');
}

function isLevelEnabled(level) {
    if (!this._level) {
        return false;
    }

    let label;

    if (typeof level === 'string') {
        label = level.toLowerCase();
    } else if (typeof level === 'number' && _levelsByValue[level]) {
        label = _levelsByValue[level];
    }

    if (label === 'silent') {
        return this._level.label === label;
    } else {
        return label && _levelsByLabel[label] ? _levelsByLabel[label] >= _levelsByLabel[this._level.label] : false;
    }
}

module.exports = {
    levels: _levelsByLabel,
    getLevel,
    setLevel,
    isLevelEnabled
};
