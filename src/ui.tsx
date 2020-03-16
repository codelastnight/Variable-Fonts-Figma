import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './scss/index.scss'

const App = () => {

    onmessage = (event) => {
        const msgData: pluginMessage = event.data.pluginMessage
        console.log("got this from the plugin code", msgData.type)
        switch (msgData.type) {
            case 'font-list': {
                // rerender font list
                break;
            }
            case 'from-selection': {
                //get data from object, load that data.
                break;
            }
        }
    }
  
    return (
    <main>
        
        <footer>
        
        </footer> 
    </main>
   
    )
  
}

ReactDOM.render(<App />, document.getElementById('react-page'))