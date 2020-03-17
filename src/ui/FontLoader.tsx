import * as React from 'react'
import  { useState, useEffect } from 'react';
import * as fontH from './FontHelper/FontHelper'

interface FontLoaderProps {
    FontList: FontSaveData[]
    Active: string
    SetActive: React.Dispatch<React.SetStateAction<string>>
}
const FontLoader = (props: FontLoaderProps) => {
    const [search, setSearch] = useState("");
   
    //useEffect(() =>  console.log("bruh",props.FontList), [props.FontList])


    return (
        <section className="font-loader">
            <header>
                <input type="input" className="input" placeholder="Search Fonts" onChange={(e) => setSearch(e.target.value)}/>

                <div className="editbtn">
                    <div className="icon icon--plus icon--button"><input type="file" multiple onChange={(e) => fontH.fileUpload(e)}/></div>
                </div>
            </header>
            
            <div className="font-list">
                {
                props.FontList.length > 0 ? 
                    props.FontList.filter( i => search != "" ? i.Name.toLowerCase().includes(search.toLowerCase()): true).map((data) =>
                    (<div key={data.Id} className= {`font-item ${data.Id == props.Active ? "active" :""}`} onClick={() => props.SetActive(data.Id)}>
                        <p className="name noselect">{data.Name}</p>
                        <div className="icon icon--minus icon--button" onClick={() => parent.postMessage({pluginMessage: { type: 'font-remove', removeID: data.Id} as pluginMessage}, '*')}></div>
                    </div>)
                    ) : 
                    <div className="font-loader-init"><p>Drag in a Variable Font or click the '+' to get started</p></div>
                }
            </div>
        </section>
    );
}

export default FontLoader
