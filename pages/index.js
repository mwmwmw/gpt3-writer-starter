import Head from 'next/head';
import Image from 'next/image';
import { useContext, useRef } from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { OpenAIContext } from './hooks/useOpenAIContextProvider';


function SubmitForm() {
  const prompt = useRef()
  const {generate, isGenerating} = useContext(OpenAIContext);

  function submit(e) {
    e.preventDefault();
    generate(prompt.current.value);
  }

  return <form onSubmit={submit}>
    <textarea
      className="prompt-box"
      placeholder="start typing here"
      ref={prompt}></textarea>
    <div className="prompt-buttons">
      <button className="generate-button">
        <div className="generate">
        {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
        </div>
      </button>
    </div>
  </form>

}

const Home = () => {

  const { generate, responses } = useContext(OpenAIContext);

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Everyone's Talking 'bout Cmouse</h1>
          </div>
          <div className="header-subtitle">
            <h2>insert your subtitle here</h2>
          </div>
        </div>
        <SubmitForm />
        <div className="output-content">
        {responses.map(v=><p>{v}</p>)}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
