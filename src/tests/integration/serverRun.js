const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

var server;

describe('Server should run on port 8080', () => {
    beforeEach(function () {
        server = require('../../index');
    });
    
    describe('GET /', () => {
        it('should response', done => {
            this.timeout = 500;    
            chai
                .request('http://localhost:8080')
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('GET /unknowRoute', () => {
        it('should return error code 404 if route', done => {
            this.timeout = 500;
            chai
                .request('http://localhost:8080')
                .get('/unknowRoute')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});