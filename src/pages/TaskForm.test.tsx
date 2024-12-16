import { render, fireEvent, waitFor } from '@testing-library/react';
import { Camera, Photo } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { TaskForm } from './TaskForm';

jest.mock('@capacitor/camera', () => ({
  Camera: {
    getPhoto: jest.fn(),
  },
}));

jest.mock('@capacitor/geolocation', () => ({
  Geolocation: {
    getCurrentPosition: jest.fn(),
  },
}));

describe('TaskForm', () => {
  it('debería capturar una imagen y obtener la geolocalización al hacer clic en el botón', async () => {
    const getPhotoMock = jest.spyOn(Camera, 'getPhoto').mockResolvedValueOnce({
      dataUrl: 'fake-image-url',
      format: 'jpeg',
      saved: true,
    } as Photo);

    const getCurrentPositionMock = jest.spyOn(Geolocation, 'getCurrentPosition').mockResolvedValueOnce({
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
        accuracy: 100,
      },
    });

    const { getByText, getByAltText } = render(<TaskForm addTask={() => {}} />);

    fireEvent.click(getByText(/Capturar Imagen/i));

    await waitFor(() => expect(getPhotoMock).toHaveBeenCalled());

    expect(getByAltText('Captura de imagen')).toHaveAttribute('src', 'fake-image-url');

    fireEvent.click(getByText(/Obtener Ubicación/i));

    await waitFor(() => expect(getCurrentPositionMock).toHaveBeenCalled());

    expect(getCurrentPositionMock).toHaveBeenCalledWith();
    expect(getCurrentPositionMock).toHaveReturnedWith(
      expect.objectContaining({
        coords: expect.objectContaining({
          latitude: expect.any(Number),
          longitude: expect.any(Number),
        }),
      }),
    );
  });
});
