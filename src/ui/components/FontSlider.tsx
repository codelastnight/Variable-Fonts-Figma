import * as React from 'react'


interface FontSliderProps {
    variation: variationAxis
    FontGetSet:  {
        fontSetting: FontSetting
        setFontSetting: React.Dispatch<React.SetStateAction<FontSetting>>
    }
}

const FontSlider = (props: FontSliderProps) => {

    const onSliderchange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const settings = props.FontGetSet
        if (settings.fontSetting.variations.hasOwnProperty(props.variation.name)) {
            let variations: variationSetting = {...settings.fontSetting.variations}
            variations[props.variation.name] = ev.target.valueAsNumber
            settings.setFontSetting({...settings.fontSetting, variations: variations })
        }
    }

    return (
        <div className="axis">
            <label>{props.variation.name}:</label>
            <input
            type="range"
            min={props.variation.min}
            max={props.variation.max}
            step={0.001}
            defaultValue={props.variation.default}
            value={props.FontGetSet.fontSetting.variations[props.variation.name]}
            onChange={onSliderchange} />
        </div>
    )
}

export default FontSlider
