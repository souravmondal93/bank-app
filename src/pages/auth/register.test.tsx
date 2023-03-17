import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import mockRouter from 'next-router-mock';

import AuthLayout from '../../layouts/auth';
import Register, { REGISTER_USER } from '../../pages/auth/register.page';

describe('Register Page', () => {
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
        query: REGISTER_USER,
        variables: {
          createUserInput: {
            address: 'address',
            email: 'email.email@email.com',
            firstName: 'first',
            income: 1000000,
            lastName: 'last',
            occupation: 'employee',
            pan: 'ABCDE1234F',
            password: 'P@ssw0rd',
            phone: '1111111111',
          },
        },
      },
      result: {
        data: {
          createUser: {
            _id: '123',
            firstName: 'first',
            lastName: 'last',
            email: 'email.email@email.com',
            address: 'address',
            occupation: 'employee',
            income: 1000000,
            pan: 'ABCDE1234F',
            phone: '1111111111',
            newUser: true,
          },
        },
      },
    },
  ];

  const setup = () => {
    return render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthLayout>
          <Register />;
        </AuthLayout>
      </MockedProvider>
    );
  };

  it('Register Page: should render entire page', () => {
    const { getByText, getByTestId } = setup();

    const name = getByText(/the vision bank/i);
    const footer = getByText(/© 2023\./i);
    const registerBtn = getByTestId('register-button');
    const firstNameInput = getByTestId('first-name-input');
    const lastNameInput = getByTestId('last-name-input');
    const emailInput = getByTestId('email-input');
    const addressInput = getByTestId('address-input');
    const contactNumberInput = getByTestId('contact-number-input');
    const occupationInput = getByTestId('occupation-input');
    const incomeInput = getByTestId('income-input');
    const panInput = getByTestId('pan-input');
    const passwordInput = getByTestId('password-input');
    const confirmPasswordInput = getByTestId('confirm-password-input');

    expect(name).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(contactNumberInput).toBeInTheDocument();
    expect(occupationInput).toBeInTheDocument();
    expect(incomeInput).toBeInTheDocument();
    expect(panInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  it('Register Page: should render error message when Sign In button is clicked without entering any values', async () => {
    const { getByText, getByTestId } = setup();

    const registerBtn = getByTestId('register-button');

    fireEvent.click(registerBtn);

    await waitFor(() => getByText(/email is required/i));

    const firstNameError = getByText(/first name is required/i);
    const lastNameError = getByText(/last name is required/i);
    const emailError = getByText(/email is required/i);
    const addressError = getByText(/valid address is required/i);
    const phoneError = getByText(/phone is required/i);
    const occupationError = getByText(/occupation is required/i);
    const panError = getByText(/pan details is required/i);
    const passwordError = getByText(
      /password should be at least 8 characters long/i
    );

    expect(firstNameError).toBeInTheDocument();
    expect(lastNameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(addressError).toBeInTheDocument();
    expect(phoneError).toBeInTheDocument();
    expect(occupationError).toBeInTheDocument();
    expect(panError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  it('Register Page: should allow user to register when valid details are entered', async () => {
    const { getByText, getByTestId, getByRole, findByText } = setup();

    const registerBtn = getByTestId('register-button');
    const firstNameInput = getByTestId('first-name-input');
    const lastNameInput = getByTestId('last-name-input');
    const emailInput = getByTestId('email-input');
    const addressInput = getByTestId('address-input');
    const contactNumberInput = getByTestId('contact-number-input');
    const occupationInput = getByTestId('occupation-input');
    const incomeInput = getByTestId('income-input');
    const panInput = getByTestId('pan-input');
    const passwordInput = getByTestId('password-input');
    const confirmPasswordInput = getByTestId('confirm-password-input');

    fireEvent.change(firstNameInput, { target: { value: 'first' } });
    expect(firstNameInput.value).toBe('first');

    fireEvent.change(lastNameInput, { target: { value: 'last' } });
    expect(lastNameInput.value).toBe('last');

    fireEvent.change(emailInput, {
      target: { value: 'email.email@email.com' },
    });
    expect(emailInput.value).toBe('email.email@email.com');

    fireEvent.change(addressInput, { target: { value: 'address' } });
    expect(addressInput.value).toBe('address');

    fireEvent.change(contactNumberInput, { target: { value: '1111111111' } });
    expect(contactNumberInput.value).toBe('1111111111');

    fireEvent.change(occupationInput, { target: { value: 'employee' } });
    expect(occupationInput.value).toBe('employee');

    fireEvent.change(incomeInput, { target: { value: '1000000' } });
    expect(incomeInput.value).toBe('1000000');

    fireEvent.change(panInput, { target: { value: 'ABCDE1234F' } });
    expect(panInput.value).toBe('ABCDE1234F');

    fireEvent.change(passwordInput, { target: { value: 'P@ssw0rd' } });
    expect(passwordInput.value).toBe('P@ssw0rd');

    fireEvent.change(confirmPasswordInput, { target: { value: 'P@ssw0rd' } });
    expect(confirmPasswordInput.value).toBe('P@ssw0rd');

    fireEvent.click(registerBtn);

    await waitFor(() => findByText(/loading.../i));
    await waitFor(() => findByText(/congratulations/i));

    const goToBtn = getByRole('button', { name: /go to login page/i });
    const accountCreationText = getByText(/your account is successfully created\. please login to start using your account\./i)
    expect(goToBtn).toBeInTheDocument();
    expect(accountCreationText).toBeInTheDocument();
  });
});
