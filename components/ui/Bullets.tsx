type BulletBlock = {
  title?: string;
  bullets: string[];
};

type BulletsProps = {
  blocks?: BulletBlock[];
};

export function Bullets({ blocks }: BulletsProps) {
  if (!blocks?.length) {
    return null;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {blocks.map((block, index) => (
        <div
          key={`${block.title ?? "block"}-${index}`}
          className="rounded-xl border border-black/10 bg-white/70 p-5"
        >
          {block.title ? (
            <h3 className="text-lg font-[var(--font-display)] text-[var(--text-main)]">
              {block.title}
            </h3>
          ) : null}
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--text-muted)]">
            {block.bullets.map((bullet, bulletIndex) => (
              <li key={`${bullet.slice(0, 20)}-${bulletIndex}`}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
