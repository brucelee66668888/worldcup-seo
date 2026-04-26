'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Slide = {
    title: string;
    description: string;
    href: string;
    image: string;
};

export default function HeroSlider({ slides }: { slides: Slide[] }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [slides.length]);

    const current = slides[index];

    return (
        <section className="relative h-[520px] overflow-hidden bg-black">
            <Image
                src={current.image}
                alt={current.title}
                fill
                priority
                className="object-cover opacity-60"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
                <div className="max-w-2xl">
                    <div className="mb-4 inline-block rounded-full bg-yellow-400 px-4 py-2 text-sm font-black text-black">
                        WORLD CUP 2026
                    </div>

                    <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">
                        {current.title}
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-gray-200">
                        {current.description}
                    </p>

                    <Link
                        href={current.href}
                        className="mt-8 inline-block rounded-full bg-yellow-400 px-8 py-4 font-black text-black"
                    >
                        查看详情
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-3 rounded-full transition-all ${
                            i === index ? 'w-10 bg-yellow-400' : 'w-3 bg-white/60'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}