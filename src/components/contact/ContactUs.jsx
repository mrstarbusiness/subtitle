const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full bg-blue-500 py-8">
        <h1 className="text-3xl text-white text-center">Contact Us</h1>
      </div>
      <div className="container mx-auto p-8 flex justify-between gap-3">
        {/* Contact Form */}
        <div className="w-full lg:w-2/3 bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl mb-6">Get in Touch</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded mt-1"
                rows="4"
                placeholder="Your Message"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3 mt-8 lg:mt-0  bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl mb-6">Find Us</h2>
          <div className="mb-6">
            <h3 className="text-xl text-gray-700">Social Media</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://www.facebook.com"
                  className="text-blue-600 hover:underline"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com"
                  className="text-blue-400 hover:underline"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com"
                  className="text-blue-700 hover:underline"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  className="text-pink-500 hover:underline"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1198018234075!2d144.95373511531658!3d-37.81662797975192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727c1e18c3b0f!2sVictoria%20State%20Library!5e0!3m2!1sen!2sau!4v1634559155155!5m2!1sen!2sau"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
