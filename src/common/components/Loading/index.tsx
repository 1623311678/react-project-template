/**
 * @param loading 是否展示loading
 * @param children 展示的右侧内容
 */

import React from "react";
import './index.scss'
import loadingGif from '../../../../assets/images/home/loading.gif';
interface LoadingProps {
    children?: React.ReactNode;
    loading: boolean;
}

const Loading: React.FC<LoadingProps> = props => {
    const { loading, children } = props;
    return (
        <div>
            {
                loading?(
                    <div className="global-loading">
                        <img style={{width:'10%'}} src={loadingGif} alt=""/>
                    </div>
                ):null
            }
            <div>{children}</div>
        </div>
    );
};

Loading.displayName = "Loading";
export default Loading;
