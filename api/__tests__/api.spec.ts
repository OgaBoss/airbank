const url = `http://localhost:4000/`;
const request = require('supertest')(url);

describe('Api Integration Test', () => {
  it('returns 5 transactions', async () => {
    const response = await request.post('/')
      .send({
        query: "query Query($skip: Int, $take: Int, $start: String, $end: String) { transactions(skip: $skip, take: $take, start: $start, end: $end) { id transactionDisplayDate status amount currency account __typename }}",
        variables: {
          end:	null,
          skip:	0,
          start:	null,
          take:	5,
        }
      })
    const {data} = response.body
    expect(data.transactions.length).toBe(5)
  })

  it('returns transaction by ID', async () => {
    const response = await request.post('/')
      .send({
        query: "query Query($id: String!) { transaction(id: $id) { ... on Transaction { id transactionDisplayDate status amount currency account __typename} ... on TransactionError {message} }}",
        variables: {
          id:	"0031e2cb-8b14-4ca7-9b7a-ad46c923a3cc",
        }
      })
    const { data } = response.body
    expect(data.transaction.id).toEqual("0031e2cb-8b14-4ca7-9b7a-ad46c923a3cc")
  })

  it('returns error message when id does not exit', async () => {
    const response = await request.post('/')
      .send({
        query: "query Query($id: String!) { transaction(id: $id) { ... on Transaction { id transactionDisplayDate status amount currency account __typename} ... on TransactionError {message} }}",
        variables: {
          id:	"xyz",
        }
      })
    const { data } = response.body
    expect(data.transaction.message).toEqual("Transaction of id xyz does not exits in our system")
  })
})
