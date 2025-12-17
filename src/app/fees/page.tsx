"use client";

import Link from "next/link";
import Image from "next/image";

export default function FeesPage() {
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
                Fees
              </h1>
              <p className="auth-subtitle">
                Transparent pricing for all Bitpanda Pro services.
              </p>
            </div>

            <div className="auth-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bp-card p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Trading Fees</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-2">0.15%</p>
                  <p className="text-gray-500 mb-4">
                    Maker fee for all cryptocurrency trades. Volume discounts available.
                  </p>
                  <button className="bp-button bp-button-secondary">
                    View Fee Schedule
                  </button>
                </div>
                
                <div className="bp-card p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Deposit Fees</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-2">Free</p>
                  <p className="text-gray-500 mb-4">
                    No fees for depositing cryptocurrencies or fiat currencies.
                  </p>
                  <button className="bp-button bp-button-secondary">
                    View Deposit Options
                  </button>
                </div>
              </div>
              
              <div className="bp-card p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Fee Structure</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cryptocurrency Trading</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.15%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Maker fee (volume discounts available)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fiat Deposits</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Free</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bank transfers and card payments</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fiat Withdrawals</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€1.95</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bank transfer fees</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cryptocurrency Withdrawals</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Network Fee</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Actual blockchain transaction fees</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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