import fs from 'fs';
import { unlink } from 'node:fs/promises';
import path from 'path';
import Jimp from 'jimp';
import * as Tesseract from 'tesseract.js';

import Ocr from './ocr/ocr.service'

export default class Wundernutcracker {
  constructor(public path: string) {}

  private async readImage() {
    return await Jimp.read(fs.readFileSync(path.join(__dirname, this.path)));
  }

  private async saveImage(image: any) {
    await image.writeAsync(path.join(__dirname, '../assets/edited-image.png'));
  }

  private async deleteWorkImage() {
    await unlink(path.join(__dirname, '../assets/edited-image.png'));
  }

  private async increaseContrast(image: any): Promise<void> {
    const width = image.getWidth();
    const height = image.getHeight();

    const WHITE = Jimp.rgbaToInt(255, 255, 255, 255);
    const BLACK = Jimp.rgbaToInt(0, 0, 0, 255); 


    for (let y = 0; y <= height; y++) {
      for (let x = 0; x <= width; x++) {
        const rgbValue = Jimp.intToRGBA(image.getPixelColor(x, y));
        if (rgbValue.b === 229) {
          image.setPixelColor(WHITE, x, y);
        } else {
          image.setPixelColor(BLACK, x, y);
        }
      }
    }

    await this.saveImage(image);
  }



  async solveTheMystery() {
    const image = await this.readImage();

    await this.increaseContrast(image);
    const text = await Ocr.getTextFromImage('../../assets/edited-image.png')
    console.log('text', text);
    
  }
}
