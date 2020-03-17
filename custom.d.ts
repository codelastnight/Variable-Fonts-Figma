
/**
 * object interface of each font data stored in app
 */
interface FontSaveData {
    Id: string // unique id that the app can look for
    Name: string // name of string
    FontBuffer: string //font buffer data as a base64 encoded string

}

/**
 *  object interface of the actual object stored in figma.clientstorage
 *  */
interface VariableClientStorage {
    data: FontSaveData[]
}

/**
 * object when sending data form ui and plugin
 *  */ 
interface pluginMessage {
    type: string
    data?: string
    fontData?: FontSaveData
    fontListData?: VariableClientStorage
    removeID?: string
    fontSetting?: FontSetting
}

/**
 * object storing font settings within each font object.
 */
interface FontNodeData {
    Name: string
    settings: FontSetting
}


interface FontSetting {
    fontFamily: string
    text: string
    instance?: string
    variations: variationSetting
}


interface variationAxis {
    name: string
    min: number
    max: number
    default: number
}

interface variationAxes {
    [key: string]: variationAxis
} 

interface variationSetting {
    [axisname: string]: number
}
interface namedVariations {
    [variationname: string]: variationSetting 
}
