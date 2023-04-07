import { fireEvent, render, waitFor } from '../../tests/setup';
import { RegisterPage } from './RegisterPage';

describe('Test Register page component', () => {
  test('Should render correctly', async () => {
    const { getByText, getByRole, getByLabelText } = render(<RegisterPage />);

    const nameInput = getByRole('textbox', { name: 'name' });
    const surnameInput = getByRole('textbox', { name: 'surname' });
    const usernameInput = getByRole('textbox', { name: 'username' });
    const avatarInput = getByLabelText(/Selecciona tu foto de perfil/i);
    const loginButton = getByText(/Entrar/i);
    const backButton = getByText(/Volver al feed/i);
    const signInLink = getByText(/Inicia sesión aquí/i);

    await waitFor(() => {
      expect(nameInput).toBeInTheDocument();
      expect(surnameInput).toBeInTheDocument();
      expect(usernameInput).toBeInTheDocument();
      expect(avatarInput).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
      expect(backButton).toBeInTheDocument();
      expect(signInLink).toBeInTheDocument();
    });
  });

  test('Should display errors if form is empty', async () => {
    const { getByText } = render(<RegisterPage />);

    fireEvent.click(getByText(/Entrar/i));

    await waitFor(() => {
      expect(getByText(/Debes ingresar un nombre válido/i)).toBeInTheDocument();

      expect(
        getByText(/Debes ingresar un apellido válido/i)
      ).toBeInTheDocument();

      expect(
        getByText(/Debes ingresar un nombre de usuario válido/i)
      ).toBeInTheDocument();
    });
  });

  test('Should display error if username is not valid', async () => {
    const { getByText, getByPlaceholderText } = render(<RegisterPage />);

    fireEvent.change(getByPlaceholderText(/john_doe23/i), {
      target: { value: 'Hello world' },
    });

    fireEvent.click(getByText(/Entrar/i));

    await waitFor(() => {
      expect(
        getByText(/Debes ingresar un nombre de usuario válido/i)
      ).toBeInTheDocument();
    });
  });

  test('Should send the form', async () => {
    const mockOnSubmit = jest.fn();
    const { getByText, getByRole } = render(
      <RegisterPage mockOnSubmit={mockOnSubmit} />
    );

    const nameInput = getByRole('textbox', { name: 'name' });
    const surnameInput = getByRole('textbox', { name: 'surname' });
    const usernameInput = getByRole('textbox', { name: 'username' });

    fireEvent.change(nameInput, {
      target: { value: 'John' },
    });

    fireEvent.change(surnameInput, {
      target: { value: 'Doe' },
    });

    fireEvent.change(usernameInput, {
      target: { value: 'john_doe23' },
    });

    fireEvent.click(getByText(/Entrar/i));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
