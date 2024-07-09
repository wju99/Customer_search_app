import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Customer API', () => {
  // Test the search endpoint
  describe('GET /api/customers/search', () => {
    it('should return customers matching the search name', (done) => {
      chai.request(app)
        .get('/api/customers/search?name=Maxwell')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          if (res.body.length > 0) {
            res.body.forEach(customer => {
              expect(customer.firstName === 'Maxwell' || customer.lastName === 'Maxwell').to.be.true;
            });
          }
          done();
        });
    });

    it('should return 404 if no customers match the search name', (done) => {
      chai.request(app)
        .get('/api/customers/search?name=Nonexistent')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message', 'No matching customers found');
          done();
        });
    });
  });

  // Test the filter endpoint
  describe('GET /api/customers/filter', () => {
    it('should return customers matching the company name', (done) => {
      chai.request(app)
        .get('/api/customers/filter?company=Microsoft')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          if (res.body.length > 0) {
            res.body.forEach(customer => {
              expect(customer.companyName).to.equal('Microsoft');
            });
          }
          done();
        });
    });

    it('should return 404 if no customers match the company name', (done) => {
      chai.request(app)
        .get('/api/customers/filter?company=Nonexistent')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message', 'No matching customers found');
          done();
        });
    });
  });

  // Test the get company names endpoint
  describe('GET /api/customers/companies', () => {
    it('should return a list of company names', (done) => {
      chai.request(app)
        .get('/api/customers/companies')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });
  });
});
