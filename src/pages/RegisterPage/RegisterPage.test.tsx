import { fireEvent, render, waitFor } from '../../tests/setup';
import userEvent from '@testing-library/user-event';
import { RegisterPage } from './RegisterPage';

describe('Test Register page component', () => {
  test('Should render correctly', () => {
    const { getByText, getByRole, getByLabelText } = render(<RegisterPage />);

    getByRole('textbox', { name: 'name' });
    getByRole('textbox', { name: 'surname' });
    getByRole('textbox', { name: 'username' });
    getByLabelText(/Selecciona tu foto de perfil/i);
    getByText(/Entrar/i);
    getByText(/Volver al feed/i);
    getByText(/Inicia sesión aquí/i);
  });

  test('Should display errors if form is empty', async () => {
    const mockOnSubmit = jest.fn();
    const { getByText } = render(<RegisterPage mockOnSubmit={mockOnSubmit} />);

    fireEvent.click(getByText(/Entrar/i));

    await waitFor(() => {
      getByText(/Debes ingresar un nombre válido/i);
      getByText(/Debes ingresar un apellido válido/i);
      getByText(/Debes ingresar un nombre de usuario válido/i);
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  test('Should display error if username is not valid', async () => {
    const { getByText, getByPlaceholderText } = render(<RegisterPage />);

    fireEvent.change(getByPlaceholderText(/john_doe23/i), {
      target: { value: 'Hello world' },
    });

    fireEvent.click(getByText(/Entrar/i));

    await waitFor(() => {
      getByText(/Debes ingresar un nombre de usuario válido/i);
    });
  });

  test('Should upload an avatar', async () => {
    const { getByLabelText, getByAltText } = render(<RegisterPage />);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    const fileInput = getByLabelText(/Selecciona tu foto de perfil/i);

    await userEvent.upload(fileInput, file);

    getByAltText(/User avatar/i);
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
