import { ErrorBoundary } from "react-error-boundary";

const FallbackComponent = ({ error, resetErrorBoundary }) => (
    <div className="error-boundary">
        <h1>Oops! Terjadi Kesalahan 😢</h1>
        <p>Sepertinya ada yang tidak beres. Detail error:</p>
        <pre className="errorBox">{error.message}</pre>
        <button onClick={resetErrorBoundary}>
            Coba Lagi 🔄
        </button>
    </div>
);

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