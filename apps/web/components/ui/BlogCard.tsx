import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@astryxdesign/core/AspectRatio";
import { Card } from "@astryxdesign/core/Card";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import "@astryxdesign/core/astryx.css";
import styles from "./BlogCard.module.css";

interface Props {
  href: string;
  title: string;
  description: string;
  tags: readonly string[];
  image: { src: string; alt: string };
  author: string;
  authorImage: string | null;
  date: string;
  dateLabel: string;
  headingLevel: 2 | 3;
  readLabel: string;
  priority?: boolean;
}

/** Astryx primitives with a local AMS token scope and one real navigation link. */
export function BlogCard({
  href, title, description, tags, image, author, authorImage,
  date, dateLabel, headingLevel, readLabel, priority = false,
}: Props) {
  return (
    <article className={styles.article}>
      <Card padding={0} elevation="none" className={styles.card}>
        <AspectRatio ratio={1200 / 630} className={styles.media}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 596px, (min-width: 640px) calc((100vw - 88px) / 2), calc(100vw - 40px)"
            className={styles.image}
          />
        </AspectRatio>
        <div className={styles.body}>
          {tags.length > 0 && (
            <ul className={styles.tags}>
              {tags.map((tag) => (
                <li key={tag}>
                  <Token label={tag} size="md" className={styles.tag} />
                </li>
              ))}
            </ul>
          )}
          <Heading level={headingLevel} className={styles.title}>
            <Link href={href} className={styles.link}>{title}</Link>
          </Heading>
          <Text as="p" color="secondary" className={styles.description}>
            {description}
          </Text>
          <div className={styles.footer}>
            <div className={styles.byline}>
              {authorImage && (
                <Image src={authorImage} alt="" width={32} height={32} className={styles.avatar} />
              )}
              <div>
                <Text as="p" weight="medium" className={styles.author}>{author}</Text>
                <time dateTime={date} className={styles.date}>{dateLabel}</time>
              </div>
            </div>
            <span className={styles.read} aria-hidden="true">
              {readLabel}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h16m-6-6 6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </Card>
    </article>
  );
}
