'use strict';

const Maquiavelog = require('../../maquiavelog');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

chai.use(require('sinon-chai'));

describe('MaquiaveLog', () => {
    let maquiavelog;

    beforeEach(() =>{
        maquiavelog = Maquiavelog();
        sinon.stub(process.stdout, 'write').callsFake(chunk => {});
    });

    afterEach(() => {
        sinon.restore();
    });

    it('logs info("Hello World")', () => {
        maquiavelog.info('Hello world!');
        expect(process.stdout.write).to.have.been.calledOnceWith('Hello world!');
    });
});
