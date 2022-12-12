import React from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom"
import { PersistGate } from 'redux-persist/integration/react'
import Layout from "./pages/Layout"
import SplashPage from "./pages/Splash"
import Onboarding from "./pages/Onboarding"
import Verification from "./pages/Verification"
import Main from "./pages/Main"
import Category from "./pages/Category"
import SubCategory from "./pages/Subcategory"
import Post from "./pages/Post"
import Webview from "./pages/Webview"
import PoemResult from "./pages/FaalHafez"
import ContestListPage from "./pages/Contest"
import ContestInnerPgae from "./pages/ContestDetail"
import DreamPage from "./pages/Dream"
import DreamDetailsPage from "./pages/DreamDetail"
import MahoParvinPage from "./pages/MahoParvin"
import ConfigStore from './store.js'
let configStore = ConfigStore();

const renderSplashPage = (props, setLoading) => {
  return (
    <SplashPage {...props} setLoading={setLoading} />
  );
}

const renderOnboardingPage = (props, setLoading) => {
  return (
    <Onboarding {...props} setLoading={setLoading} />
  );
}

const renderVerificationPage = (props, setLoading) => {
  return(
    <Verification {...props} setLoading={setLoading} />
  )
}

const renderMainPage = (props, setLoading) => {
  return(
    <Main {...props} setLoading={setLoading} />
  )
}

const renderCategoryPage = (props, setLoading, pageType) => {
  return(
    <Category {...props} setLoading={setLoading} pageType={pageType} />
  )
}

const renderSubCategoryPage = (props, setLoading, pageType) => {
  return(
    <SubCategory {...props} setLoading={setLoading} pageType={pageType} />
  )
}

const renderPostPage = (props, setLoading) => {
  return(
    <Post {...props} setLoading={setLoading} />
  )
}

const renderWebviewPage = (props, setLoading) => {
  return(
    <Webview {...props} setLoading={setLoading} />
  )
}

const renderPoemResultPage = (props, setLoading, pageType) => {
  return(
    <PoemResult {...props} setLoading={setLoading} pageType={pageType} />
  )
}

const renderContestListPage = (props, setLoading) => {
  return(
    <ContestListPage {...props} setLoading={setLoading} />
  )
}

const renderContestDetailPage = (props, setLoading) => {
  return(
    <ContestInnerPgae {...props} setLoading={setLoading} />
  )
}

const renderDreamPage = (props, setLoading) => {
  return(
    <DreamPage {...props} setLoading={setLoading} />
  )
}

const renderDreamDetailPage = (props, setLoading) => {
  return(
    <DreamDetailsPage {...props} setLoading={setLoading} />
  )
}

const renderMahoParvinPage = (props, setLoading) => {
  return(
    <MahoParvinPage {...props} setLoading={setLoading} />
  )
}

const AppWrapper = () => {
  return (
    <Provider store={configStore.store}>
      <PersistGate loading={null} persistor={configStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}

function App() {
  const [loading, setLoading] = React.useState(false);
  return (
    <Router>
      <Layout isFetching={loading} >
        <Route exact path="/">
          <Redirect to="/:mode/splash" />
        </Route>
        <Route exact={true} path="/:mode/splash" render={(props) => renderSplashPage(props, setLoading)} />
        <Route exact={true} path="/:mode/login" render={(props) => renderOnboardingPage(props, setLoading)} />
        <Route exact={true} path="/:mode/verification" render={(props) => renderVerificationPage(props, setLoading)} />
        <Route exact={true} path="/:mode/main" render={(props) => renderMainPage(props, setLoading)} />
        <Route exact={true} path="/:mode/category/:id" render={(props) => renderCategoryPage(props, setLoading, "category")} />
        <Route exact={true} path="/:mode/subcategory/:id" render={(props) => renderSubCategoryPage(props, setLoading, "subcategory")} />
        <Route exact={true} path="/:mode/shakhenabat" render={(props) => renderSubCategoryPage(props, setLoading, "shakhenabat")} />
        <Route exact={true} path="/:mode/post/:id" render={(props) => renderPostPage(props, setLoading)} />
        <Route exact={true} path="/:mode/rangirangi" render={(props) => renderWebviewPage(props, setLoading)} />
        <Route exact={true} path="/:mode/dorehami" render={(props) => renderWebviewPage(props, setLoading)} />
        <Route exact={true} path="/:mode/sinjim" render={(props) => renderWebviewPage(props, setLoading)} />
        <Route exact={true} path="/:mode/hafez" render={(props) => renderCategoryPage(props, setLoading, "hafez")} />
        <Route exact={true} path="/:mode/hafez/faal" render={(props) => renderPoemResultPage(props, setLoading, "hafez")} />
        <Route exact={true} path="/:mode/tavasol" render={(props) => renderSubCategoryPage(props, setLoading, "tavasol")} />
        <Route exact={true} path="/:mode/tavasol/result" render={(props) => renderPoemResultPage(props, setLoading, "tavasol")} />
        <Route exact={true} path="/:mode/contest" render={(props) => renderContestListPage(props, setLoading)} />
        <Route exact={true} path="/:mode/contest/:id" render={(props) => renderContestDetailPage(props, setLoading)} />
        <Route exact={true} path="/:mode/dream" render={(props) => renderDreamPage(props, setLoading)} />
        <Route exact={true} path="/:mode/dream/:id" render={(props) => renderDreamDetailPage(props, setLoading)} />
        <Route exact={true} path="/:mode/mahoparvin" render={(props) => renderMahoParvinPage(props, setLoading)} />
      </Layout>
    </Router>
  );
}

export default AppWrapper;
