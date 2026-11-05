"use client";

import { Breadcrumb } from "@/src/features/gallery/components/breadcrumb";
import { GalleryGrid } from "@/src/features/gallery/components/gallery-grid";
import { GalleryHero } from "@/src/features/gallery/components/gallery-hero";
import { useGalleryImagesQuery } from "@/src/features/gallery/api/get-gallery-images";
import { useTranslations } from "next-intl";

export function GallerySection() {
  const { data: images, isLoading, isError } = useGalleryImagesQuery();
  const t = useTranslations("GalleryPage.states");

  return (
    <>
      <GalleryHero />
      <Breadcrumb />

      {isLoading && (
        <section className="bg-[#FAF7F2] py-20">
          <div className="mx-auto w-full max-w-[1320px] px-4 text-center sm:px-8 lg:px-10">
            <p className="font-[family-name:var(--font-dm-sans)] text-[#5B6B73]">
              {t("loading")}
            </p>
          </div>
        </section>
      )}

      {isError && (
        <section className="bg-[#FAF7F2] py-20">
          <div className="mx-auto w-full max-w-[1320px] px-4 text-center sm:px-8 lg:px-10">
            <p className="font-[family-name:var(--font-dm-sans)] text-red-600">
              {t("error")}
            </p>
          </div>
        </section>
      )}

      {images && images.length > 0 && <GalleryGrid images={images} />}

      {images && images.length === 0 && (
        <section className="bg-[#FAF7F2] py-20">
          <div className="mx-auto w-full max-w-[1320px] px-4 text-center sm:px-8 lg:px-10">
            <p className="font-[family-name:var(--font-dm-sans)] text-[#5B6B73]">
              {t("empty")}
            </p>
          </div>
        </section>
      )}
    </>
  );
}
