"use client";

import { ContactBreadcrumb } from "./contact-breadcrumb";
import { ContactForm } from "./contact-form";
import { ContactHero } from "./contact-hero";
import { ContactInfo } from "./contact-info";
import { ContactMap } from "./contact-map";

export function ContactSection() {
  return (
    <>
      <ContactHero />
      <ContactBreadcrumb />

      <section className="w-full bg-[#FAF7F2] pb-20 pt-4 sm:pb-24 sm:pt-6 md:pb-28">
        <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12">
          {/* Top Row: Form on Left, 4 Info Cards on Right */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-8 xl:gap-10">
            {/* Left: Contact Form Card */}
            <div>
              <ContactForm />
            </div>

            {/* Right: 4 Info Cards (Location, Phone, Email, Follow Us) */}
            <div>
              <ContactInfo />
            </div>
          </div>

          {/* Bottom Row: Find Us on the Map (Map + Photo) */}
          <ContactMap />
        </div>
      </section>
    </>
  );
}
