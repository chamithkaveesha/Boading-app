
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-black to-green-700 px-8 py-6">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-white mb-2">404</h1>
              <p className="text-green-100 text-lg">Page Not Found</p>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="px-8 py-8 text-center">
            <div className="mb-6">
              <svg 
                className="w-24 h-24 mx-auto text-gray-400 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5-1.709M15 11V9a6 6 0 00-12 0v2" 
                />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Oops! Page Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                The page you're looking for doesn't exist or has been moved. 
                Don't worry, let's get you back on track!
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleGoHome}
                className="w-full bg-gradient-to-r from-black to-green-700 text-white py-3 rounded-lg font-semibold hover:from-gray-800 hover:to-green-800 transform hover:scale-[1.02] transition duration-200 shadow-lg"
              >
                Go to Homepage
              </button>
              
              <button
                onClick={handleGoBack}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-200 border border-gray-300"
              >
                Go Back
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                If you believe this is an error, please contact support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;