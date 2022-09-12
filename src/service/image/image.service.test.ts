import { describe, expect } from '@jest/globals';
import ImageService from './image.service';
import fs from 'fs';

describe('Image Service should work correcty', () => {
  const imageService = new ImageService('./src/assets/test-image.png');

  it('Image service is correctly instantiated', () => {
    expect(imageService).toBeInstanceOf(ImageService);
  });

  it('Edited test image is saved correctly', async () => {
    await imageService.processImage();
    expect(fs.existsSync('./src/assets/edited-image.png')).toBeTruthy();
  });

  it('Edited Image is deleted', async () => {
    await imageService.deleteWorkImage();
    expect(fs.existsSync('./src/assets/edited-image.png')).toBeFalsy();
  });
});
