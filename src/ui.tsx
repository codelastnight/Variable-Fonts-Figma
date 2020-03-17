import * as React from 'react'
import {useState, useEffect} from 'react'
import * as ReactDOM from 'react-dom'
import './scss/index.scss'
import FontEditor from './ui/FontEditor';
import FontLoader from './ui/FontLoader';
function App() {
    // active font state
    const [active, setActive] = useState("")
    // list of fonts in memory
    const [fontList, setFontList] = useState([] as FontSaveData[])
    const [fontSetting, setFontSetting] = useState({fontFamily: "", 
                                                    text: "",
                                                    variations: {}
                                                    } as FontSetting)  
    // request font list on app load
    useEffect(() => parent.postMessage({pluginMessage: { type: 'app-init', data: ""} as pluginMessage}, '*'), [])


    onmessage = (event) => {
        const msgData: pluginMessage = event.data.pluginMessage
        //console.log(msgData.fontListData.data)
        switch (msgData?.type) {
            case 'font-list': {
                // rerender font list
                setFontList(msgData.fontListData.data)
                break;
            }
            case 'from-selection': {
                //get data from object, load that data.
                if(fontList.find( i=> i.Name == msgData.fontSetting.fontFamily) != undefined ) {
                    setActive(msgData.fontSetting.fontFamily)
                    setFontSetting(msgData.fontSetting)
                }
                
                break;
            }
        }
    }
  
    return (
    <main>
        <FontLoader FontList={fontList} Active={active} SetActive={setActive}></FontLoader>
        <FontEditor FontData={fontList.find(i=>i.Id == active)} Active={active} FontGetSet={{fontSetting,setFontSetting}} ></FontEditor>
        <footer>
        a
        </footer> 
    </main>
   
    )
  
}

ReactDOM.render(<App />, document.getElementById('react-page'))