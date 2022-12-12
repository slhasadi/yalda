import {NewsTypes} from "../interfaces/interfaces";
import {createContext} from "react";
const defaultValue = {news: null, hottestNews: null, otherNews: null}
const NewsContext = createContext<NewsTypes.News>(defaultValue);
export const NewsProvider = NewsContext.Provider;
export default NewsContext
