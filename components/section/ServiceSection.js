import React from 'react';

export default function ServiceSection() {
    return (
        <div className="px-4 py-16">
            <div className="pb-12">
                <h1 className="text-center text-2xl sm:text-3xl text-yellow-500 font-semibold">
                    - Tax and Corporate Services -
                </h1>
            </div>
            <div className="max-w-3xl mx-auto bg-cyan-900 text-white p-6 sm:p-10 rounded-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 text-base sm:text-lg font-semibold">
                    <p>1040 with Sch C</p>
                    <p className="text-right">$1,500+</p>
                    
                    <p>1040 + 1120S</p>
                    <p className="text-right">$2,500+</p>
                    
                    <p>1065 + K-1s</p>
                    <p className="text-right">$2,500+</p>
                    
                    <p>Bookkeeping Catch Up</p>
                    <p className="text-right">$2,500+/yr</p>
                    
                    <p>1099 Filings</p>
                    <p className="text-right">$250 base + $20 per 1099</p>
                    
                    <p>LLC Formation and Filings</p>
                    <p className="text-right">$495/yr</p>
                    
                    <p>S Corp Election and Filings</p>
                    <p className="text-right">$249/yr</p>
                    
                    <p>Payroll Setup</p>
                    <p className="text-right">$495</p>
                    
                    <p>Quarterly Estimates</p>
                    <p className="text-right">$100/qtr</p>
                </div>
            </div>
        </div>
    );
}
