import React from 'react';
import useWindowSize from "../../hooks/useWindowSize";

const FullWidthPage = ({children}) => {

    const {widthWindowSize} = useWindowSize()

    const styles: React.CSSProperties = {
        width: `${widthWindowSize - ((10/100) * widthWindowSize)}px`

    }
    return <div style={styles}>
        {children}
    </div>
};

export default FullWidthPage;
