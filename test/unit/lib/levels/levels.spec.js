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

describe('Log levels', () => {
    let module;
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
        module = require('../../../../lib/levels/levels')();
    });

    it('has the default log levels set', () => {
        expect(module.levels).to.deep.equal(defaultLogLevels);
    });

    it('prevents the log levels from being overwritten', () => {
        const call = () => { module.levels = {}; };
        expect(call).to.throw('Cannot set property levels of #<Object> which has only a getter');
    });

    it('sets the log level when using the level label', () => {
        expect(module.level).to.be.null;
        module.level = 'info';
        expect(module.level.label).to.equal('info');
        expect(module.level.value).to.equal(30);
    });

    it('sets the log level when using the level value', () => {
        expect(module.level).to.be.null;
        module.level = 30;
        expect(module.level.label).to.equal('info');
        expect(module.level.value).to.equal(30);
    });

    it('prevents the log level from being set when passing an unknown level label', () => {
        const call = () => { module.level = 'unknown' };
        expect(call).to.throw('Unknown level');
    });

    it('prevents the log level from being set when passing an unknown level value', () => {
        const call = () => { module.level = 1234 };
        expect(call).to.throw('Unknown level');
    });

    it('checks if the level is enabled when tested with the level label', () => {
        expect(module.isLevelEnabled('trace')).to.equal(false);
        module.level = defaultLogLevels.trace;
        expect(module.isLevelEnabled('trace')).to.equal(true);
    });

    it('checks if the level is enabled when tested with the level value', () => {
        expect(module.isLevelEnabled(10)).to.equal(false);
        module.level = defaultLogLevels.trace;
        expect(module.isLevelEnabled(10)).to.equal(true);
    });

    it('treats unknown values as disabled levels when checking if a level is enabled', () => {
        module.level = defaultLogLevels.trace;
        expect(module.isLevelEnabled('unknown')).to.equal(false);
        expect(module.isLevelEnabled(1234)).to.equal(false);
    });

    it('considers the level as enabled if it is equal to the level set', () => {
        module.level = defaultLogLevels.warn;
        expect(module.isLevelEnabled('warn')).to.equal(true);
    });

    it('considers the level as enabled if it is greater than the level set and is not the silent level', () => {
        module.level = defaultLogLevels.warn;
        expect(module.isLevelEnabled('error')).to.equal(true);
        expect(module.isLevelEnabled('silent')).to.equal(false);
    });

    it('considers the level as disabled if it is less than the level set', () => {
        module.level = defaultLogLevels.warn;
        expect(module.isLevelEnabled('info')).to.equal(false);
    });

    it('considers all levels but silent as enabled if the trace level is set', () => {
        module.level = defaultLogLevels.trace;
        expect(module.isLevelEnabled('trace')).to.equal(true);
        expect(module.isLevelEnabled('debug')).to.equal(true);
        expect(module.isLevelEnabled('info')).to.equal(true);
        expect(module.isLevelEnabled('warn')).to.equal(true);
        expect(module.isLevelEnabled('error')).to.equal(true);
        expect(module.isLevelEnabled('fatal')).to.equal(true);
        expect(module.isLevelEnabled('silent')).to.equal(false);
    });

    it('considers all levels as disabled if the silent level is set', () => {
        module.level = defaultLogLevels.silent;
        expect(module.isLevelEnabled('trace')).to.equal(false);
        expect(module.isLevelEnabled('debug')).to.equal(false);
        expect(module.isLevelEnabled('info')).to.equal(false);
        expect(module.isLevelEnabled('warn')).to.equal(false);
        expect(module.isLevelEnabled('error')).to.equal(false);
        expect(module.isLevelEnabled('fatal')).to.equal(false);
        expect(module.isLevelEnabled('silent')).to.equal(true);
    })
});
