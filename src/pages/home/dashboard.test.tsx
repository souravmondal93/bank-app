import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import HomeLayout from '../../layouts/home';
import Dashboard from '../../pages/home/dashboard.page';
import { DASHBOARD_DATA } from '@/graphql/query/dashboard.query';
import { MOCK_DASHBOARD_DATA } from '../../../__mock__/dashboard-data';

describe('Dashboard Page', () => {
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
        query: DASHBOARD_DATA,
      },
      result: MOCK_DASHBOARD_DATA,
    },
  ];

  const setup = () => {
    return render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HomeLayout>
          <Dashboard />;
        </HomeLayout>
      </MockedProvider>
    );
  };

  it('Dashboard Page: should render all different widgets', async () => {
    const { getByText, findByText } = setup();

    await waitFor(() => findByText(/loading.../i));

    const startingBalanceText = getByText(/starting balance/i);
    const startingBalanceValue = getByText(/£5376\.26/i);
    const totalMoneyInText = getByText(/total money in/i);
    const totalMoneyInValue = getByText(/£245\.06/i);
    const totalMoneyOutText = getByText(/total money out/i);
    const totalMoneyOutValue = getByText(/£423\.87/i);
    const leftToSpendText = getByText(/left to spend/i);
    const leftToSpendValue = getByText(/£577\.13/i);
    const welcomeText = getByText(/welcome back,/i);
    const customerName = getByText(/sender user/i);
    const balance = getByText(/£34523\.86/i);
    const shoppingText = getByText(/shopping/i);
    const shoppingValue = getByText(/£233\.32/i);
    const groceriesText = getByText(/groceries/i);
    const groceriesValue = getByText(/£153\.86/i);
    const billsText = getByText(/bills/i);
    const billsValue = getByText(/£123\.43/i);
    const miscText = getByText(/misc/i);
    const miscValue = getByText(/£45\.23/i);

    expect(startingBalanceText).toBeInTheDocument();
    expect(startingBalanceValue).toBeInTheDocument();
    expect(totalMoneyInText).toBeInTheDocument();
    expect(totalMoneyInValue).toBeInTheDocument();
    expect(totalMoneyOutText).toBeInTheDocument();
    expect(totalMoneyOutValue).toBeInTheDocument();
    expect(leftToSpendText).toBeInTheDocument();
    expect(leftToSpendValue).toBeInTheDocument();
    expect(welcomeText).toBeInTheDocument();
    expect(customerName).toBeInTheDocument();
    expect(balance).toBeInTheDocument();
    expect(shoppingText).toBeInTheDocument();
    expect(shoppingValue).toBeInTheDocument();
    expect(groceriesText).toBeInTheDocument();
    expect(groceriesValue).toBeInTheDocument();
    expect(billsText).toBeInTheDocument();
    expect(billsValue).toBeInTheDocument();
    expect(miscText).toBeInTheDocument();
    expect(miscValue).toBeInTheDocument();
  });
});
