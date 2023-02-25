require('jest-fetch-mock').enableMocks();
jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    GRAPHQL_API_URL: 'http://localhost:3000/graphql',
  },
}));