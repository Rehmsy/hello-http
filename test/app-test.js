const chai = require('chai');
const { assert } = chai;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../lib/app');

describe('not-simple-to-me http server', () => {

    it('responds with waz up world', () => {
        return chai.request(app)
            .get('/')
            .then(res => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'waz up world');
            });
    });

    it('says happy birthday stranger on get', () => {
        return chai.request(app)
            .get('/happy-birthday')
            .then(res => {
                assert.equal(res.text, '<html><body><p>Happy Birthday <strong>Stranger!</strong></p></body></html>');
            });
    });

    it('says happy birthday specific name', () => {
        return chai.request(app)
            .get('/happy-birthday/jane')
            .then(res => {
                assert.equal(res.text, '<html><body><p>Happy Birthday <strong>jane!</strong></p></body></html>');
            });
    });

    it('says happy birthday specific name with custom message', () => {
        return chai.request(app)
            .get('/happy-birthday/Jane?custom=You%20Rock')
            .then(res => {
                assert.equal(res.text, '<html><body><p>Happy Birthday <strong>Jane!</strong> You Rock</p></body></html>');
            });
    });
});