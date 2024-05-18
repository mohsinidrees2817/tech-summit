import {AiChat} from '@nlux/react';
import '@nlux/themes/nova.css';
import {streamAdapter} from './adapter.js';
import {user, botPictureUrl} from './personas.jsx';
import { useState } from 'react';
import { QueryChatbot } from './chatbot.js';

const App = () => {
  const [PdfFile, setPdfFile] = useState(null);
  const [PdfFileName, setPdfFileName] = useState(null);

  const handleSubmit = async () => {
    if(PdfFile){
      const response = await QueryChatbot(PdfFile);
      console.log(response);
    }
  }

  return(<>
  <div>
  <AiChat
    adapter={streamAdapter}
    personaOptions={{
      bot: {
        name: 'Assistant bot',
        tagline: 'Generate Study Material',
        picture: botPictureUrl,
      },
      user
    }}
    promptBoxOptions={{
      placeholder: 'How can I help you?'
    }}
    layoutOptions={{
      height: '100vh',
      width: '80vw',
    }}
    
  />
  <input type="file" onChange={(e)=>{
    const file = e.target.files[0];
    setPdfFile(file);
    setPdfFileName(file.name);
  }} />
  <button onClick={handleSubmit}>Upload</button>
  </div>
  

  </>
  )
}


export default App;