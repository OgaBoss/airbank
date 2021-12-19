export function createProvider(options = {}) {
  return {
    defaultClient: {
      query: jest.fn()
    }
  }
}
