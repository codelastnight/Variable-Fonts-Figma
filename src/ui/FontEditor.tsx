import * as React from 'react'
import {useState, useEffect} from 'react'
import * as fontHelper from './FontHelper/FontHelper'
import { VariationFont } from '../../variationFont'
import { isNullOrUndefined } from 'util'
import FontSlider from './components/FontSlider'

interface FontEditorProps {
    FontData: FontSaveData | undefined
    Active: string
    FontGetSet:  {
        fontSetting: FontSetting
        setFontSetting: React.Dispatch<React.SetStateAction<FontSetting>>
    }
}
const FontEditor = (props:  FontEditorProps) => {
    const [fontObject, setFontObject] = useState(null as VariationFont)
    const [fontAxis, setFontAxis] = useState({} as variationAxes)
    // switch data on active change
    useEffect(() => {
        const setting = props.FontGetSet
        if(props.FontData != undefined) {
            const vf =fontHelper.parseFont(props.FontData.FontBuffer)
            setFontObject(vf)
            setting.setFontSetting({...setting.fontSetting, fontFamily: props.FontData.Name})  
            setFontAxis(vf.variationAxes)
        }
    }, [props.Active])

    // get svg and render
    useEffect(() => {
        if (props.FontData != undefined) {
           parent.postMessage({pluginMessage: { type: 'font-render', fontSetting: props.FontGetSet.fontSetting} as pluginMessage}, '*')
        }
    }, [props.FontGetSet.fontSetting])

    return (
        <section className="font-editor">
            <div className="info">
                <header>
                    <p>{props?.FontData?.Name}</p>
                </header>
            </div>
            <div className="edit-axis">
                {!isNullOrUndefined(fontObject?.variationAxes) ? 
                    Object.keys(fontObject.variationAxes).map(axis => (
                        <FontSlider key={axis} variation={fontObject.variationAxes[axis]} FontGetSet={props.FontGetSet} />
                   
                    )) : 
                    (<div className="a" >
                        <p>no variations found</p>
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
