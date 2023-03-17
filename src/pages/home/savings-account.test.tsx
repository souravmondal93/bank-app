import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import HomeLayout from '../../layouts/home';
import SavingsAccount, { SAVINGS_ACCOUNT_DATA } from '../../pages/home/savings-account';
import { MOCK_SAVINGS_ACCOUNT_DATA } from '../../../__mock__/savings-account.data';

describe('Savings Account Page', () => {
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
        query: SAVINGS_ACCOUNT_DATA,
      },
      result: MOCK_SAVINGS_ACCOUNT_DATA,
    },
  ];

  const setup = () => {
    return render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HomeLayout>
          <SavingsAccount />;
        </HomeLayout>
      </MockedProvider>
    );
  };

  it('Savings Account Page: should render balance, completed and scheduled transactions', async () => {
    const { getByText, findByText } = setup();

    await waitFor(() => findByText(/loading.../i));
    await waitFor(() => findByText(/your transactions/i))

    const transactionsText = getByText(/your transactions/i);
    const balance = getByText(/34523\.86/i)
    const wiseTransferText = getByText(/wise transfer/i)
    const salaryTransferText = getByText(/salary/i)
    const scheduledTransferText1 = getByText(/disney hotstar/i)
    const scheduledTransferText2 = getByText(/house rent/i)

    expect(transactionsText).toBeInTheDocument();
    expect(balance).toBeInTheDocument();
    expect(wiseTransferText).toBeInTheDocument();
    expect(salaryTransferText).toBeInTheDocument();
    expect(scheduledTransferText1).toBeInTheDocument();
    expect(scheduledTransferText2).toBeInTheDocument();
  });
});
