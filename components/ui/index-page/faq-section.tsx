"use client"
import { Icons } from "@/components/icons";
import { useState } from "react";

interface FaqEventProps {
  question: string;
  answer: string;

}

export const FaqSection = () => {
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
  
       return (
      <div className="mb-4">
        <button className="text-lg font-bold cursor-pointer hover:text-blue-500 flex items-center" onClick={() => setIsOpen(!isOpen)}>
          {question}
          <span className={`inline-block transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}>
            <Icons.down/>
          </span>
        </button>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
          {isOpen && <p className="mt-2 text-sm">{answer}</p>}
        </div>
      </div>
    );
  }

  return (
      <section id="faq" className="h-[100vh] bg-secondary flex flex-col items-center justify-center scroll-snap-align-start p-8" >
      <h2 className="mb-8 mt-[-25%] text-3xl font-bold text-black">FAQ</h2>
      <div className="flex flex-col items-start max-w-[45%] max-h-[71px]">
      {faqs.map((faq, index) => (
        <FAQ key={index} question={faq.question} answer={faq.answer} />
      ))}
        </div>
    </section>
  )
}
