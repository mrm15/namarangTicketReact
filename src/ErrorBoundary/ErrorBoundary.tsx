import React, {ErrorInfo} from 'react';
import {useNavigate} from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    errorData: any;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {hasError: false, errorData: ""};
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render shows the fallback UI
        return {hasError: true, errorData: error};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can log the error to an error reporting service
        console.error("عزیز دلم یه ارور توی برنامه داریم!!")
        // console.error("Error caught by Error Boundary:", error, errorInfo);
        console.error("Dear User error Is: =======================")
        console.error(error)
        console.error("Dear User errorInfo Is: =======================")
        console.error(errorInfo)
    }


    render() {

        if (this.state.hasError) {
            // Fallback UI when an error occurs
            return <div
                className={"flex justify-center"}
            >

                <div
                    className={"w-full h-screen bg-red-950 text-white fontSize14 font-mono whitespace-break-spaces absolute  p-5   ltr"}
                >

                    {/*<div className={"rtl "}> یه موردی پیش اومده!</div>*/}
                    <div className={"rtl "}>
                    {/*<button*/}
                    {/*className={"btn btn-gay-mir"}*/}
                    {/*onClick={goToDashboard}*/}
                    {/*>*/}
                    {/*    برو به داشبورد*/}
                    {/*</button>*/}
                    </div>
                    <pre className={"font-mono"}>{JSON.stringify(this.state.errorData?.toString())}</pre>
                </div>
            </div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
