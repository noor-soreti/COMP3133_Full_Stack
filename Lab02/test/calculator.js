var calculate = require('../app/calculator')
var assert = require('assert')

describe('Calculate', () => {
    describe('Add', () => {
        it('should PASS with an output of 7', () => {
            assert.equal(calculate.add(5,2), 7);
        })
        it('should FAIL with an output of 7', () => {
            assert.equal(calculate.add(5,2), 8);
        })
    })

    describe('Subtract', () => {
        it('should PASS with an output of 3', () => {
            assert.equal(calculate.sub(5,2), 3);
        })
        it('should FAIL with an output of 3', () => {
            assert.equal(calculate.sub(5,2), 5);
        })
    })

    describe('Multiply', () => {
        it('should PASS with an output of 10', () => {
            assert.equal(calculate.mul(5,2), 10);
        })
        it('should FAIL with an output of 12', () => {
            assert.equal(calculate.mul(5,2), 12);
        })
    })

    describe('Divide', () => {
        it('should PASS with an output of 5', () => {
            assert.equal(calculate.div(10,2), 5);
        })
        it('should FAIL with an output of 2', () => {
            assert.equal(calculate.sub(10,2), 2);
        })
    })
})