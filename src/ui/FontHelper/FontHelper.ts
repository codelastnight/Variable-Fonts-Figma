//var opentype = require('opentype.js');
import * as opentype from 'opentype.js';
var VariableFont = require('variablefont.js');



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
 * when user drops a file/ files into ui, load it.
 * code taken, modified from https://github.com/kennethormandy/variableFont.js/blob/master/demo/VariableFontViewer.htm
 *
 * @param event the drag event 
 */
const drop = (event: DragEvent)=> {
    event.stopPropagation();
    event.preventDefault();
    var files = event.dataTransfer.files;
        
    
    for (var i=0, file: File; file=files[i]; i++) {
        var reader: FileReader = new FileReader();

        reader.readAsArrayBuffer(file);

        reader.onload = (ev) => {
            // create variable opentype font once file is read
            try {
                const fontBuffer = ev.target.result;
                const vf: opentype.Font = new VariableFont(opentype.parse(fontBuffer))

                const savefont: FontSaveData = {
                    Id: ID(),
                    Name: vf.names.fullName.value,
                    FontBuffer: fontBuffer
                }
                parent.postMessage( { type: 'font-loaded', data: JSON.stringify(savefont)} as pluginMessage, '*')

            } catch (err) {
                console.log(err)
            }
        }
    }
}

