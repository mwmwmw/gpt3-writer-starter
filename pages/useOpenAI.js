import {  useEffect, useState } from "react";

export default function useOpenAI() {
    
  const [responses, setResponses] = useState([]);
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
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setResponses((prev)=>[...prev,`${output.text}`]);
    setIsGenerating(false);
  }

  return {
    generate,
    isGenerating,
    responses,
  }

}