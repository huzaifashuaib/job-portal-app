import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import companies from "../../data/companies.json";
import faqs from "../../data/faqs.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  return (
    <main className="flex flex-col py-10 sm:py-20 gap-10 sm:gap-20">
      <section className="text-center">
        <h1 className="flex items-center flex-col justify-center text-4xl font-extrabold sm:text-6xl lg:text-8xl py-4 gredient-title tracking-tighter">
          Find your Dream Job{" "}
          <span className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            and get
            <img
              src="./logo.png"
              alt="hirred"
              className="h-14 sm:h-24 lg:h-32"
            />
          </span>
        </h1>
        <p className="text-gray-300 text-xs sm:text-xl sm:mt-4 ">
          Explore Thousands of Job listings and find the perfect Candidate
        </p>
      </section>
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:justify-center">
        {/* button and carosal */}

        <Link to={"/jobs-listing"}>
          <Button variant={"blue"} size={"xl"}>
            Find Jobs
          </Button>
        </Link>
        <Link to={"/post-jobs"}>
          <Button variant="destructive" size={"xl"}>
            Post Jobs
          </Button>
        </Link>
      </div>

      <div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full p-4 sm:p-10 "
        >
          <CarouselContent className="flex gap-5 sm:gap-20">
            {companies.map((item, index) => (
              <CarouselItem key={index} className="basis-1/3 sm:basis-1/6">
                <img
                  src={item.path}
                  alt={item.name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Search and apply for jobs, track applications, and more.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Post jobs, manage applications, and find the best candidates.</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Accordion
          type="single"
          collapsible
          className="bg-slate-900 p-2 rounded-md"
        >
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
};

export default LandingPage;
