import { useInView } from "framer-motion";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "../../../data/data";
import Title from "../../ui/title";
import { cn } from "../../../lib/utils";

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }

  return result;
}

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: { text: string; name: string; experienceType: string }[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          className={cn(
            "text-lg",
            reviewClassName?.(reviewIndex % reviews.length)
          )}
          text={review.text}
          name={review.name}
          experienceType={review.experienceType}
        />
      ))}
    </div>
  );
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  name: string;
  experienceType: string;
}

function Review({
  text,
  name,
  experienceType,
  className,
  ...props
}: ReviewProps) {
  const POSSIBLE_ANIMATION_DELAYS = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  return (
    <div
      className={cn(
        "animate-fade-in rounded-[2.25rem] border p-8 opacity-0 hover:border-primary transition-all duration-300 shadow-xl shadow-slate-900/5",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <p className="text-pretty md:text-md">{text}</p>
      <span className="mt-4 block text-muted-foreground">{name}</span>
      <span className="text-lg font-semibold text-primary">
        {experienceType}
      </span>
    </div>
  );
}

function ReviewGrid({ isVisible }: { isVisible: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const columns = splitArray(TESTIMONIALS, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = columns[2];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 md:mt-28 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3",
        isVisible && "animate-fade-in"
      )}
    >
      {isVisible ? (
        <>
          <ReviewColumn reviews={column1} msPerPixel={30} />
          <ReviewColumn
            reviews={column2}
            className="hidden md:block"
            msPerPixel={40}
          />
          <ReviewColumn
            reviews={column3}
            className="hidden xl:block"
            msPerPixel={30}
          />
        </>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-neutral-950" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950" />
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  return (
    <div>
      <Title text="Témoignages des plus" highlight="Courageux" />
      <div
        ref={containerRef}
        className="px-4 opacity-0 transition-opacity duration-700 ease-in-out md:px-6 lg:px-8 xl:px-20 2xl:px-32"
        style={{ opacity: isInView ? 1 : 0 }}
      >
        <ReviewGrid isVisible={isInView} />
      </div>
    </div>
  );
}
