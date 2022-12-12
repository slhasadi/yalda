import {createContext} from "react";
const defaultValue = {matches: null, predictedMatches: null}
const PredictionContext = createContext<any>(defaultValue);

export const PredictionProvider = PredictionContext.Provider;
export default PredictionContext
