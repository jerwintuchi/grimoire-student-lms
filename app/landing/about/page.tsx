import React from "react";
import MainNav from "../mainnav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="about-page bg-white">
      <MainNav />

      <section className="hero flex flex-col justify-center items-center h-screen">
        <Image
          src="/book-open.svg"
          alt="Book Icon"
          className="book-image justify-center h-20 w-20 pb-5"
        />
        <div className="hero-content w-full mx-auto max-w-screen-lg">
          <h1 className="text-3xl font-bold text-red-700 mb-4 text-center pb-10">
            Unlock Your Potential Within Grimoire
          </h1>
          <p className="text-lg black mb-4 px-20 indent-16">
            Embark on a transformative journey of self-discovery and unlock the
            magical potential that lies within you. Grimoire is your trusted
            companion on this path, a comprehensive compendium filled with the
            secrets of the arcane arts. Here, you'll craft extraordinary magical
            experiences tailored to your unique aspirations. Delve into ancient
            rituals, engage in stimulating discussions with fellow magic
            seekers, and gain valuable insights to propel you towards mastery.
            Grimoire empowers aspiring magic users of all levels, from those
            just starting to kindle their magical spark to seasoned
            practitioners seeking to refine their craft. Personalize your
            learning path by exploring a vast array of magical disciplines, and
            meticulously track your progress as you ascend the heights of
            magical knowledge.
          </p>
          <p className="text-lg black mb-4 px-20">
            Within the pages of Grimoire, you'll find not just instruction but
            also inspiration. Our vibrant community fosters a supportive
            environment where you can share experiences, collaborate with
            others, and ignite your magical passion. Embrace the power that lies
            within and embark on your magical odyssey with Grimoire as your
            guide.
          </p>
          <p className="text-lg black mb-4 px-20">
            With interactive rituals, mystical discussions, and potent progress
            insights, our Grimoire empowers aspiring magic users of all levels.
          </p>
        </div>
      </section>

      <section className="benefits pb-5">
        <h2 className="text-2xl font-bold text-red-700 mb-4 text-center justify-center pb-20">
          Benefits of Grimoire
        </h2>
        <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 gap-x-48 gap-y-10 px-20 ml-10 mb-10">
          <div className="benefit">
            <i className="fas fa-check-circle black text-3xl mb-2"></i>
            <h3 className="text-lg font-medium text-red-700 mb-2">
              Increased Magical Engagement
            </h3>
            <p className="text-base black">
              Engaging scholarly knowledge and exercises keep you motivated and
              improve your magical affinity. The knowledge and skills gained
              prepare you for greater arcane feats.
            </p>
          </div>
          <div className="benefit">
            <i className="fas fa-chart-line black text-3xl mb-2"></i>
            <h3 className="text-lg font-medium text-red-700 mb-2">
              Improved Arcane Mastery
            </h3>
            <p className="text-base black">
              Track your progress and personalize your magical studies for
              greater mastery. Gain insights into your strengths and weaknesses
              through self-reflection and guidance from fellow magic users.
            </p>
          </div>
          <div className="benefit">
            <i className="fas fa-users black text-3xl mb-2"></i>
            <h3 className="text-lg font-medium text-red-700 mb-2">
              Streamlined Spellcasting Knowledge
            </h3>
            <p className="text-base black">
              Say goodbye to cumbersome spellbook organization. Grimoire
              empowers you to manage your spells, casting, and resources
              efficiently. With intuitive tools for knowledge organization and
              sharing, you can focus on what matters most - achieving true
              magical power.
            </p>
          </div>
        </div>
      </section>

      <p className="text-sm text-red-700 text-center mb-4">
        Contact us to learn more about how our Grimoire can empower your magical
        journey. (+63) 91234567891
      </p>

      <section className="call-to-action">
        <div className="cta-container flex justify-center items-center px-20 py-8 bg-red-900 black">
          <h3 className="text-xl font-bold mb-2 mr-64">
            Ready to empower your magical journey experience?
            <div className="pt-6">
              <Link href="/sign-up">
                <Button
                  variant="ghost"
                  className="bg-red-700 hover:bg-red-600 black font-bold px-4 rounded-md">
                  Start Your Free Trial
                </Button>
              </Link>
            </div>
          </h3>

          <div className="ml-10 flex items-center">
            <Image
              className="h-32 w-32 pr-4"
              src="/grimoire-logo.svg"
              alt="Logo Icon"
              width={50} // specify the width of the image
              height={50} // specify the height of the image
            />
            <div className="text-xs mb-3.5">© 2024 Grimoire.</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
