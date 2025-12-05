"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GraduationCap } from "lucide-react";

interface FAQQuestion {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

interface FAQCategory {
  category: string;
  questions: FAQQuestion[];
}

interface FAQsClientProps {
  faqCategories: FAQCategory[];
}

export function FAQsClient({ faqCategories }: FAQsClientProps) {
  const [openItem, setOpenItem] = useState<string>("");

  useEffect(() => {
    // Handle hash on initial load and on hash change
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the '#'
      if (hash) {
        // Find which accordion item contains this ID
        let foundValue = "";
        faqCategories.forEach((category, categoryIndex) => {
          category.questions.forEach((faq, faqIndex) => {
            if (faq.id === hash) {
              foundValue = `${categoryIndex}-${faqIndex}`;
            }
          });
        });

        if (foundValue) {
          // Open the accordion item
          setOpenItem(foundValue);

          // Wait for accordion to open, then scroll smoothly
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          }, 100);
        }
      }
    };

    // Handle on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [faqCategories]);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-skillmatch-primary-green/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-skillmatch-primary-green" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {category.category}
                </h2>
              </div>

              <Accordion
                type="single"
                collapsible
                className="space-y-4"
                value={openItem}
                onValueChange={setOpenItem}
              >
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${categoryIndex}-${faqIndex}`}
                    id={faq.id}
                    className="border rounded-lg px-6 bg-card hover:bg-accent/5 transition-colors scroll-mt-24"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-5">
                      <span className="font-semibold text-base md:text-lg">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pt-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
