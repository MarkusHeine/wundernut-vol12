import { describe, expect } from '@jest/globals';
import ImageService from './image.service';
import fs from 'fs';
import resemble from 'resemblejs'


describe('Image Service should work correcty', () => {
  const imageService = new ImageService('./src/service/image/test-image.png');

  it('Image service is correctly instantiated', () => {
    expect(imageService).toBeInstanceOf(ImageService);
  });

  it('Edited test image is saved correctly', async () => {
    await imageService.processImage();
    expect(fs.existsSync('./src/assets/edited-image.png')).toBeTruthy();
  });

  it('should process image correctly', () => {
    const processedImage = fs.readFileSync('./src/assets/edited-image.png');
    const testImage = fs.readFileSync('./src/service/image/edited-test-image.png')

    resemble(processedImage).compareTo(testImage).onComplete(data => {
      expect(data.isSameDimensions).toBeTruthy()
      expect(data.rawMisMatchPercentage).toBe('0.00')
    })
  })

  it('Edited Image is deleted', async () => {
    await imageService.deleteWorkImage();
    expect(fs.existsSync('./src/assets/edited-image.png')).toBeFalsy();
  });

});
