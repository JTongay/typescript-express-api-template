import { fileFilter } from '@/services/upload';
import 'jest';

describe('Upload Service', () => {
  const req = {};
  const cb = jest.fn();

  it('should check if the format is valid', () => {
    const file = {
      originalname: '.zip',
    };

    fileFilter(req, file, cb);

    expect(cb).toBeCalledWith(undefined, true);
  });

  it('should check if the format is invalid', () => {
    const file = {
      originalname: '.html',
    };

    fileFilter(req, file, cb);

    expect(cb).toBeCalledWith(new Error('File format not allowed!'), false);
  });
});
