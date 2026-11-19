import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "whatsapp" | "outline" | "dark" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 active:scale-[0.98] motion-reduce:active:scale-100 motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  primary: "bg-amber text-navy hover:bg-amber-600 hover:shadow-lift",
  whatsapp: "bg-whatsapp text-navy hover:bg-[#1fb957] hover:shadow-lift",
  outline: "border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white",
  dark: "bg-navy text-white hover:bg-navy-700 hover:shadow-lift",
  ghost: "text-navy hover:bg-surface-mid",
};

const sizes = { md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" } as const;

export function buttonClasses(variant: Variant = "primary", size: keyof typeof sizes = "md", extra?: string) {
  return cn(base, variants[variant], sizes[size], extra);
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: keyof typeof sizes;
  children: ReactNode;
  external?: boolean;
}

export function ButtonLink({ variant = "primary", size = "md", className, external, children, ...props }: ButtonLinkProps) {
  return (
    <a
      className={buttonClasses(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
