import { generatePosts } from '../../lib/dataGenerator';
import { fireEvent, render, waitFor } from '../../tests/setup';
import { Post } from '../../types/models';
import { PostModalForm } from './PostModalForm';

describe('Test PostModalForm component', () => {
  test('Should render nothing if modal is closed', () => {
    const { queryByRole } = render(<PostModalForm />, {
      providerProps: {
        postContextValues: {
          isCreateModalOpen: false,
        },
      },
    });

    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('Should render create post modal correctly', () => {
    const { getByLabelText, queryByText, getByText, getByRole } = render(
      <PostModalForm />,
      {
        providerProps: {
          postContextValues: {
            isCreateModalOpen: true,
          },
        },
      }
    );

    getByText(/Crea una publicación/i);

    // Check fields
    getByRole('textbox', { name: 'message' });
    getByRole('textbox', { name: 'location' });
    getByRole('combobox', { name: 'status' });

    // Check image field
    getByLabelText(/Acompaña tu mensaje con una imagen!/i);

    // Check if danger zone is not render
    expect(queryByText(/Zona peligrosa/i)).not.toBeInTheDocument();

    expect(
      queryByText(
        /Puedes eliminar tu publicación, podrás recupérarla en el futuro utilizando el selector de estatus./i
      )
    ).not.toBeInTheDocument();

    expect(queryByText(/Eliminar/i)).not.toBeInTheDocument();

    // Check modal buttons
    getByRole('button', { name: /Cancelar/i });
    getByRole('button', { name: /Crear/i });
  });

  test('Should render update post modal correctly (Post with image)', () => {
    const randomPost: Post = {
      ...generatePosts(undefined, 1, 1)[0],
      image: 'https://loremflickr.com/640/480/abstract',
    };

    const { queryByLabelText, getByAltText, getByText, getByRole } = render(
      <PostModalForm />,
      {
        providerProps: {
          postContextValues: {
            isCreateModalOpen: true,
            editPost: randomPost,
          },
        },
      }
    );

    // Check fields
    getByRole('textbox', { name: 'message' });
    getByRole('textbox', { name: 'location' });
    getByRole('combobox', { name: 'status' });

    // Check image field
    expect(
      queryByLabelText(/Acompaña tu mensaje con una imagen!/i)
    ).not.toBeInTheDocument();
    getByAltText('Post cover');

    // Check if danger zone is not render
    getByText(/Zona peligrosa/i);

    getByText(
      /Puedes eliminar tu publicación, podrás recupérarla en el futuro utilizando el selector de estatus./i
    );

    getByRole('button', { name: 'Eliminar' });

    // Check modal buttons
    getByRole('button', { name: /Cancelar/i });
    getByRole('button', { name: /Actualizar/i });
  });

  test('Should render update post modal correctly (Post without image)', () => {
    const randomPost: Post = {
      ...generatePosts(undefined, 1, 1)[0],
      image: '',
    };

    const { getByLabelText, queryByAltText, getByText, getByRole } = render(
      <PostModalForm />,
      {
        providerProps: {
          postContextValues: {
            isCreateModalOpen: true,
            editPost: randomPost,
          },
        },
      }
    );

    // Check fields
    getByRole('textbox', { name: 'message' });
    getByRole('textbox', { name: 'location' });
    getByRole('combobox', { name: 'status' });

    // Check image field
    getByLabelText(/Acompaña tu mensaje con una imagen!/i);
    expect(queryByAltText('Post cover')).not.toBeInTheDocument();

    // Check if danger zone is not render
    getByText(/Zona peligrosa/i);

    getByText(
      /Puedes eliminar tu publicación, podrás recupérarla en el futuro utilizando el selector de estatus./i
    );

    getByRole('button', { name: 'Eliminar' });

    // Check modal buttons
    getByRole('button', { name: /Cancelar/i });
    getByRole('button', { name: /Actualizar/i });
  });

  test('Should display errors in create post modal if fields are empty', async () => {
    const mockOnSubmit = jest.fn();
    const { getByText, getByRole } = render(
      <PostModalForm mockOnSubmit={mockOnSubmit} />,
      {
        providerProps: {
          postContextValues: {
            isCreateModalOpen: true,
          },
        },
      }
    );

    fireEvent.click(getByRole('button', { name: /Crear/i }));

    await waitFor(() => {
      getByText(/Debes ingresar un mensaje válido/i);
      getByText(/Debes ingresar una ubicación válida/i);
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });
});
