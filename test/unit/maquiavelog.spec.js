'use strict';

const Maquiavelog = require('../../maquiavelog');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

chai.use(require('sinon-chai'));

describe('MaquiaveLog', () => {
    let maquiavelog;
    let originalStdout;

    beforeEach(() =>{
        maquiavelog = Maquiavelog();
        originalStdout = process.stdout;

        Object.defineProperty(process, 'stdout', {
            value: {
                write: sinon.stub().callsFake(chunk => {})
            }
        });
    });

    afterEach(() => {
        Object.defineProperty(process, 'stdout', {
            value: originalStdout
        });

        console.log('Finished!');
    });

    it('logs info("Hello World")', () => {
        maquiavelog.info('Hello world!');
        expect(process.stdout.write).to.have.been.calledOnceWith('Hello world!');
    });
});
