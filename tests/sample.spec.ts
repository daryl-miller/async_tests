import {expect} from './test_helper'
import {testFunction, throwsError} from '../src/index'

//You can't check side affects that throw with #async
//Not recommended as a result!
describe('#async', () => {
  it('Postive Testcase', async () => {
    const result = await testFunction() //passes
    expect(result).to.eq(true)
  })
  it('Negative testcase', async () => {
    expect(await throwsError()).to.be.rejectedWith(Error)//Error doesn't get caught or evaluated. It exits out of the IT
  })
  it('Negative testcase', async () => {
    const result = await throwsError() //Error doesn't get caught or evaluated. It exits out of the IT
    expect(result).to.throw()
  })
  it('Negative attempt 2 testcase', async () => {
    expect(() => throwsError()).to.throw //Doesn't work as it doesn't wrap the promise, so it just throws and doesn't get evaluated and exits the IT
  })
  it('Negative attempt 3 testcase', async () => {
    expect(async () => await throwsError()).to.throw //Doesn't work as it doesn't wrap the promise, so it just throws and doesn't get evaluated and exits the IT
  })
  it('Negative attempt 4 testcase', async () => {
    await expect(async () => await throwsError()).to.throw //Doesn't work as it doesn't wrap the promise, so it just throws and doesn't get evaluated and exits the IT
  })
})
//Not recommended
//You can't return multiple assertions within the same test case
//Relies on callback
//Doesn't allow you to chain assertions
describe('#Done', () => {
  it('Positive test case', (done) => {
    expect(testFunction()).to.eventually.eq(true).notify(done) //passes
  })
  it('Positive test case', (done) => {
    expect(testFunction()).to.eventually.eq(false) //passes but doesn't return evaluated the assertion. You will see errors in the test runner though but it exits as a pass
    done()
  })
  it('negative test case', (done) => {
    expect(throwsError()).to.be.rejectedWith('Error') //passes but doesn't return evaluated the assertion. You will see errors in the test runner though but it exits as a pass
    done()
  })
  it('negative test case', (done) => {
    expect(throwsError()).to.be.rejectedWith(Error).notify(done) //passes
  })
  //Can't handle multiple promises
})
//Handles all use cases
//The ITs functions can consume promises but the base assertions can't so you need to use chai as promised e.g. rejectedWith, eventually, should etc.
//If you don't have the return the IT thinks it's testing functions and doesn't have any errors raised by the assertions
//The return passes the assertion promise to the IT which gets evaluated if the assertion passed or not
//It's really easy to forget a return so I recommend that you always check your functions for pass/failures
describe('#Return', () => { //Preferred method
  it('Positive test case', () => {
    return expect(testFunction()).to.eventually.eq(true) //passes
  })
  it('Positive test case', () => {
    expect(testFunction()).to.eventually.eq(false) //passes but doesn't return evaluated the assertion. You will see errors in the test runner though but it exits as a pass
  })
  it('negative test case', () => {
    return expect(throwsError()).to.be.rejectedWith(Error) //passes
  })
  it('both test cases', () => {
    return Promise.all([ //passes
      expect(testFunction()).to.eventually.eq(true),
      expect(throwsError()).to.be.rejectedWith(Error),
    ])
  })
})
