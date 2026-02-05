type InfoBlockProps = {
  paragraphs?: string[];
};

export function InfoBlock({ paragraphs }: InfoBlockProps) {
  if (!paragraphs?.length) {
    return null;
  }

  return (
    <div className="space-y-4 text-base leading-7 text-[var(--text-muted)]">
      {paragraphs.map((paragraph, index) => (
        <p key={`${paragraph.slice(0, 20)}-${index}`}>{paragraph}</p>
      ))}
    </div>
  );
}
