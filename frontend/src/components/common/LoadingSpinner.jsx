export default function LoadingSpinner({ fullScreen = true }) {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-slate-600">Loading application...</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}