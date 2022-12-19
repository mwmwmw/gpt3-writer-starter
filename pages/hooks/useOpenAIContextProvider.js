import { createContext } from "react";
import useOpenAI from "../useOpenAI";

export const OpenAIContext = createContext();

export default function OpenAIProvider({ children }) {
    const instance = useOpenAI();
    return <OpenAIContext.Provider value={instance}>{children}</OpenAIContext.Provider>
}