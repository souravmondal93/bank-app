import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import HomeLayout from '../../layouts/home';
import CreditCard from '../../pages/home/credit-card.page';
import { CREDIT_CARD_DATA } from '@/graphql/query/credit-card.query';
import { MOCK_CREDIT_CARD_DATA } from '../../../__mock__/credit-card.data';


describe('Credit Card Page', () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            value: 'Testing something!',
          }),
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  const mocks = [
    {
      request: {
        query: CREDIT_CARD_DATA,
      },
      result: MOCK_CREDIT_CARD_DATA,
    },
  ];

  const setup = () => {
    return render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HomeLayout>
          <CreditCard />;
        </HomeLayout>
      </MockedProvider>
    );
  };

  it('Credit Card Page: should render balance, completed and scheduled transactions', async () => {
    const { getByText, findByText } = setup();

    await waitFor(() => findByText(/loading.../i));
    await waitFor(() => findByText(/credit balance/i))

    const transactionsText = getByText(/your transactions/i);
    const balance = getByText(/42845.98/i)
    const transferText1 = getByText(/payment insurance/i)
    const transferText2 = getByText(/amazon/i)
    const transferText3 = getByText(/payment feb/i)

    expect(transactionsText).toBeInTheDocument();
    expect(balance).toBeInTheDocument();
    expect(transferText1).toBeInTheDocument();
    expect(transferText2).toBeInTheDocument();
    expect(transferText3).toBeInTheDocument();
  });
});
