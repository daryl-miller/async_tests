import {expect, sinon} from './test_helper'
import {addAandB, deleteUser} from '../src/index'
import * as dbModule from '../src/stub'

describe('#State Unit Test', () => {
  describe('#addAandB', () => {
    it('Adds 2 and 3 and returns 5', () => {
    //Setup
      const a = 2
      const b = 3
      const expected = 5

      //Act
      const result = addAandB(a, b)

      //Assert
      expect(result).eq(expected)
    })
  })

})

describe('#Behavioral Unit Test', () => {
  describe('#DeleteUser', () => {
    it('User should be deleted when a username is supplied', async () => {
      //Setup
      const userIdStub = 'stub-id'
      const username = 'aUsername'
      const expected = 'deletedStub'
      const findsAnAdminUserStub = sinon.stub(dbModule, 'findUser').resolves(userIdStub)
      const deleteUserFromDbStub = sinon.stub(dbModule, 'deleteUserFromDB').resolves(expected)

      //Act
      const result = await deleteUser(username)

      //Assert
      expect(findsAnAdminUserStub).to.have.been.calledWith(username)

      expect(deleteUserFromDbStub).to.have.been.calledWith(userIdStub)
      expect(result).eq(expected)
    })

    it('should return void if no username is supplied', async () => {
      //Setup
      const username = undefined
      const expected = undefined
      const deleteUserFromDbStub = sinon.stub(dbModule, 'findUser')
      const findUserStub = sinon.stub(dbModule, 'deleteUserFromDB')

      //Act
      const result = await deleteUser(username)

      //Assert
      expect(deleteUserFromDbStub).to.not.have.been.called
      expect(findUserStub).to.not.have.been.called
      expect(result).eq(expected)
    })
  })
})

