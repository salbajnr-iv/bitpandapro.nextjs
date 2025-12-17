"use client";

import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="bp-container">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <Image 
                  src="https://sbcdn.bitpanda.com/300x88/e191121310/website_header-logo-01.svg" 
                  alt="Bitpanda logo" 
                  width={150}
                  height={44}
                  className="h-11 w-auto"
                />
              </div>
            </Link>
            <Link href="/" className="bp-link">
              Back to home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12">
        <div className="bp-container">
          <div className="max-w-4xl mx-auto">
            <div className="auth-header mb-8">
              <h1 className="auth-title">
                Blog
              </h1>
              <p className="auth-subtitle">
                Latest news, insights, and updates from the world of digital assets.
              </p>
            </div>

            <div className="auth-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Market Outlook: What to Expect in Q1 2024",
                    excerpt: "Analysis of upcoming trends and potential opportunities in the crypto market.",
                    date: "Dec 15, 2023",
                    readTime: "5 min read"
                  },
                  {
                    title: "How to Diversify Your Crypto Portfolio",
                    excerpt: "Strategies for building a balanced portfolio across different asset classes.",
                    date: "Dec 10, 2023",
                    readTime: "8 min read"
                  },
                  {
                    title: "Understanding Stablecoins: Risks and Benefits",
                    excerpt: "A comprehensive guide to stablecoins and their role in the crypto ecosystem.",
                    date: "Dec 5, 2023",
                    readTime: "6 min read"
                  },
                  {
                    title: "Tax Implications of Cryptocurrency Trading",
                    excerpt: "Important considerations for reporting crypto transactions to tax authorities.",
                    date: "Nov 28, 2023",
                    readTime: "7 min read"
                  },
                  {
                    title: "The Rise of Central Bank Digital Currencies (CBDCs)",
                    excerpt: "Exploring how CBDCs could reshape the global financial landscape.",
                    date: "Nov 20, 2023",
                    readTime: "10 min read"
                  },
                  {
                    title: "NFTs: Beyond the Hype",
                    excerpt: "Examining the real-world applications and future potential of NFT technology.",
                    date: "Nov 15, 2023",
                    readTime: "9 min read"
                  }
                ].map((post, index) => (
                  <div key={index} className="bp-card overflow-hidden">
                    <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                    <div className="p-6">
                      <div className="flex text-sm text-gray-500 mb-3">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <button className="bp-link font-medium">
                        Read more
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <nav className="flex space-x-2">
                  <button className="bp-button bp-button-secondary">
                    Previous
                  </button>
                  <button className="bp-button bp-button-primary">
                    1
                  </button>
                  <button className="bp-button bp-button-secondary">
                    2
                  </button>
                  <button className="bp-button bp-button-secondary">
                    3
                  </button>
                  <button className="bp-button bp-button-secondary">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="bp-container">
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 BITPANDA PRO. All rights reserved.</p>
            <div className="footer-links">
              <Link href="/terms" className="footer-link">Terms</Link>
              <Link href="/privacy" className="footer-link">Privacy</Link>
              <Link href="/security" className="footer-link">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}