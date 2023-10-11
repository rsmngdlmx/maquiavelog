'use strict';

const Maquiavelog = require('../../maquiavelog');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

chai.use(require('sinon-chai'));

describe('Maquiavelog', () => {
    let maquiavelog;

    beforeEach(() =>{
        maquiavelog = Maquiavelog();
    });

    it('logs info("Hello World")', () => {
        sinon.stub(process.stdout, 'write').callsFake(chunk => {});
        maquiavelog.info('Hello world!');
        expect(process.stdout.write).to.have.been.calledOnceWith('Hello world!');
        sinon.restore();
    });
});
