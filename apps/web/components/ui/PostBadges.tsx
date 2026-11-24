import Link from "next/link";
import type { AiUse, PostProvenance } from "@/lib/blog";
import neutral from "./Neutral.module.css";
import styles from "./PostBadges.module.css";

export interface PostBadgeLabels {
  aiUse: string;
  aiLevels: Record<AiUse, string>;
  reviewedBy: string;
  verified: string;
  explainer: string;
  editorialFor: string;
}

interface Props {
  provenance: PostProvenance;
  labels: PostBadgeLabels;
}

/** One quiet provenance line under a post's meta. AMS-written posts show nothing. */
export function PostBadges({ provenance, labels }: Props) {
  const items: React.ReactNode[] = [];
  if (provenance.aiUse) {
    items.push(<span key="ai">{labels.aiUse}: {labels.aiLevels[provenance.aiUse]}</span>);
  }
  if (provenance.reviewedBy) {
    const { name, role } = provenance.reviewedBy;
    items.push(<span key="review">{labels.reviewedBy} {name ? `${name}, ${role}` : role}</span>);
  }
  if (provenance.explainerVerified) {
    items.push(<span key="badge" className={styles.badge}>{labels.verified}</span>);
  }
  if (provenance.explainerUrl) {
    items.push(
      <a key="explainer" href={provenance.explainerUrl} className={neutral.textLink} target="_blank" rel="noopener noreferrer">
        {labels.explainer}
      </a>,
    );
  }
  if (provenance.monthly) {
    items.push(
      <Link key="monthly" href={`/monthly/${provenance.monthly}/solution`} className={neutral.textLink}>
        {labels.editorialFor} #{provenance.monthly}
      </Link>,
    );
  }
  if (items.length === 0) return null;
  return <div className={styles.provenance}>{items}</div>;
}
