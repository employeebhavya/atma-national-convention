const Footer = () => {
  return (
    <footer className="bg-[#f4f4f4] text-black py-12">
      <div className="container">
        <div className="text-center mb-8">
          <h3 className="text-3xl text-black mb-2">RSVP & More Information</h3>
          <p className="text-gray-900 max-w-2xl mx-auto text-base">
            Reserve your spot today! Don't miss the opportunity to connect,
            celebrate, and learn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact 1 */}
          <div className="bg-gray-200 p-6 rounded-lg hover:bg-gray-300 transition-colors">
            <h4 className="text-lg font-semibold text-black mb-3">
              Dr. Rajarathinam Subramaniam
            </h4>
            <p className="text-black mb-1">
              National Convention Chair, ATMA 2025
            </p>
            <div className="space-y-2 mt-4">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-black mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:rajarathinamdr@gmail.com"
                  className="text-black hover:text-[#dc1d46]"
                >
                  rajarathinamdr@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact 2 */}
          <div className="bg-gray-200 p-6 rounded-lg hover:bg-gray-300 transition-colors flex flex-col justify-center">
            <h4 className="text-lg font-semibold text-black mb-2">
              Subbulakshmi Jeyaram
            </h4>
            <div className="space-y-2 mt-2">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-black mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:subu.jayaraman@gmail.com"
                  className="text-black hover:text-[#dc1d46]"
                >
                  subu.jayaraman@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact 3 */}
          <div className="bg-gray-200 p-6 rounded-lg hover:bg-gray-300 transition-colors flex flex-col justify-center">
            <h4 className="text-lg font-semibold text-black mb-2">
              Guru Prasath (India)
            </h4>
            <div className="space-y-2 mt-2">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-black mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:n.guruprasath26@gmail.com"
                  className="text-black hover:text-[#dc1d46]"
                >
                  n.guruprasath26@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p className="text-base text-black">
            © {new Date().getFullYear()} ATMA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
