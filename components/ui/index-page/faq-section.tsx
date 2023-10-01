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
    triggerOnce: true, 
  });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  function FAQ({ question, answer,index }: FaqEventProps &{index:number}) {
        const isOpen = openFaqIndex === index;

    useEffect(() => {
        if (isOpen) {
           
        }
    }, [isOpen]);
       return (
        <div className={`mb-4 rounded-lg  bg-card p-4 shadow-md transition-colors md:w-[650px] lg:w-[700px] xl:w-[789px] 2xl:w-[786px] ${isOpen ? 'bg-popover' : 'hover:bg-popover'}`}>
          
           <button 
                className={`flex w-full cursor-pointer items-center justify-between text-[1.3rem] font-bold transition-colors duration-300 hover:text-primary hover:underline `} 
             onClick={() => {
               if (isOpen) {
                    setOpenFaqIndex(null)
               } else {
                 setOpenFaqIndex(index)
                  }
                }}
            >{question}
          <span className={`ml-2 inline-block transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <Icons.down/>
          </span>
        </button>
        <div className={`mt-2 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'opacity-1 max-h-[1000px]' : 'max-h-0 opacity-0'}`}>
          {isOpen && <p className="text-m mt-[4%]">{answer}</p>}
        </div>
      </div>
    );
  }

  return (
    <section id="faq" className="flex h-[100vh] flex-col items-center justify-center  p-8 scroll-snap-align-start" >
      <h2 ref={ref}  className={`mb-8 mt-[-5%] text-3xl font-bold text-foreground ${!inView ? 'translate-y-5 opacity-0' : 'animate-fade-in-up'}  `}>FAQ</h2>
      <div ref={ref} className={`flex  max-h-[42vh] w-[80%] max-w-[786px] flex-col items-start ${!inView ? 'translate-y-5 opacity-0' : 'animate-fade-in-up'}`}>
      {faqs.map((faq, index) => (
        <FAQ key={index} index={index} question={faq.question} answer={faq.answer} />
      ))}
        </div>
    </section>
  )
}
