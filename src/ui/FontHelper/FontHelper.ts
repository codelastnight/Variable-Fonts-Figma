
import fontkit from 'fontkit';
import * as dataHelper from './dataHelper';
import { isNullOrUndefined } from 'util';
import { VariationFont } from '../../../variationFont';
//const _VariableFont: any = VariableFont;

const allowDrop = (event: DragEvent) => {
    event.preventDefault();
}

const drag = (event: DragEvent) => {
    //event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.dropEffect = 'copy';
}




/** 
 * generates a random ID up to 9 characters long. 
 * from https://gist.github.com/gordonbrander/2230317
 */
const ID =  () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

/**
 *  parse a base64 url into a font object
 * @param dataUrl base64 string dataurl
 */
export const parseFont = (dataUrl:string): VariationFont => {
    try {
        const vf = fontkit.create(Buffer.from(dataHelper.convertDataURIToBinary(dataUrl))) as VariationFont
        return vf
    } catch (err) {
        console.log(err)
        return undefined
    }
}


/**
 * save font into client storage if valid
 * @param files html5 files data
 */
export const loadSavefont = (files: FileList) => {
    for (var i=0, file: File; file=files[i]; i++) {
        var reader: FileReader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = (ev) => {
            // create variable opentype font once file is read
            try {
                const fontBuffer = ev.target.result as string;

                const vf= parseFont(fontBuffer)
                //console.log(fontBuffer)
                const savefont: FontSaveData = {
                    Id: ID(),
                    Name: vf.familyName,
                    FontBuffer: fontBuffer
                }
                //console.log(JSON.stringify(savefont))
                parent.postMessage( {pluginMessage:{ type: 'font-loaded', fontData: savefont} as pluginMessage}, '*')

            } catch (err) {
                console.log(err)
            }
        }
    }
}

/**
 * when user drops a file/ files into ui, load it.
 * code taken, modified from https://github.com/kennethormandy/variableFont.js/blob/master/demo/VariableFontViewer.htm
 *
 * @param event the drag event 
 */
const drop = (event: DragEvent)=> {
    event.stopPropagation();
    event.preventDefault();        
    loadSavefont(event.dataTransfer.files)
}

/**
 * 
 */
export const fileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    loadSavefont(event.currentTarget.files)
}
