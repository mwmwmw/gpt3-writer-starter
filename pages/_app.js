import OpenAIProvider from './hooks/useOpenAIContextProvider';
import './styles.css';

function App({ Component, pageProps }) {
  return <OpenAIProvider><Component {...pageProps} /></OpenAIProvider>
}
export default App;
