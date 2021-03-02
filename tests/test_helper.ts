import chaiAsPromised from 'chai-as-promised'
import _sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
export const sinon = _sinon
export const expect = chai.expect

chai.use(chaiAsPromised)
chai.use(sinonChai)

export const subject = beforeEach
export const subjectEach = beforeEach

afterEach(() => {
  sinon.restore()
})
