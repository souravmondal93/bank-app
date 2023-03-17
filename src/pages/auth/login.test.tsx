import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import mockRouter from 'next-router-mock';

import AuthLayout from '../../layouts/auth';
import Login, { LOGIN_USER } from './login.page';

describe('Login Page', () => {
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
        query: LOGIN_USER,
        variables: {
          loginUserInput: {
            email: 'abc.abc@email.com',
            password: 'password',
          },
        },
      },
      result: {
        data: {
          loginUser: {
            access_token: 'access_token',
          },
        },
      },
    },
  ];

  const setup = () => {
    return render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthLayout>
          <Login />;
        </AuthLayout>
      </MockedProvider>
    );
  };

  it('Login Page: should render entire page', () => {
    const { getByText, getByRole, getByLabelText, getByTestId } = setup();

    // screen.logTestingPlaygroundURL();

    const name = getByText(/the vision bank/i);
    const welcome = getByRole('heading', {
      name: /welcome! nice to see you!/i,
    });
    const footer = getByText(/© 2023\./i);
    const emailInput = getByRole('textbox', {
      name: /email/i,
    });
    const passwordInput = getByLabelText(/password/i);
    const signInBtn = getByTestId('sign-in-submit');
    const signUpBtn = getByRole('button', {
      name: /sign up/i,
    });
    const freeAccountBtn = getByRole('button', {
      name: /free account/i,
    });

    expect(name).toBeInTheDocument();
    expect(welcome).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInBtn).toBeInTheDocument();
    expect(signUpBtn).toBeInTheDocument();
    expect(freeAccountBtn).toBeInTheDocument();
  });

  it('Login Page: should render error message when Sign In button is clicked without entering any values', async () => {
    const { getByText, getByTestId } = setup();

    const signInBtn = getByTestId('sign-in-submit');

    fireEvent.click(signInBtn);

    await waitFor(() => getByText(/email is required/i));

    const emailError = getByText(/email is required/i);
    const passwordError = getByText(/password is required/i);

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  it('Login Page: should allow user to login when valid credentials are entered', async () => {
    const { getByLabelText, getByTestId, getByRole, findByText } = setup();

    mockRouter.push('/auth/login');

    const signInBtn = getByTestId('sign-in-submit');
    const emailField = getByRole('textbox', { name: /email/i });
    const passwordField = getByLabelText(/password/i);

    fireEvent.change(emailField, { target: { value: 'abc.abc@email.com' } });
    expect(emailField.value).toBe('abc.abc@email.com');

    fireEvent.change(passwordField, { target: { value: 'password' } });
    expect(passwordField.value).toBe('password');

    fireEvent.click(signInBtn);

    await waitFor(() => findByText(/loading.../i));
    await waitFor(() => expect(signInBtn).toHaveTextContent(/sign in/i));

    expect(mockRouter).toMatchObject({
      asPath: '/home/dashboard',
      pathname: '/home/dashboard',
      query: {},
    });
  });
});
