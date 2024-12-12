/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface CardProps {
  href: string;
  imgSrc?: string;
  icon?: ReactNode;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({
  href,
  imgSrc,
  icon,
  title,
  description,
}) => (
  <div className="grid card h-[250px] w-[250px] items-end justify-center rounded-xl bg-white shadow-lg">
    <Link href={href} className="grid  items-center justify-center text-center">
      <div className="flex justify-center">
        <div className="grid h-[87px] w-[87px] items-center justify-center rounded-full bg-[#FAEFEF]">
          {imgSrc ? <img src={imgSrc} alt={title} /> : icon}
        </div>
      </div>
      <p className="mt-2 text-[16px] font-semibold ">{title}</p>
      <div className="mt-4 flex items-end rounded-xl">
        <div className="flex h-[80px] w-[250px] items-center rounded-b-xl bg-[#FAEFEF] card px-2.5 text-start text-[13px] font-semibold text-[#526484]">
          <p>{description}</p>
        </div>
      </div>
    </Link>
  </div>
);

export default Card;