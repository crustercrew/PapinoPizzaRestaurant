import { ErrorBoundary } from "react-error-boundary";
import {useLanguage} from "../context/Context.jsx";
import translations from "../context/Translate.jsx";

const FallbackComponent = ({ error, resetErrorBoundary }) => {

    const {language} = useLanguage();
    return (
        <div className="error-boundary">
            <h1>{translations[language].error.title}</h1>
            <p>{translations[language].error.desc}</p>
            <pre className="errorBox">{error.message}</pre>
            <button onClick={resetErrorBoundary}>
                {translations[language].error.button} 🔄
            </button>
        </div>
    )
};

const logError = (error, info) => {
    console.error("Error:", error);
    console.error("Component Stack:", info.componentStack);
};

export default function CustomErrorBoundary({ children }) {
    return (
        <ErrorBoundary
            FallbackComponent={FallbackComponent}
            onError={logError}
            onReset={() => window.location.reload()} // Reset to initial state
        >
            {children}
        </ErrorBoundary>
    );
}