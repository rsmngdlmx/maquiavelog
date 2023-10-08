/**
 * levels.js
 * Main logic for log levels.
 * 
 * Copyright (c) 2023 Ricardo Mendoza.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = () => {
    let _level = null;

    const _levels = {
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

    const setLevel = (label, value) => {
        _level = {
            get label() {
                return label;
            },
            get value() {
                return value;
            }
        };
    };

    const isLevelEnabled = rawLevel => {
        if (!_level) {
            return false;
        }

        let level;

        if (typeof rawLevel === 'string') {
            level = rawLevel.toLowerCase();
        } else if (typeof rawLevel === 'number' && _levelsByValue.hasOwnProperty(rawLevel)) {
            level = _levelsByValue[rawLevel];
        }

        if (level === 'silent') {
            return _level.label === level;
        } else {
            return level && _levels.hasOwnProperty(level) ? _levels[level] >= _levels[_level.label] : false;
        }
    };

    return {
        get level() {
            return _level;
        },
        set level(rawLevel) {
            if (typeof rawLevel === 'string') {
                const level = rawLevel.toLowerCase();
                if (_levels.hasOwnProperty(level)) {
                    setLevel(level, _levels[level]);
                    return;
                }
            } else if (typeof rawLevel === 'number' && _levelsByValue.hasOwnProperty(rawLevel)) {
                setLevel(_levelsByValue[rawLevel], rawLevel);
                return;
            }

            throw new Error('Unknown level');
        },
        get levels() {
            return _levels;
        },
        isLevelEnabled
    };
};
