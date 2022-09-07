import fs from 'fs';
import path from 'path';
import { Readable} from 'stream'
import Jimp from 'jimp';
import Wundernutcracker from './service/wundernutcracker.service';

/**
 * TODO: 
 *  - Correct Typing for image in Wundernutcracker class
 */


const decodeTheWunderNut = async () => {
    const cracker = new Wundernutcracker('../assets/parchment.png')

    await cracker.solveTheMystery();
}

decodeTheWunderNut();