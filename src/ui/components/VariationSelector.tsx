
import * as React from 'react'

interface VariationSelectorProps {
    NamedVariations: namedVariations
    instanceGetSet:  {
        instance: string
        setInstance: React.Dispatch<React.SetStateAction<string>>
    }
}

/**
 * variation selector UI component
 * @param props 
 */
const VariationSelector = (props: VariationSelectorProps) => {

    const handleChange =(ev: React.ChangeEvent<HTMLSelectElement>) => {
        props.instanceGetSet.setInstance(ev.target.value)
    }

    return (
        <div className="selector">
            <select 
            name="" 
            id="select-menu1" 
            className="select-menu"
            value={props.instanceGetSet.instance} 
            onChange={handleChange}>
                <option value={""}>custom</option>
                {Object.keys(props.NamedVariations).map( (key) => (
                    <option key={key}  value={key}>{key}</option>
                )

                )}
            </select>
        </div>
    )
}

export default VariationSelector
