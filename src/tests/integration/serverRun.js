const chai = require('chai');
const chaiHttp = require('chai-http');
const { before } = require('mocha');

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

var server;

describe('Server should run on port 8080', () => {
    before(function () {
        server = require('../../index', { bustCache: true });
    });

    after(done => {
        server.close(done);
    });

    describe('GET /', () => {
        it('should response', done => {
            chai
                .request('http://localhost:8080')
                .get('/')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('GET /unknowRoute', () => {
        it('should return error code 404 if route', done => {
            chai
                .request('http://localhost:8080')
                .get('/unknowRoute')
                .end((err, res) => {
                    console.log(err, res)
                    res.should.have.status(404);
                    done();
                });
        });
    });

    describe('GET /romannumeral', () => {
        it('should send error 400 if there is no query param', done => {
            chai
                .request('http://localhost:8080')
                .get('/romannumeral')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        })
    });
});