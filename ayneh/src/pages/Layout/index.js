import React from 'react';
import LOADING from "../../assets/images/loading.svg";
import "./styles.scss";
const Layout = ({ isFetching, children }) => {
    return (
        <div className="layoutOuter">
            <div className="layoutInner">
                {isFetching && 
                    <div className="loading"><img alt="loading" src={LOADING} /></div>
                }
                {children}
            </div>
        </div>
    )
}

export default Layout;