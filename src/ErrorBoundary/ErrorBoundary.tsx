import React, { ErrorInfo } from 'react';
import { useNavigate } from 'react-router-dom';
import {PAGES} from "../Pages/Route-string.tsx";

interface Props {
    children: React.ReactNode;
    navigate: (path: string) => void;
}

interface State {
    hasError: boolean;
    errorData: any;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, errorData: "" };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render shows the fallback UI
        return { hasError: true, errorData: error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("عزیز دلم یه ارور توی برنامه داریم!!");
        console.error("Dear User error Is: =======================");
        console.error(error);
        console.error("Dear User errorInfo Is: =======================");
        console.error(errorInfo);

        // Redirect to dashboard automatically after error occurs
        setTimeout(() => {
            this.props.navigate("/");
            window.location.reload()
        }, 500); // بعد از 500 میلی ثانیه هدایت شود
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex justify-center">
                    <div className="w-full h-screen text-white fontSize14 font-mono whitespace-break-spaces absolute p-5 ltr">
                        <pre>
                            {this.state.errorData.toString()}
                        </pre>
                        <div className="rtl">
                            <div>
                                یه موردی پیش اومد،
                                <br/><br/>
                                سیسستم هوشمند نمارنگ
                                <br/><br/>
                                بیا بریم توی داشبورد سایت و از اول شروع کنیم! صبر کن عزیزم ..
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

// A wrapper component to pass navigate to the ErrorBoundary
const ErrorBoundaryWithNavigate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    return <ErrorBoundary navigate={navigate}>{children}</ErrorBoundary>;
};

export default ErrorBoundaryWithNavigate;
