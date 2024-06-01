'use client'

import Image from "next/image";

const imageLoader = ({ src, width }: { src: string; width: number }) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/dishes/${src}`;
};

type Props = {
  url: string;
  name: string;
};

export default function SImage({ url, name }: Props) {
  return (
    <Image
      loader={imageLoader}
      src={url}
      width={1920}
      height={1080}
      alt={name}
      className="aspect-video object-cover w-full rounded-lg overflow-hidden"
    />
  );
}
