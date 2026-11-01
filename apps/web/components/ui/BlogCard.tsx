import Image from "next/image";
import Link from "next/link";
import styles from "./BlogCard.module.css";

interface Props {
  href: string; title: string; description: string; tags: readonly string[];
  image: { src: string; alt: string }; author: string; authorImage: string | null;
  date: string; dateLabel: string; headingLevel: 2 | 3; readLabel: string; priority?: boolean;
}

export function BlogCard({ href, title, description, tags, image, author, authorImage, date, dateLabel, headingLevel, readLabel, priority = false }: Props) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image src={image.src} alt={image.alt} fill priority={priority} fetchPriority={priority ? "high" : undefined}
          sizes="(min-width: 1280px) 596px, (min-width: 768px) calc((100vw - 88px) / 2), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)" className={styles.image} />
      </div>
      <div className={styles.body}>
        {tags.length > 0 && <ul className={styles.tags}>{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
        <Heading className={styles.title}><Link href={href} className={styles.link}>{title}</Link></Heading>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <div className={styles.byline}>
            {authorImage && <Image src={authorImage} alt="" width={32} height={32} className={styles.avatar} />}
            <div><p className={styles.author}>{author}</p><time dateTime={date} className={styles.date}>{dateLabel}</time></div>
          </div>
          <span className={styles.read} aria-hidden="true">{readLabel}<span> →</span></span>
        </div>
      </div>
    </article>
  );
}
