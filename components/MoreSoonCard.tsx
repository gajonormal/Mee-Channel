import Card from "./Card";

export default function MoreSoonCard() {
  return (
    <Card
      href="https://youtu.be/Twi92KYddW4?si=LM1JvqEPtILYxLQd"
      additionalClasses="bg-[#F7F7F7]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="w-28 h-28 m-auto group-hover:rotate-90 duration-300"
        src="/assets/disc.png"
        alt="Disc"
      />
      <p className="absolute bottom-4 left-[22px] text-xl text-[#010313]/50 font-semibold">
        more soon...
      </p>
    </Card>
  );
}
