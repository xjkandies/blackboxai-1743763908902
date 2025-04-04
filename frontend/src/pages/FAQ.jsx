import React from 'react';
import Card from '../components/common/Card';
import { Disclosure } from '@headlessui/react';

const FAQ = () => {
  const faqs = [
    {
      question: "How does music distribution work?",
      answer: `Our music distribution service helps you get your music on major streaming platforms like Spotify, Apple Music, and more. After uploading your track, we handle the distribution process, including metadata submission, format conversion, and platform-specific requirements. You can track the status of your distribution in real-time.`
    },
    {
      question: "What are ISRC and UPC codes?",
      answer: `ISRC (International Standard Recording Code) is a unique identifier for each track, while UPC (Universal Product Code) identifies your entire release. These codes are essential for tracking streams, sales, and royalties across different platforms. We provide both codes as part of our distribution service.`
    },
    {
      question: "What audio formats do you accept?",
      answer: `We accept WAV, FLAC, and high-quality MP3 files (320kbps). For the best quality, we recommend uploading WAV files (16-bit/44.1kHz or higher). Your audio will be automatically converted to the appropriate format for each streaming platform.`
    },
    {
      question: "How long does distribution take?",
      answer: `Distribution times vary by platform. Generally, it takes 1-2 business days for us to process and submit your release. After that, each platform has its own review process:
      • Spotify: 2-5 business days
      • Apple Music: 2-7 business days
      • YouTube Music: 1-3 business days
      • Other platforms: typically within 7 business days`
    },
    {
      question: "How do I track my streams and earnings?",
      answer: `You can track your performance through our analytics dashboard. We provide detailed insights including:
      • Stream counts by platform
      • Geographic distribution of listeners
      • Revenue breakdown
      • Trending statistics
      Data is typically updated daily or weekly, depending on the platform.`
    },
    {
      question: "What happens if there's an issue with my release?",
      answer: `If there's any issue during the distribution process, you'll be notified immediately through our platform and email. Our support team will provide specific details about the issue and guide you through the resolution process. Most common issues can be resolved within 24 hours.`
    },
    {
      question: "Can I update my release after distribution?",
      answer: `Yes, you can update certain elements of your release after distribution, including:
      • Artwork (subject to platform restrictions)
      • Basic metadata
      • Release date (if not yet released)
      However, you cannot replace the audio file once distributed. For audio changes, you'll need to create a new release.`
    },
    {
      question: "How do royalties work?",
      answer: `We collect royalties from all platforms and pay them directly to you. Our payment schedule is monthly, with a 45-day delay to account for platform reporting. You keep 100% of your royalties, and we provide detailed reports of all earnings through your dashboard.`
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-gray-600">
            Find answers to common questions about our music distribution service
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-left">
                      <span className="text-lg font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <svg
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-gray-500`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pb-4">
                      <div className="prose prose-sm max-w-none text-gray-600">
                        {faq.answer.split('\n').map((paragraph, i) => (
                          <p key={i} className="whitespace-pre-line">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">
            Still have questions?
          </h2>
          <p className="text-blue-700 mb-4">
            Our support team is here to help you with any questions you may have.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Contact Support
            </a>
            <a
              href="/docs"
              className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50"
            >
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;