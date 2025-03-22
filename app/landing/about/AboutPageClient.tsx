"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import MainNav from '../mainnav';
import Image from 'next/image';

export default function AboutPageClient() {
    return (
        <div className="about-page bg-white">
            <MainNav />

            <section className="hero flex flex-col justify-center items-center min-h-screen px-6 text-center">
                <Image
                    src="/book-open.svg"
                    width={50}
                    height={50}
                    alt="Book Icon"
                    className="h-20 w-20 pb-5"
                />
                <div className="hero-content w-full max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-4">Unlock Your Potential Within Grimoire</h1>
                    <p className="text-lg text-gray-800 mb-4 px-4 md:px-10">
                        Embark on a transformative journey of self-discovery and unlock the magical potential within. Grimoire is your trusted companion on this path, filled with the secrets of the arcane arts.
                    </p>
                </div>
            </section>

            <section className="benefits py-10 px-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-red-700 mb-6">Benefits of Grimoire</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="benefit p-6 bg-gray-100 rounded-lg shadow-md">
                        <i className="fas fa-check-circle text-red-700 text-3xl mb-2"></i>
                        <h3 className="text-lg font-medium text-red-700 mb-2">Increased Magical Engagement</h3>
                        <p className="text-gray-700">Engaging scholarly knowledge and exercises keep you motivated and improve your magical affinity.</p>
                    </div>
                    <div className="benefit p-6 bg-gray-100 rounded-lg shadow-md">
                        <i className="fas fa-chart-line text-red-700 text-3xl mb-2"></i>
                        <h3 className="text-lg font-medium text-red-700 mb-2">Improved Arcane Mastery</h3>
                        <p className="text-gray-700">Track your progress and personalize your magical studies for greater mastery.</p>
                    </div>
                    <div className="benefit p-6 bg-gray-100 rounded-lg shadow-md">
                        <i className="fas fa-users text-red-700 text-3xl mb-2"></i>
                        <h3 className="text-lg font-medium text-red-700 mb-2">Streamlined Spellcasting Knowledge</h3>
                        <p className="text-gray-700">Manage your spells, casting, and resources efficiently with intuitive tools.</p>
                    </div>
                </div>
            </section>

            <p className="text-sm text-red-700 text-center px-6 mb-6">
                Contact us to learn more about how our Grimoire can empower your magical journey. (+63) 91234567891
            </p>

            <section className="call-to-action py-8 px-6 bg-red-900 text-white text-center">
                <h3 className="text-xl font-bold mb-4">Ready to empower your magical journey experience?</h3>
                <Link href="/sign-up">
                    <Button className="bg-red-700 hover:bg-red-600 font-bold px-6 py-2 rounded-md">Start Your Free Trial</Button>
                </Link>
                <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
                    <Image src="/grimoire-logo.svg" alt="Logo Icon" width={50} height={50} className="h-16 w-16" />
                    <div className="text-xs">© 2024 Grimoire.</div>
                </div>
            </section>
        </div>
    );
}
