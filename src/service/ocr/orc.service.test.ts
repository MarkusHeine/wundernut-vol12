import Ocr from './ocr.service'

describe('Ocr service should word correctly', () => {
    it('should get the correct text from the test image', async() => {
        const text = await Ocr.getTextFromImage('./src/service/ocr/test-image.png')
        expect(text).toMatch('Using Matchers');
    })
})