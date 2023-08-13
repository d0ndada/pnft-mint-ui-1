"use client"
import { Icons } from "@/components/icons";
import { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';

interface FaqEventProps {
  question: string;
  answer: string;

}

export const FaqSection = () => {
   const { ref, inView } = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
  });
  const faqs = [
    {
      question: "I've never purchased an NFT before, tell me where to start?",
      answer: "The first thing you should do is download MetaMask, a browser plugin that will act as your interface to the Ethereum Network. You'll also want some ETH, which can be purchased via a fiat on-ramp such as Coinbase or PayPal. From there, you'll send the ETH to your MetaMask address and will be able to use any DeFi service that connects to MetaMask!"
    },
    {
      question: "How many dogs will there be?",
      answer: "There will be 8888 Dogs."
    },
    // Add more FAQs as needed
  
  ];
  function FAQ({ question, answer }: FaqEventProps) {
      const [isOpen, setIsOpen] = useState(false);
    // Close other FAQ items when one is opened
    useEffect(() => {
        if (isOpen) {
            // Close other FAQ items logic here
        }
    }, [isOpen]);
       return (
        <div className={`mb-4 p-4 rounded-lg transition-colors shadow-md ${isOpen ? 'bg-[#ffebcd]' : 'hover:bg-[#f9e5c9]'}`}>
         <button 
                className={`flex cursor-pointer items-center text-[1.3rem] font-bold hover:text-primary hover:underline transition-colors duration-300 `} 
                onClick={() => setIsOpen(!isOpen)}
            >{question}
          <span className={`inline-block ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <Icons.down/>
          </span>
        </button>
        <div className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
          {isOpen && <p className="mt-[4%] text-m  ">{answer}</p>}
        </div>
      </div>
    );
  }

  return (
      <section id="faq" className="flex h-[100vh] flex-col items-center justify-center  p-8 scroll-snap-align-start" >
      <h2 ref={ref}  className={`mb-8 mt-[-25%] text-3xl font-bold text-foreground ${inView ? 'animate-fade-in-up' : ''}  `}>FAQ</h2>
      <div ref={ref} className={`flex max-h-[71px] max-w-[649px] flex-col items-start ${inView ? 'animate-fade-in-up' : ''}`}>
      {faqs.map((faq, index) => (
        <FAQ key={index} question={faq.question} answer={faq.answer} />
      ))}
        </div>
    </section>
  )
}
