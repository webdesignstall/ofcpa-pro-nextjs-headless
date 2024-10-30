import { useState } from 'react';
import { MessageCircle, SendHorizontal, X } from 'lucide-react';
import { motion } from 'framer-motion';

const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
            <motion.button
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 ,delay: 3 }}
                onClick={toggleChat}
                className="p-3 bg-orange-500 rounded-full shadow-lg text-white flex items-center justify-center hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="w-72 sm:w-96 bg-white shadow-lg rounded-lg mt-3"
                >
                    <div className="flex items-center border-b p-3 bg-red-900">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                            <img src="/user-avatar.jpg" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-3 text-center ">
                            <h4 className="text-lg font-semibold text-white flex justify-center items-center">Have a question?</h4>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto max-h-72 min-h-72 p-3">
                        <div className="mb-2">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                    <img src="/user-avatar.jpg" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div className="bg-gray-100 p-2 rounded-lg">
                                    <p className="text-sm text-gray-700">We're here to help. What's up?</p>
                                    <span className="text-xs text-gray-500">30 Oct, 8:21</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center border-t p-3">
                        <input
                            type="text"
                            placeholder="Type a message"
                            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-0 focus:ring-orange-300"
                        />
                        <button className="p-3 bg-orange-500 text-white hover:bg-orange-600 transition duration-200 mx-4 rounded-full">
                            <SendHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default LiveChat;
