import {expect} from '../tests/test_helper'
import {testFunction, throwsError} from './index'

//You can't check side affects that throw with #async
//Not recommended as a result!
describe('#async', () => {
  it('Postive Testcase', async () => {
    const result = await testFunction() //passes
    expect(result).to.eq(true)
  })
  it('Negative testcase', async () => {
    expect(await throwsError()).to.be.rejectedWith(Error)//Error doesn't get caught or evaluated exits out of the it
  })
  it('Negative testcase', async () => {
    const result = await throwsError() //Throws an error and exits the exit - fails
    expect(result).to.throw() //Doesn't work
  })
  it('Negative attempt 2 testcase', async () => {
    expect(() => throwsError()).to.throw //Doesn't work as it doesn't wrap the promise and exits the it
  })
  it('Negative attempt 3 testcase', async () => {
    expect(async () => await throwsError()).to.throw //Doesn't work as it doesn't wrap the promise and exits the it
  })
  it('Negative attempt 4 testcase', async () => {
    await expect(async () => await throwsError()).to.throw //Doesn't work as it doesn't wrap the promise and exits the it
  })
})
//Not recommended
//You can't return multiple assertions within the same test case
//Relies on callback
//Doesn't allow you to chain assertions
describe('#Done', () => { //Doesn't allow multiple multiple async functions to be returned
  it('Positive test case', (done) => {
    expect(testFunction()).to.eventually.eq(true).notify(done) //passes
  })
  it('Positive test case', (done) => {
    expect(testFunction()).to.eventually.eq(false) //passes but shouldn't
    done()
  })
  it('negative test case', (done) => {
    expect(throwsError()).to.be.rejectedWith('Error') //passes but shouldn't
    done()
  })
  it('negative test case', (done) => {
    expect(throwsError()).to.be.rejectedWith(Error).notify(done) //passes
  })
  //Can't handle multiple promises
})
//Handles all use cases
//The ITs functions can consume promises but the base assertions can't so you need to use chai as promised e.g. rejectedWith, eventually, should etc.
//If you don't have the return the IT things it's testing functions and didn't have any errors raised by the assertions
//You need to return the expect so it returns a promise to mocha so it can interpret the promise as having been successful or not
//It's really easy to forget a return so I recommend that you always check your functions for pass/failures
describe('#Return', () => { //Preferred method
  it('Positive test case', () => {
    return expect(testFunction()).to.eventually.eq(true) //passes
  })
  it('Positive test case', () => {
    expect(testFunction()).to.eventually.eq(false) //passes when it shouldn't it requires the return. You see assertion failures come in the output but the test passes
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
