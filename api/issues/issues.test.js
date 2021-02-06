const db = require('../../data/dbConfig')

const Issues = require('./issues-model')
const Votes = require('../actions/votes-model')

// beforeAll(async () => {
//   await db.migrate.rollback()
//   await db.migrate.latest()
// })
beforeEach(async () => {
  await db('issues').truncate()
  await db.seed.run()
})
// afterAll(async () => {
//   await db.destroy()
// })

const AddIssue = { title: 'testissue1', description: 'testissue1 description', user_id: 2 }

const UpdateIssue = { title: 'testissueupdate1', description: 'testissueupdate1 description', user_id: 2 }

describe('issues model', () => {
  it('getAll gets all issues in list', async () => {
    const data = await Issues.getAll()
    expect(data).toHaveLength(2)
  })
  it('getBy returns undefined when there is no corresponding user_id', async () => {
    const data = await Issues.getBy(157)
    expect(data).toBe(undefined)
  })
  it('getBy gets issue by user_id', async () => {
    const data = await Issues.getBy(1)    
    expect(data.user_id).toBe(1)
    expect([data]).toHaveLength(1)
  })
  it('getById returns undefined when there is no issue with corresponding id', async () => {
    const data = await Issues.getById(157)
    expect(data).toBe(undefined)
  })
  it('getById gets issue by id', async () => {
    const data = await Issues.getById(2)
    expect(data.user_id).toBe(2)
  })
  it('add inserts new issue into issues table', async () => {
    const data = await Issues.add(AddIssue)
    expect([data]).toHaveLength(1)
    const test = await Issues.getById(3)
    expect(test).toMatchObject(AddIssue)
  })
  it('update edits issue in issues table', async () => {
    const data = await Issues.update(1, UpdateIssue)
    expect(data).toBe(1)
    const test = await Issues.getById(1)
    expect(test).toMatchObject(UpdateIssue)
  })
  it('update fails to edit issue in issues table when no issue with corresponding id exists', async () => {
    const data = await Issues.update(157, UpdateIssue)
    expect(data).toBe(0)
  })
  it('remove deletes issue from issues table', async () => {
    const data = await Issues.remove(1)
    expect(data).toBe(1)
    const test = await Issues.getAll()
    expect(test).toHaveLength(1)
  })
  it('remove fails to delete issue in issues table when no issue with corresponding id exists', async () => {
    const data = await Issues.remove(100)
    expect(data).toBe(0)
    const test = await Issues.getAll()
    expect(test).toHaveLength(2)
  })
})