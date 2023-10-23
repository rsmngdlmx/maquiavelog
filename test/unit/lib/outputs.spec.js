/**
 * outputs.spec.js
 * Unit tests for outputs.
 * 
 * Copyright (c) 2023 Ricardo Mendoza.
 * Licensed under the MIT License.
 */

'use strict';

const chai = require('chai');
const Stream = require('stream');
const outputs = require('../../../lib/outputs');
const expect = chai.expect;

describe('Outputs', () => {
    let logFake;
    const testStream = new Stream.Writable();
    const testLevel = { label: 'info', value: 30 };

    beforeEach(() => {
        logFake = Object.assign({ _level: testLevel, _outputs: [] }, outputs);
    });

    describe('Add output', () => {
        it('adds an output', () => {
            expect(logFake._outputs).to.be.an('array').that.is.empty;
            const output = { stream: testStream, level: testLevel };
            logFake.addOutput(output);
            expect(logFake._outputs.length).to.equal(1);
        });
    
        it('adds an output when passing a level label to specify the level', () => {
            const output = { stream: testStream, level: testLevel.label };
            logFake.addOutput(output);
            expect(logFake._outputs[0].level).to.deep.equal(testLevel);
        });
    
        it('adds an output when passing a level value to specify the level', () => {
            const output = { stream: testStream, level: testLevel.value };
            logFake.addOutput(output);
            expect(logFake._outputs[0].level).to.deep.equal(testLevel);
        });
    
        it('adds an output with the current log level if no other level is specified', () => {
            const output = { stream: testStream };
            logFake.addOutput(output);
            expect(logFake._outputs[0].level).to.deep.equal(testLevel);
        });
    
        it('rejects the output if the specified level is invalid', () => {
            const output = { stream: testStream, level: 'invalid' };
            expect(logFake.addOutput.bind(logFake, output)).to.throw('The level provided is not valid');
        });
    
        it('rejects the output if it does not include a stream', () => {
            const output = { wrong: 'structure' };
            expect(logFake.addOutput.bind(logFake, output)).to.throw('No stream provided');
        });
    
        it('rejects the output if the specified stream does not have a write method', () => {
            const output = { stream: { write: 'string' } };
            expect(logFake.addOutput.bind(logFake, output)).to.throw('The stream provided does not have a write method');
        });
    
        it('ignores any extra properties from the provided output and sets only the stream and the level', () => {
            const output = { stream: testStream, level: testLevel, extra: 'property' };
            logFake.addOutput(output);
            expect(Object.keys(logFake._outputs[0]).length).to.equal(2);
            expect(logFake._outputs[0].stream).to.deep.equal(testStream);
            expect(logFake._outputs[0].level).to.deep.equal(testLevel);
        });
    });
});
