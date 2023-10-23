/**
 * levels.spec.js
 * Unit tests for log levels.
 * 
 * Copyright (c) 2023 Ricardo Mendoza.
 * Licensed under the MIT License.
 */

'use strict';

const chai = require('chai');
const logLevels = require('../../../lib/levels');
const expect = chai.expect;

describe('Log levels', () => {
    let logFake;
    const testLevel = { label: 'info', value: 30 };
    const defaultLogLevels = {
        trace: 10,
        debug: 20,
        info: 30,
        warn: 40,
        error: 50,
        fatal: 60,
        silent: Infinity
    };

    beforeEach(() => {
        logFake = Object.assign({ _level: null }, logLevels);
    });

    it('has the default log levels set', () => {
        expect(logFake.levels).to.deep.equal(defaultLogLevels);
    });

    describe('Get level', () => {
        it('gets the current log level set if no parameters are provided', () => {
            logFake._level = testLevel;
            expect(logFake.getLevel()).to.deep.equal(testLevel);
        });

        it('gets the level when the level label is provided', () => {
            expect(logFake.getLevel(testLevel.label)).to.deep.equal(testLevel);
        });

        it('gets the level when the level value is provided', () => {
            expect(logFake.getLevel(testLevel.value)).to.deep.equal(testLevel);
        });

        it('gets no level if the level label provided is invalid', () => {
            expect(logFake.getLevel('invalid')).to.be.null;
        });

        it('gets no level if the level value provided is invalid', () => {
            expect(logFake.getLevel(0)).to.be.null;
        });

        it('gets no level if the type of the data provided is invalid', () => {
            expect(logFake.getLevel(true)).to.be.null;
        })
    });

    describe('Set level', () => {
        it('sets the log level when using the level label', () => {
            expect(logFake.getLevel()).to.be.null;
            logFake.setLevel(testLevel.label);
            expect(logFake.getLevel()).to.deep.equal(testLevel);
        });
    
        it('sets the log level when using the level value', () => {
            expect(logFake.getLevel()).to.be.null;
            logFake.setLevel(testLevel.value);
            expect(logFake.getLevel()).to.deep.equal(testLevel);
        });
    
        it('prevents the log level from being set when passing an invalid level label', () => {
            expect(logFake.setLevel.bind(logFake, 'invalid')).to.throw('The level provided is not valid');
        });
    
        it('prevents the log level from being set when passing an invalid level value', () => {
            expect(logFake.setLevel.bind(logFake, 1234)).to.throw('The level provided is not valid');
        });

        it('prevents the log level from being set when the type of the value passed is invalid', () => {
            expect(logFake.setLevel.bind(logFake, true)).to.throw('The level provided is not valid');
        });
    });

    describe('Is level enabled?', () => {
        it('checks if the level is enabled when tested with the level label', () => {
            expect(logFake.isLevelEnabled('trace')).to.equal(false);
            logFake.setLevel(defaultLogLevels.trace);
            expect(logFake.isLevelEnabled('trace')).to.equal(true);
        });
    
        it('checks if the level is enabled when tested with the level value', () => {
            expect(logFake.isLevelEnabled(10)).to.equal(false);
            logFake.setLevel(defaultLogLevels.trace);
            expect(logFake.isLevelEnabled(10)).to.equal(true);
        });
    
        it('treats invalid values as disabled levels when checking if a level is enabled', () => {
            logFake.setLevel(defaultLogLevels.trace);
            expect(logFake.isLevelEnabled('invalid')).to.equal(false);
            expect(logFake.isLevelEnabled(1234)).to.equal(false);
        });
    
        it('considers the level as enabled if it is equal to the level set', () => {
            logFake.setLevel(defaultLogLevels.warn);
            expect(logFake.isLevelEnabled('warn')).to.equal(true);
        });
    
        it('considers the level as enabled if it is greater than the level set and is not the silent level', () => {
            logFake.setLevel(defaultLogLevels.warn);
            expect(logFake.isLevelEnabled('error')).to.equal(true);
            expect(logFake.isLevelEnabled('silent')).to.equal(false);
        });
    
        it('considers the level as disabled if it is less than the level set', () => {
            logFake.setLevel(defaultLogLevels.warn);
            expect(logFake.isLevelEnabled('info')).to.equal(false);
        });
    
        it('considers all levels but silent as enabled if the trace level is set', () => {
            logFake.setLevel(defaultLogLevels.trace);
            expect(logFake.isLevelEnabled('trace')).to.equal(true);
            expect(logFake.isLevelEnabled('debug')).to.equal(true);
            expect(logFake.isLevelEnabled('info')).to.equal(true);
            expect(logFake.isLevelEnabled('warn')).to.equal(true);
            expect(logFake.isLevelEnabled('error')).to.equal(true);
            expect(logFake.isLevelEnabled('fatal')).to.equal(true);
            expect(logFake.isLevelEnabled('silent')).to.equal(false);
        });
    
        it('considers all levels as disabled if the silent level is set', () => {
            logFake.setLevel(defaultLogLevels.silent);
            expect(logFake.isLevelEnabled('trace')).to.equal(false);
            expect(logFake.isLevelEnabled('debug')).to.equal(false);
            expect(logFake.isLevelEnabled('info')).to.equal(false);
            expect(logFake.isLevelEnabled('warn')).to.equal(false);
            expect(logFake.isLevelEnabled('error')).to.equal(false);
            expect(logFake.isLevelEnabled('fatal')).to.equal(false);
            expect(logFake.isLevelEnabled('silent')).to.equal(true);
        });
    });
});
