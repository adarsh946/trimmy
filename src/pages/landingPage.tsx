import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [longUrl, setLongUrl] = useState<string>();
  const navigate = useNavigate();

  const handleUrl = (e: any) => {
    e.preventDefault();
    if (longUrl) {
      navigate(`/auth?createUrl=${longUrl}`);
    }
  };
  return (
    <div className="flex items-center flex-col">
      <h2 className="text-white text-center font-extrabold lg:text-7xl sm:text-6xl text-3xl my-10 sm:my-16">
        The only URL Shortener <br /> you&rsquo;ll ever need! 👇
      </h2>
      <form
        onSubmit={handleUrl}
        className="flex flex-col gap-2 sm:flex-row w-full sm:h-14 md:w-2/4"
      >
        <Input
          placeholder="Enter your URL"
          className="h-14"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <Button variant="destructive" className="h-14" type="submit">
          Shorten
        </Button>
      </form>
      <img src="banner.jpeg" alt="banner" className="my-14 md:px-11 w-full" />
      <Accordion type="multiple" className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does the Trimmy Url Shortner Works?
          </AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version of
            that URL. This shortened URL redirects to the original long URL when
            accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need an account to use the app?
          </AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account allows you to manage your URLs, view
            analytics, and customize your short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            What analytics are available for my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
            You can view the number of clicks, geolocation data of the clicks
            and device types (mobile/desktop) for each of your shortened URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default LandingPage;
