import ImageService from './service/image/image.service';
import Ocr from './service/ocr/ocr.service';
import { caesar } from '@easy-cipher/caesar'
import TextService from './service/text/text.service';

const decodeTheWunderNut = async (): Promise<string> => {
    const imageService = new ImageService('./src/assets/parchment.png');
    const textService = new TextService();
    const editedImagePath = await imageService.processImage();

    const textFromImage = await Ocr.getTextFromImage(editedImagePath)
    await imageService.deleteWorkImage()

    const { decode } = caesar({ encryptionOffset: -5 })
    const decodedText = decode(textFromImage.toLowerCase().replace(/(\r\n|\n|\r)/gm, ""))
    const processedText = await textService.processText(decodedText)
    
    console.log('these are the spells', processedText);
    

    return processedText;
}

decodeTheWunderNut();
