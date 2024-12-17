import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { useTaskAdd } from '@/hooks/useTaskAdd';
import { useCaptureImage } from '@/hooks/useCaptureImage';
import { useGetLocation } from '@/hooks/useGetLocation';
import { TaskForm } from './TaskForm';

jest.mock('@/hooks/useTaskAdd');
jest.mock('@/hooks/useCaptureImage');
jest.mock('@/hooks/useGetLocation');

describe('TaskForm', () => {
  const mockOnClose = jest.fn();
  const mockAddTask = jest.fn();
  const mockCaptureImage = jest.fn();
  const mockGetLocation = jest.fn();

  beforeEach(() => {
    (useTaskAdd as jest.Mock).mockReturnValue({ addTask: mockAddTask });
    (useCaptureImage as jest.Mock).mockReturnValue({
      image: null,
      setImage: jest.fn(),
      captureImage: mockCaptureImage,
    });
    (useGetLocation as jest.Mock).mockReturnValue({
      location: null,
      gettingLocation: false,
      setLocation: jest.fn(),
      getLocation: mockGetLocation,
    });
  });

  it('should render form fields and buttons', () => {
    render(<TaskForm show onClose={mockOnClose} />);
    expect(screen.getByPlaceholderText('Escribe el título de la tarea')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escribe una descripción')).toBeInTheDocument();
    expect(screen.getByText('Capturar Imagen')).toBeInTheDocument();
    expect(screen.getByText('Registrar Ubicación')).toBeInTheDocument();
    expect(screen.getByText('Agregar Tarea')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  it('should handle input changes', () => {
    render(<TaskForm show onClose={mockOnClose} />);
    fireEvent.change(screen.getByPlaceholderText('Escribe el título de la tarea'), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByPlaceholderText('Escribe una descripción'), {
      target: { value: 'Test Description' },
    });
    expect(screen.getByPlaceholderText('Escribe el título de la tarea').value).toBe('Test Task');
    expect(screen.getByPlaceholderText('Escribe una descripción').value).toBe('Test Description');
  });

  it('should show error message if validation fails', async () => {
    render(<TaskForm show onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Agregar Tarea'));
    await waitFor(() => {
      expect(screen.getByText('Título es obligatorio')).toBeInTheDocument(); // Assuming "Título es obligatorio" is the validation message
    });
  });

  it('should call addTask on form submission', async () => {
    render(<TaskForm show onClose={mockOnClose} />);
    fireEvent.change(screen.getByPlaceholderText('Escribe el título de la tarea'), {
      target: { value: 'Test Task' },
    });
    fireEvent.change(screen.getByPlaceholderText('Escribe una descripción'), {
      target: { value: 'Test Description' },
    });
    fireEvent.click(screen.getByText('Agregar Tarea'));
    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalledWith({
        title: 'Test Task',
        description: 'Test Description',
      });
    });
  });

  it('should close the modal when "Cancelar" is clicked', () => {
    render(<TaskForm show onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Cancelar'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
