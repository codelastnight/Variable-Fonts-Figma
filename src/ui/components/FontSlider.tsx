import * as React from 'react'


interface FontSliderProps {
    Key: string
    variation: variationAxis
    variationGetSet:  {
        variations: variationSetting
        setVariations: React.Dispatch<React.SetStateAction<variationSetting>>
    }
}

/**
 * Ranger Slider UI component
 * @param props props to send in
 */
const FontSlider = (props: FontSliderProps) => {

 

    const onSliderchange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const settings = props.variationGetSet
        const variations: variationSetting = {...settings.variations}
        variations[props.Key] = ev.target.valueAsNumber
        settings.setVariations(variations)
    }
   
    return (
        <div className="axis slidecontainer">
            <div className="slider-top">
                <label>{props.variation.name}:</label>
                {/* <input type="input" className="input" value={props.FontGetSet.fontSetting.variations[props.variation.name].toString()} onChange={onSliderchange} /> */}
            </div>
            <input 
            className="slider"
            type="range"
            min={props.variation.min}
            max={props.variation.max}
            step={0.001}
            value={props.variationGetSet.variations[props.Key]}
            onChange={onSliderchange} />
        </div>
    )
}

export default FontSlider
