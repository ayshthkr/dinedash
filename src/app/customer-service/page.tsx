import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";
import Form from "./form";

export default function Page() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <div className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container grid gap-8 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Welcome to Dinedash</h2>
              <p className="mb-8">
                We are a family-owned restaurant that has been serving the
                community for over 4 years. Our menu features a wide variety of
                delicious dishes made with fresh, locally-sourced ingredients.
              </p>
              <Link href={"/order"}>
                <Button variant={"default"}>View Menu</Button>
              </Link>
            </div>
            <div className="rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
              <Form />
            </div>
          </div>
        </section>
        <section className="bg-secondary text-secondary-foreground py-12 md:py-24 lg:py-32">
          <div className="container grid gap-8 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold">Address</h3>
                  <p>Chandni Chowk, Delhi</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Phone</h3>
                  <p>+91 9988776655</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Hours</h3>
                  <p>Monday - Saturday: 11am - 10pm</p>
                  <p>Sunday: 12pm - 9pm</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <h3 className="text-lg font-bold">
                      What is your refund policy?
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      We offer a full refund for any unused portion of your meal
                      within 24 hours of your visit. Simply contact our customer
                      service team and we&apos;ll be happy to assist you.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <h3 className="text-lg font-bold">
                      Do you accommodate dietary restrictions?
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Yes, we are happy to accommodate a variety of dietary
                      restrictions, including vegetarian, and non-vegetarian
                      options. Please let your server know about any special
                      dietary needs when you place your order.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <h3 className="text-lg font-bold">
                      Do you offer catering services?
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      No, currently we don&apos;t offer catering services for events.
                      Our team can work with you to create a custom menu and
                      handle all the logistics. Please contact our coordinator
                      for more information.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
