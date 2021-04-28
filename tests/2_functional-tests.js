const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

    test('Translation with text and locale fields', (done) => {
        chai
            .request(server)
            .post('/api/translate')
            .send({text: "Mangoes are my favorite fruit." , locale: "american-to-british"})
            .end((err, res) => {
                assert.equal(res.body.text,  "Mangoes are my favorite fruit.")
                assert.equal(res.body.translation, "Mangoes are my <span class=\"highlight\">favourite</span> fruit.")
                done()
            })

    })

    test('Translation with text and invalid locale field', (done) => {
        chai
            .request(server)
            .post('/api/translate')
            .send({text: 'some text', locale: 'wrong-stuff'})
            .end((err, res) => {
                assert.equal(JSON.stringify(res.body), JSON.stringify({ "error": "Invalid value for locale field"}))
                done()
            })
    })

    test('Translation with missing text field', (done) => {
        chai
            .request(server)
            .post('/api/translate')
            .send({locale: 'random-thing'})
            .end((err, res) => {
                assert.equal(JSON.stringify(res.body), JSON.stringify({ "error": "Required field(s) missing"}))
                done()
            })
    })
    

    test('Translation with missing locale field', (done) => {
        chai
            .request(server)
            .post('/api/translate')
            .send({text:'enter some random text'})
            .end((err, res) => {
                assert.equal(JSON.stringify(res.body), JSON.stringify({ "error": "Required field(s) missing"}))
                done()
            })
    })
    

    test('Translation with empty text', (done) => {
        chai
            .request(server)
            .post('/api/translate')
            .send({locale: 'empty', text: ''})
            .end((err, res) => {
                assert.equal(JSON.stringify(res.body), JSON.stringify({"error": "No text to translate"}))
                done()
            })
    })
    

    test('Translation with text that needs no translation', (done) => {
        chai
            .request(server)
            .post('/api/translate')
            .send({text: "Mangoes are my favourite fruit." , locale: "american-to-british"})
            .end((err, res) => {
                assert.equal(JSON.stringify(res.body), JSON.stringify({"text":"Mangoes are my favourite fruit.","translation":"Everything looks good to me!"}))
                done()
            })
    })
    
    

});
