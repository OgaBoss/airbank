export const mockData = [
  {
    id: "0031e2cb-8b14-4ca7-9b7a-ad46c923a3cc",
    account: "FR Bills",
    amount: 57,
    reference: "Ref 580",
  },
  {
    id: "00647231-5bbb-4656-9960-56fbd5e01276",
    account: "Household",
    amount: 100,
    reference: "Ref 3190",
  },
];

export function createProvider(options = {}) {
  return {
    defaultClient: {
      query: jest.fn((args) => {
        if (args.variables.id) {
          return { data: { transaction: mockData[0] } };
        }
        return { data: { transactions: mockData } };
      }),
    },
  };
}
