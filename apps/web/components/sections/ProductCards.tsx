import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRODUCTS, type Product } from "@/content/products";

const contests = PRODUCTS.filter((p) => p.kind === "contest");
const platform = PRODUCTS.find((p) => p.kind === "platform");

/** Shared chrome. The whole card is the link, so the tap target is the card
 *  (not a 20px "Explore" line), and only transform animates on hover: the
 *  lift is the raise cue, the resting shadow is static. */
const cardBase =
  "group flex h-full flex-col rounded-xl border border-burgundy/10 bg-cream-light p-5 shadow-[0_1px_3px_rgba(70,64,58,0.06)] transition-transform duration-150 hover:-translate-y-1 focus-visible:-translate-y-1";

function ExploreCue() {
  return (
    <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-burgundy">
      Explore
      <span
        aria-hidden
        className="transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1"
      >
        →
      </span>
    </span>
  );
}

function slotTint(product: Product) {
  // A pale glacier wash on the placeholder, the "quiet sub-brand cue" the
  // spec intended; the old solid-navy fill shouted over its sibling Derive
  // card. Keeps the placeholder's own dashed frame and label legible.
  return product.tone === "glacier" ? "!bg-ascent/10" : "";
}

/**
 * Block 05: the product taxonomy. The heading says "Two contests and a
 * platform", so the layout says it too: Derive and Ascent are siblings in a
 * matched 2-up row; Access is the platform, set apart as a full-width
 * horizontal card below. Breaking the equal triad makes the layout state the
 * information architecture the old three-identical-cards grid hid.
 */
export function ProductCards() {
  return (
    <section className="py-section">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we run"
            title="Two contests and a platform."
          />
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {contests.map((product, index) => (
            <li key={product.eyebrow} className="h-full">
              <Reveal delay={index * 120} className="h-full">
                <Link href={product.href} className={cardBase}>
                  <div className="overflow-hidden rounded-lg">
                    <PhotoPlaceholder
                      label={product.screenshotLabel}
                      aspect="aspect-[16/10]"
                      rounded="rounded-none"
                      className={`transition-transform duration-300 group-hover:scale-[1.02] group-focus-visible:scale-[1.02] ${slotTint(product)}`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col pt-6">
                    <Eyebrow>{product.eyebrow}</Eyebrow>
                    <h3 className="mt-3 font-display text-card-title text-burgundy">
                      {product.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed">
                      {product.body}
                    </p>
                    <ExploreCue />
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        {platform && (
          <Reveal delay={120} className="mt-6">
            <Link
              href={platform.href}
              className="group grid gap-6 rounded-xl border border-burgundy/10 bg-cream-light p-5 shadow-[0_1px_3px_rgba(70,64,58,0.06)] transition-transform duration-150 hover:-translate-y-1 focus-visible:-translate-y-1 lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-6"
            >
              <div className="overflow-hidden rounded-lg lg:col-span-7">
                <PhotoPlaceholder
                  label={platform.screenshotLabel}
                  aspect="aspect-[16/9]"
                  rounded="rounded-none"
                  className="transition-transform duration-300 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
                />
              </div>
              <div className="flex flex-col lg:col-span-5">
                <Eyebrow>{platform.eyebrow}</Eyebrow>
                <h3 className="mt-3 font-display text-card-title text-burgundy">
                  {platform.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed">
                  {platform.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-burgundy">
                  Explore
                  <span
                    aria-hidden
                    className="transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
