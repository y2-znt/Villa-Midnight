import { Link } from "react-router";
import {
  contactFooter,
  informationsFooter,
  servicesFooter,
} from "../../../data/data";
import FadeUpOnScroll from "../../animations/FadeUpOnScroll";

const Footer = () => {
  return (
    <footer className="mx-7">
      <div className="flex flex-col justify-between border-t pt-4 text-xs sm:text-sm md:text-base lg:py-8">
        <FadeUpOnScroll delay={0.1}>
          <h3 className="my-6 text-3xl sm:text-4xl text-foreground leading-tight">
            LA VILLA <span className="text-primary">MIDNIGHT</span>
          </h3>
        </FadeUpOnScroll>

        <div className="gap-x-2 md:flex md:flex-row md:justify-between">
          <div className="mb-6">
            <FadeUpOnScroll delay={0.2}>
              <span className="text-xl sm:text-2xl uppercase text-muted-foreground">
                Services
              </span>
            </FadeUpOnScroll>
            <div className="mt-6 flex flex-col gap-y-2 text-base sm:text-lg">
              {servicesFooter.map((service, index) => (
                <FadeUpOnScroll delay={0.3 + index * 0.1} key={service.name}>
                  <Link
                    to={service.link}
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
              <span className="text-xl sm:text-2xl uppercase text-muted-foreground">
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
              <span className="text-xl sm:text-2xl uppercase text-muted-foreground">
                Informations
              </span>
            </FadeUpOnScroll>
            <div className="mt-6 flex flex-col gap-y-2 text-base sm:text-lg">
              {informationsFooter.map((info, index) => (
                <FadeUpOnScroll delay={0.3 + index * 0.1} key={info.name}>
                  <Link
                    to={info.link}
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
