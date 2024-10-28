import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function PackageSection() {
    // Ref to track when the section comes into view
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    // Package details for each card
    const packages = [
        {
            title: "Creator Essentials",
            price: "$350/mo",
            description: "For creators generating up to $75k annually who need a hand with their books and taxes",
            features: [
                "Annual personal tax filing",
                "Unlimited communication on your preferred platform",
            ],
        },
        {
            title: "Platinum Producer",
            price: "$650/mo",
            description: "For creators making over $75k annually who are ready to take their business operations to the next level with added sophistication and financial expertise.",
            features: [
                "Monthly Bookkeeping",
                "Payroll set-up and management",
                "Corporate registration and compliance",
                "Quarterly estimated tax payments",
                "Annual personal and business tax returns",
                "Filing for 1099s on this plan",
                "Unlimited communication on your preferred platform",
            ],
        },
        {
            title: "Engagement Expert",
            price: "$950/mo",
            description: "For creators generating over $500k annually, we offer the most comprehensive and sophisticated financial assistance.",
            features: [
                "Advanced Tax Strategies",
                "Retirement Planning",
                "Investment Planning",
                "Cash Flow Management",
                "Everything included in Platinum Producer",
                "Collaboration with your legal team",
            ],
        },
    ];

    return (
        <div id="packages" ref={sectionRef} className='py-12 bg-white'>
            <div className='text-center pb-8'>
                <h1 className='scroll-m-20 text-yellow-500 text-3xl font-semibold tracking-tight'>
                    - Packages -
                </h1>
            </div>

            <div className='max-w-7xl mx-auto px-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            className='bg-cyan-800 text-white p-8 rounded-2xl shadow-lg'
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <h1 className='text-2xl font-semibold py-4 text-center text-yellow-500'>
                                {pkg.title}
                            </h1>
                            <p className='text-2xl font-semibold text-center py-3'>{pkg.price}</p>
                            <p className='font-semibold text-center pb-4'>
                                {pkg.description}
                            </p>
                            <ul className='list-disc list-inside space-y-2'>
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
