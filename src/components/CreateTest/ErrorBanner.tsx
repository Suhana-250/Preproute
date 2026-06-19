interface ErrorBannerProps {
    message?: string;
}

export default function ErrorBanner({ message }: ErrorBannerProps) {
    if (!message) return null;
    return (
        <div className="mx-6 mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-[6px] text-sm text-red-600">
            {message}
        </div>
    );
}
