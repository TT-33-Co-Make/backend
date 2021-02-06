const db = require('../../data/dbConfig')

const Users = require('../users/users-model')


beforeEach(async () => {
  await db('users').truncate()
  await db.seed.run()
})


const AddUser = { username: 'abigail', email: 'abigail@abigail.com',  password: '12345' }

const UpdateUser = { username: 'updateUser', email: 'abigail@abigail.com',  password: '12345' }


describe('users model', () => {
  it('get returns a list of all users in users table', async () => {
    const data = await Users.get()
    expect(data).toHaveLength(2)
  })
  it('getBy gets specific user object', async () => {
    const data = await Users.getBy({ username:'oscar' })
    expect(data).toHaveLength(1)
  })
  it('getBy gets specific user object', async () => {
    const data = await Users.getBy({ username:'oscar' })
    expect(data).toHaveLength(1)
  })
  it('getBy returns empty object when user with corresponding id does not exist', async () => {
    const data = await Users.getBy({ username:'Pikachu' })
    expect(data).toHaveLength(0)
  })
  it('getById returns info for user by that id', async () => {
    const data = await Users.getById(1)
    expect(data.id).toBe(1)
  })
  it('getById returns undefined when user with corresponding id does not exist', async () => {
    const data = await Users.getById(157)
    expect(data).toBe(undefined)
  })
  it('add creates new user', async () => {
    const data = await Users.add(AddUser)
    expect(data.id).toBe(3)
    expect([data]).toHaveLength(1)
  })
  it('update returns 1 when user with corresponding id was successfull updated', async () => {
    const data = await Users.update(1, UpdateUser)
    expect(data).toBe(1)
    const test = await Users.getById(1)
    expect(test.id).toBe(1)
  })
  it('update returns 0 when user with corresponding id does not exist', async () => {
    const data = await Users.update(157, UpdateUser)
    expect(data).toBe(0)
  })
  it('remove returns 1 when user specified is deleted', async () => {
    const data = await Users.remove(1)
    expect(data).toBe(1)
    const test = await Users.getById(1)
    expect(test).toBe(undefined)
  })
  it('remove returns 0 when user with corresponding id does not exist', async () => {
    const data = await Users.remove(157)
    expect(data).toBe(0)
  })
}) 