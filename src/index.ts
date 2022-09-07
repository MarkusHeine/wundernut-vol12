import ImageService from './service/image/image.service';
import Ocr from './service/ocr/ocr.service';

/**
 * TODO: 
 *  - Correct Typing for image in Wundernutcracker class
 */


const decodeTheWunderNut = async () => {
    const imageService = new ImageService('./src/assets/parchment.png')
    const editedImagePath = await imageService.processImage();

    const textFromImage = await Ocr.getTextFromImage(editedImagePath)
    console.log('textFromImage', textFromImage);

    await imageService.deleteWorkImage()
}

decodeTheWunderNut();