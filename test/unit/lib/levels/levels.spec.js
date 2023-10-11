/**
 * levels.spec.js
 * Unit tests for log levels.
 * 
 * Copyright (c) 2023 Ricardo Mendoza.
 * Licensed under the MIT License.
 */

'use strict';

const chai = require('chai');
const expect = chai.expect;
const logLevels = require('../../../../lib/levels/levels');

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

    it('gets the current log level set', () => {
        logFake._level = testLevel;
        expect(logFake.getLevel()).to.deep.equal(testLevel);
    });

    it('sets the log level when using the level label', () => {
        expect(logFake.getLevel()).to.be.null;
        logFake.setLevel('info');
        expect(logFake.getLevel()).to.deep.equal(testLevel);
    });

    it('sets the log level when using the level value', () => {
        expect(logFake.getLevel()).to.be.null;
        logFake.setLevel(30);
        expect(logFake.getLevel()).to.deep.equal(testLevel);
    });

    it('prevents the log level from being set when passing an unknown level label', () => {
        expect(logFake.setLevel.bind(logFake, 'unknown')).to.throw('Unknown level');
    });

    it('prevents the log level from being set when passing an unknown level value', () => {
        expect(logFake.setLevel.bind(logFake, 1234)).to.throw('Unknown level');
    });

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

    it('treats unknown values as disabled levels when checking if a level is enabled', () => {
        logFake.setLevel(defaultLogLevels.trace);
        expect(logFake.isLevelEnabled('unknown')).to.equal(false);
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
