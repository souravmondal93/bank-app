import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import HomeLayout from '../../layouts/home';
import ApplyCard, { DASHBOARD_DATA } from './apply-card.page';
import { MOCK_APPLY_PAGE_DATA } from '../../../__mock__/apply-page-data';

describe('Apply Card Page', () => {
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
      result: MOCK_APPLY_PAGE_DATA,
    },
  ];

  const setup = () => {
    return render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HomeLayout>
          <ApplyCard />;
        </HomeLayout>
      </MockedProvider>
    );
  };

  it('Apply Card Page: should render both card options', async () => {
    const { getByText, findByText } = setup();

    await waitFor(() => findByText(/loading.../i));

    const goldCardText = getByText(/gold card/i);
    const platinumCardText = getByText(/platinum card/i);

    expect(goldCardText).toBeInTheDocument();
    expect(platinumCardText).toBeInTheDocument();
  });

  it('Apply Card Page: should appropriate message when wrong card is selected', async () => {
    const { getByText, findByText, getByTestId } = setup();

    await waitFor(() => findByText(/loading.../i));

    const goldCardBtn = getByTestId('gold-card-btn');

    fireEvent.click(goldCardBtn);

    const cardDetailsText = getByText(/card details/i);

    expect(cardDetailsText).toBeInTheDocument();
  });

  it('Apply Card Page: should display congratulations message when right card is selected', async () => {
    const { getByText, findByText, getByTestId } = setup();

    await waitFor(() => findByText(/loading.../i));
    await waitFor(() => findByText(/platinum card/i));

    const platinumCardBtn = getByTestId('platinum-card-btn');

    fireEvent.click(platinumCardBtn);

    const cardDetailsText = getByText(/congrats/i);

    expect(cardDetailsText).toBeInTheDocument();
  });
});
