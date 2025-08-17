import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-blue-400 mb-6">
            Contact Us
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
            Have questions about our internship program or want to know more about
            Aartech Solonics Limited? Get in touch with us below.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="flex-grow py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid gap-12 lg:grid-cols-2">
          
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-900 to-blue-950 rounded-2xl p-8 shadow-lg border border-blue-700">
            <h3 className="text-2xl font-bold text-blue-400 mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg bg-black border border-gray-700 text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full p-3 rounded-lg bg-black border border-gray-700 text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full p-3 rounded-lg bg-black border border-gray-700 text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-between">
            <div className="bg-gradient-to-br from-gray-900 to-blue-950 rounded-2xl p-8 shadow-lg border border-blue-700 mb-6">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Contact Info</h3>
              <p className="mb-3"><span className="font-semibold text-blue-300">📍 Address:</span> Aartech Solonics Ltd, Govindpura Industrial Area, Bhopal, India</p>
              <p className="mb-3"><span className="font-semibold text-blue-300">📞 Phone:</span> +91-755-1234567</p>
              <p><span className="font-semibold text-blue-300">✉️ Email:</span> info@aartechsolonics.com</p>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-blue-700 shadow-lg">
              <iframe
                title="Aartech Solonics Ltd Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.636748853388!2d77.456!3d23.2599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c41b0b5c6c2d9%3A0x2b5b7a9cd3ecb2f4!2sAartech%20Solonics%20Limited!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
