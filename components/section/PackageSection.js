import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, SquareCheckBig } from 'lucide-react';

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
        <div id="packages" ref={sectionRef} className="py-12 bg-white">
            {/* Animated Heading */}
            <motion.div
                className="text-center pb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h1 className="scroll-m-20 text-yellow-500 text-5xl font-bold pb-10 tracking-tight">
                    - Packages -
                </h1>
            </motion.div>

            {/* Package Cards */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            className="bg-sky-800 text-white p-8 rounded-2xl shadow-lg"
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                            >
                                <h1 className="text-2xl font-bold py-4 text-center text-yellow-400">
                                    {pkg.title}
                                </h1>
                            </motion.div>
                            <p className="text-3xl font-bold text-center py-3 pb-8">{pkg.price}</p>
                            <p className="font-semibold text-center pb-4">
                                {pkg.description}
                            </p>
                            <ul className="space-y-2">
                                {pkg.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start space-x-2">
                                        <ShieldCheck className="mt-1 text-white" />
                                        <span className='font-semibold mr-6'>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
