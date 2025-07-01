import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalState';

function HomePage() {
  const navigate = useNavigate();
  const { user } = useGlobalState();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLearnMore = () => {
    // Scroll to features section or navigate to about page
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
              බෝඩිම් <span className="text-green-700">TIKKA</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
              Simplify your boarding house management with our comprehensive solution. 
              Track payments, manage rooms, and keep everything organized in one place.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 lg:mb-16 px-4">
            <button
              onClick={handleGetStarted}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-black to-green-700 text-white font-semibold text-sm sm:text-base rounded-xl hover:from-gray-800 hover:to-green-800 transform hover:scale-105 transition duration-200 shadow-lg"
            >
              {user ? 'Go to Dashboard' : 'Get Started'}
            </button>
            <button
              onClick={handleLearnMore}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 font-semibold text-sm sm:text-base rounded-xl border-2 border-gray-300 hover:border-green-500 hover:text-green-700 transition duration-200 shadow-md"
            >
              Learn More
            </button>
          </div>

          {/* Hero Image/Illustration Placeholder */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto border border-gray-100">
            <div className="bg-gradient-to-r from-gray-100 to-green-100 rounded-lg sm:rounded-xl h-48 sm:h-64 md:h-80 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto text-green-600 mb-2 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h6m-6 4h8" />
                </svg>
                <p className="text-gray-600 font-medium text-sm sm:text-base">Boarding House Management Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Why Choose TIKKA?</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Everything you need to manage your boarding house efficiently and professionally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition duration-200">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Payment Tracking</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Keep track of all payments, dues, and financial records with ease. Generate reports and manage transactions efficiently.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition duration-200">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Room Management</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Organize rooms, manage occupancy, and keep track of all residents and their details in one centralized system.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition duration-200">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Analytics & Reports</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Get insights into your boarding house operations with detailed analytics and comprehensive reporting features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-black to-green-700 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-green-100 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                Join thousands of boarding house owners who trust TIKKA to manage their properties efficiently.
              </p>
              <button
                onClick={handleGetStarted}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 font-semibold text-sm sm:text-base rounded-xl hover:bg-gray-100 transform hover:scale-105 transition duration-200 shadow-lg"
              >
                {user ? 'Go to Dashboard' : 'Start Free Trial'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;