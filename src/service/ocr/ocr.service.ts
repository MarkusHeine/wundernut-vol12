import path from 'path';
import * as Tesseract from 'tesseract.js';

export default class Ocr {
    static async getTextFromImage(imagePath: string): Promise<string> {
        const nodeImagePath = path.resolve(imagePath);
    
        const worker = Tesseract.createWorker();
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({preserve_interword_spaces: "1"})
        const { data } = await worker.recognize(nodeImagePath);
        await worker.terminate();

        return data.text;
      } 
}