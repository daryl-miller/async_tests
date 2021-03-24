import {expect, sinon} from './test_helper'
import {testFunction, throwsError, deleteUser} from '../src/index'
import * as dbModule from '../src/stub'

//Pros:
// Can test side effects
// Low chance of a test passing when it shouldn't
//Cons: Can't test async functions that  throw
describe('#async', () => {
  it('Postive Testcase', async () => {
    const result = await testFunction() //passes
    expect(result).to.eq(true)
  })
  it('Tests side effects', async () => { //passess
    //Setup
    const userIdStub = 'stub-id'
    const username = 'aUsername'
    const expected = 'deletedStub'
    const deleteUserFromDbStub = sinon.stub(dbModule, 'findUser').resolves(userIdStub)
    const findUserStub = sinon.stub(dbModule, 'deleteUserFromDB').resolves(expected)

    //Act
    const result = await deleteUser(username)

    //Assert
    expect(deleteUserFromDbStub).to.have.been.calledWith(username)
    expect(findUserStub).to.have.been.calledWith(userIdStub)
    expect(result).eq(expected)

  })
  it('Negative testcase', async () => {
    expect(async () => await throwsError()).to.throw(Error)//Error doesn't get caught or evaluated. It exits out of the IT
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
//Pros: You get to use call backs
//Cons:
// You get to use call backs
// Can fail silently
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

  it('negative test case', (done) => {
    expect(testFunction()).to.eventually.eq(false)  //Isn't evaluated
    expect(throwsError()).to.be.rejectedWith(Error).notify(done) //passes
  })
  //Can't handle multiple promises
})
//Pros: assertions are promise aware
//Cons:
// Tests can fail silently
// Requires promise.all to wrap assertions
describe('#Return', () => {
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
  it('Tests side effects', () => {
    //Doesn't work. The stubs aren't promises so they can't be wrapped by chai properly.
    //So they get immediately evaluated before the promise resolves.

    //Setup
    const userIdStub = 'stub-id'
    const username = 'aUsername'
    const expected = 'deletedStub'
    const deleteUserFromDbStub = sinon.stub(dbModule, 'findUser').resolves(userIdStub)
    const findUserStub = sinon.stub(dbModule, 'deleteUserFromDB').resolves(expected)

    //Act

    //Assert
    return Promise.all([
      expect(deleteUser(username)).eventually.eq(expected),
      expect(deleteUserFromDbStub).to.have.been.calledWith(username),
      expect(findUserStub).to.have.been.calledWith(userIdStub)
    ])
  })
})
