"use client"
import { Icons } from "@/components/icons";
import { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';
import { faqs } from "./question";

interface FaqEventProps {
  question: string;
  answer: string;

}

export const FaqSection = () => {
   const { ref, inView } = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
  });

  function FAQ({ question, answer }: FaqEventProps) {
      const [isOpen, setIsOpen] = useState(false);
    // Close other FAQ items when one is opened
    useEffect(() => {
        if (isOpen) {
            // Close other FAQ items logic here
        }
    }, [isOpen]);
       return (
        <div className={`mb-4 p-4  md:w-[650px] lg:w-[700px] xl:w-[789px] 2xl:w-[786px] rounded-lg transition-colors shadow-md bg-card ${isOpen ? 'bg-popover' : 'hover:bg-popover'}`}>
         <button 
                className={`flex cursor-pointer justify-between w-full items-center text-[1.3rem] font-bold hover:text-primary hover:underline transition-colors duration-300 `} 
                onClick={() => setIsOpen(!isOpen)}
            >{question}
          <span className={`inline-block ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <Icons.down/>
          </span>
        </button>
        <div className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-1' : 'max-h-0 opacity-0'}`}>
          {isOpen && <p className="mt-[4%] text-m">{answer}</p>}
        </div>
      </div>
    );
  }

  return (
      <section id="faq" className="flex h-[100vh] flex-col items-center justify-center  p-8 scroll-snap-align-start" >
      <h2 ref={ref}  className={`mb-8 mt-[-5%] text-3xl font-bold text-foreground ${inView ? 'animate-fade-in-up' : ''}  `}>FAQ</h2>
      <div ref={ref} className={`flex  max-h-[42vh] max-w-[786px] w-[80%] flex-col items-start ${inView ? 'animate-fade-in-up' : ''}`}>
      {faqs.map((faq, index) => (
        <FAQ key={index} question={faq.question} answer={faq.answer} />
      ))}
        </div>
    </section>
  )
}
