import fs from 'fs';
import { unlink } from 'node:fs/promises';
import path from 'path';
import Jimp from 'jimp';

export default class ImageService {
    private editedImagePath = './src/assets/edited-image.png';
    private white = Jimp.rgbaToInt(255, 255, 255, 255);
    private black = Jimp.rgbaToInt(0, 0, 0, 255);

  constructor(private imagePath: string) {}

  private async readImage() {
    return await Jimp.read(fs.readFileSync(path.join(this.imagePath)));
  }

  private async saveImage(image: any) {
    await image.writeAsync(path.join(this.editedImagePath));
  }

  private async increaseContrast(image: any): Promise<void> {
    const width = image.getWidth();
    const height = image.getHeight();

    for (let y = 0; y <= height; y++) {
      for (let x = 0; x <= width; x++) {
        const rgbValue = Jimp.intToRGBA(image.getPixelColor(x, y));
        if (rgbValue.b === 229) {
          image.setPixelColor(this.white, x, y);
        } else {
          image.setPixelColor(this.black, x, y);
        }
      }
    }

    await this.saveImage(image);
  }

  public async processImage(): Promise<string> {
    const image = await this.readImage();
    await this.increaseContrast(image);
    return this.editedImagePath;
  }

  public async deleteWorkImage() {
    await unlink(path.join(this.editedImagePath));
  }
}
