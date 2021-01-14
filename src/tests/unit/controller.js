var createError = require('http-errors');
const chai = require("chai");
const sinon = require("sinon");

const expect = chai.expect;

const controller = require('../../controller');



describe('romannumeral', () => {
    

    it('should call next with error if query is empty', () => {
        const req = {
            query: null
        }
        const res = {
            send: sinon.spy(),
            status: sinon.spy()
        };
        const next = sinon.spy()
        
        controller.romannumeral(req, res, next);

        expect(next.calledOnce).to.be.true;
    });

    it('should call next with error if query is NaN', () => {
        const req = {
            query: {
                query: "NaN"
            }
        }
        const res = {
            send: sinon.spy()
        };
        const next = sinon.spy()

        controller.romannumeral(req, res, next);

        expect(next.calledOnce).to.be.true;
    });

    it('should call next with error if query is not between 1 and 255', () => {
        const req = {
            query: {
                query: 0
            }
        }
        const res = {
            send: sinon.spy()
        };
        const next = sinon.spy()

        controller.romannumeral(req, res, next);

        expect(next.calledOnce).to.be.true;
    });

    it('should call send with roman numeral', () => {
        const req = {
            query: {
                query: 1
            }
        }
        const res = {
            status: sinon.spy(),
            send: sinon.spy()
        };
        const next = sinon.spy()

        controller.romannumeral(req, res, next);

        expect(next.notCalled).to.be.true;
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.calledWith('I')).to.be.true;
        expect(res.status.calledWith(200)).to.be.true;
    });
});