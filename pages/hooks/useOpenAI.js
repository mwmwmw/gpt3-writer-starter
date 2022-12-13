import {  useEffect, useState } from "react";

const ENTRY_TYPES = {
  PROMPT: 'PROMPT',
  RESPONSE: 'RESPONSE',
}

export default function useOpenAI() {
    
  const [entries, setEntries] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(()=>{

    if(isGenerating) {
      document.body.setAttribute('data-open-ai-generating', true);
    } else {
      document.body.removeAttribute('data-open-ai-generating');
    }

  }, [isGenerating])

  const generate = async (userInput) => {
    setIsGenerating(true);
    
    setEntries((prev)=>[...prev, {
      timestamp: Date.now(),
      type: ENTRY_TYPES.PROMPT,
      text:`${userInput}`
    }]);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  

    const data = await response.json();
    const { text } = data.output;
    console.log("OpenAI replied...", text)
  
    setEntries((prev)=>[...prev, {
      timestamp: Date.now(),
      type: ENTRY_TYPES.RESPONSE,
      text
    }]);
    setIsGenerating(false);
  }

  return {
    generate,
    isGenerating,
    entries
  }

}