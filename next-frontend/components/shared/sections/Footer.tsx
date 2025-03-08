import FadeUpOnScroll from "@/components/animations/FadeUpOnScroll";
import { contactFooter, informationsFooter, servicesFooter } from "@/data/data";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mx-7">
      <div className="flex flex-col justify-between border-t pt-4 text-xs sm:text-sm md:text-base lg:py-8">
        <FadeUpOnScroll delay={0.1}>
          <h3 className="text-foreground my-6 text-3xl leading-tight sm:text-4xl">
            LA VILLA <span className="text-primary">MIDNIGHT</span>
          </h3>
        </FadeUpOnScroll>

        <div className="gap-x-2 md:flex md:flex-row md:justify-between">
          <div className="mb-6">
            <FadeUpOnScroll delay={0.2}>
              <span className="text-muted-foreground text-xl uppercase sm:text-2xl">
                Services
              </span>
            </FadeUpOnScroll>
            <div className="mt-6 flex flex-col gap-y-2 text-base sm:text-lg">
              {servicesFooter.map((service, index) => (
                <FadeUpOnScroll delay={0.3 + index * 0.1} key={service.name}>
                  <Link
                    href={service.link}
                    className="hover:text-primary font-medium"
                  >
                    {service.name}
                  </Link>
                </FadeUpOnScroll>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <FadeUpOnScroll delay={0.2}>
              <span className="text-muted-foreground text-xl uppercase sm:text-2xl">
                Contact
              </span>
            </FadeUpOnScroll>
            <div className="mt-6 flex flex-col gap-y-2 text-base sm:text-lg">
              {contactFooter.map((contact, index) => (
                <FadeUpOnScroll delay={0.3 + index * 0.1} key={contact.title}>
                  <span className="flex flex-row items-center gap-x-2 font-medium">
                    <contact.icon className="size-7" />
                    {contact.title}
                  </span>
                </FadeUpOnScroll>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <FadeUpOnScroll delay={0.2}>
              <span className="text-muted-foreground text-xl uppercase sm:text-2xl">
                Informations
              </span>
            </FadeUpOnScroll>
            <div className="mt-6 flex flex-col gap-y-2 text-base sm:text-lg">
              {informationsFooter.map((info, index) => (
                <FadeUpOnScroll delay={0.3 + index * 0.1} key={info.name}>
                  <Link
                    href={info.link}
                    aria-label={info.ariaLabel}
                    className="hover:text-primary font-medium"
                  >
                    {info.name}
                  </Link>
                </FadeUpOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
