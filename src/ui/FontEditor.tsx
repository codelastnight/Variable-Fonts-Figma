import * as React from 'react'
import {useState, useEffect} from 'react'
import * as fontHelper from './FontHelper/FontHelper'
import { VariationFont } from '../../variationFont'
import { isNullOrUndefined } from 'util'
import FontSlider from './components/FontSlider'
import VariationSelector from './components/VariationSelector'

interface FontEditorProps {
    FontData: FontSaveData | undefined
    Active: string
    FontGetSet:  {
        fontSetting: FontSetting
        setFontSetting: React.Dispatch<React.SetStateAction<FontSetting>>
    }
}

/**
 * The Font Editor UI 
 * @param props  
 */
const FontEditor = (props:  FontEditorProps) => {
    const [fontObject, setFontObject] = useState(null as VariationFont)
    const [instance, setInstance] = useState("")
    const [variations, setVariations] = useState({} as variationSetting)

    // switch data on active change
    useEffect(() => {
        const setting = props.FontGetSet
        if(props.FontData != undefined) {
            const vf =fontHelper.parseFont(props.FontData.FontBuffer)
            setFontObject(vf)
            setInstance(props.FontGetSet.fontSetting.instance)
            const variations: variationSetting = {...setting.fontSetting.variations}
            // if font setting variation axis and loaded font variation axis dont match, load defaults
            if (Object.keys(variations)!= Object.keys(vf.variationAxes)) {
                Object.keys(vf.variationAxes).forEach(key => {
                    variations[key] = vf.variationAxes[key].default;
                })
            }
            setVariations(variations)
            setting.setFontSetting({...setting.fontSetting, fontFamily: props.FontData.Name, variations: variations})  
        }
    }, [props.Active])

    // get svg and render
    useEffect(() => {
        if (fontObject != null) {
            if (props.FontData != undefined) {
            parent.postMessage({pluginMessage: { type: 'font-render', fontSetting: props.FontGetSet.fontSetting} as pluginMessage}, '*')
            }
        }
        
    }, [props.FontGetSet.fontSetting])

    // set presets from font
    useEffect(() => {
        if (fontObject != null) {
            const settings = props.FontGetSet
            if (instance != "") {
                const preset = {...fontObject.namedVariations[instance]}
                setVariations(preset)
                settings.setFontSetting({...settings.fontSetting, variations: preset})
            }
        }
        
    }, [instance])

    // set presets to custom if sliders are moved
    useEffect(() => {
        if (variations != props.FontGetSet.fontSetting.variations) {
            setInstance("")
        }
        props.FontGetSet.setFontSetting({...props.FontGetSet.fontSetting, variations: variations})
    }, [variations])

    return (
        <section className="font-editor">
             <header>
                    <p>{props?.FontData?.Name}</p>
            </header>
            <div className="info">
               
                {!isNullOrUndefined(fontObject?.namedVariations) &&  Object.keys(fontObject.namedVariations).length > 0? (
                    <VariationSelector NamedVariations={fontObject.namedVariations} instanceGetSet={{instance, setInstance}} />
                ) :(
                    <div></div>
                ) }
            </div>
            <div className="edit-axis">
                {!isNullOrUndefined(fontObject?.variationAxes) ? 
                    Object.keys(fontObject.variationAxes).map(axis => (
                        <FontSlider key={axis} Key={axis} variation={fontObject.variationAxes[axis]} variationGetSet={{variations,setVariations}} />
                   
                    )) : 
                    (<div className="a" >
                        <p>uwu</p>
                    </div>)
                }
            </div>
            <div className="edit-text">
                <textarea 
                    id="" 
                    className="textarea"  
                    placeholder="start typing to generate text"
                    value={props.FontGetSet.fontSetting.text}
                    onChange={(ev)=> props.FontGetSet.setFontSetting({
                            ...props.FontGetSet.fontSetting,
                            text: ev.target.value
                    })}
                    >
                </textarea>
            </div>  
        </section>
    );
}

export default FontEditor
