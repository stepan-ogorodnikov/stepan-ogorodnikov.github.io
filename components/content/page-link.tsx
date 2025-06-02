import { Link } from "@/components/content/link";
import { useAppSelector } from "@/store/hooks";
import { cva } from "class-variance-authority";
import { ArrowDown, ArrowUp } from "lucide-react";

const link = cva([
  "flex flex-row items-center justify-center gap-2",
  "relative h-12 rounded-none",
  "bg-transparent hover:bg-transparent shadow-none",
  "font-mono text-md text-link cursor-pointer",
]);

type Props = { isNext?: boolean };

export function PageLink({ isNext }: Props) {
  const prevFile = useAppSelector((state) => state.nav.prevFile);
  const nextFile = useAppSelector((state) => state.nav.nextFile);
  const filename = isNext ? nextFile : prevFile;
  const Icon = isNext ? ArrowDown : ArrowUp;

  return (
    <div className="min-w-12 h-12 min-h-12 group">
      {filename && (
        <Link
          className={link()}
          href={`/${filename}`}
        >
          {filename}
          <Icon size={16} />
        </Link>
      )}
    </div>
  );
}
