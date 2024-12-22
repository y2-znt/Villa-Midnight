import { Link } from "react-router";
import {
  contactFooter,
  informationsFooter,
  servicesFooter,
} from "../data/data";

const Footer = () => {
  return (
    <footer className="mx-7">
      <div className="flex flex-col justify-between border-t pt-4 text-xs sm:text-sm md:text-base lg:py-8">
        <h3 className="my-6 text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
          LA VILLA <span className="text-primary">MIDNIGHT</span>
        </h3>

        <div className="gap-x-2 md:flex md:flex-row md:justify-between">
          <div className="mb-6">
            <span className="text-xl sm:text-2xl uppercase text-muted-foreground">
              Services
            </span>
            <div className="mt-6 flex flex-col gap-y-2 text-base sm:text-lg">
              {servicesFooter.map((service) => (
                <Link
                  to={service.link}
                  className="hover:text-primary font-medium"
                  key={service.name}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <span className="text-xl sm:text-2xl uppercase text-muted-foreground">
              Contact
            </span>
            <div className="mt-6 flex flex-col gap-y-2 text-base sm:text-lg">
              {contactFooter.map((contact) => (
                <span
                  className="flex flex-row items-center gap-x-2 font-medium"
                  key={contact.title}
                >
                  <contact.icon className="size-7" />
                  {contact.title}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <span className="text-xl sm:text-2xl uppercase text-muted-foreground">
              Informations
            </span>
            <div className="mt-6 flex flex-col gap-y-2 text-base sm:text-lg">
              {informationsFooter.map((info) => (
                <Link
                  to={info.link}
                  aria-label={info.ariaLabel}
                  className="hover:text-primary font-medium"
                  key={info.name}
                >
                  {info.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
