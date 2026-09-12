import { useId } from "react";

export function Logo({
  size = 36,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const bg = `sr-bg-${id}`;
  const cyan = `sr-cyan-${id}`;
  const violet = `sr-violet-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      className={className}
      role="img"
      aria-labelledby={`${id}-title`}
    >
      <title id={`${id}-title`}>ShadowReference</title>
      <defs>
        <linearGradient id={bg} x1="4" y1="2" x2="30" y2="32">
          <stop stopColor="#10182C" />
          <stop offset="1" stopColor="#070B16" />
        </linearGradient>
        <linearGradient id={cyan} x1="6" y1="6" x2="24" y2="26">
          <stop stopColor="#67E8F9" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
        <linearGradient id={violet} x1="8" y1="8" x2="26" y2="26">
          <stop stopColor="#C4B5FD" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill={`url(#${bg})`} />
      <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="7.4" stroke="#22D3EE" strokeOpacity="0.28" />
      <path fill={`url(#${violet})`} d="M10.2 16.8C10.2 10.4 15.2 6.6 21.6 8.8C18.2 10.2 16.2 13.4 16.2 16.8C16.2 20.2 18.2 23.4 21.6 24.8C15.2 27 10.2 23.2 10.2 16.8Z" />
      <path fill={`url(#${cyan})`} d="M8.6 16C8.6 9.2 14 5.2 20.8 7.6C17.2 8.9 15.1 12.1 15.1 16C15.1 19.9 17.2 23.1 20.8 24.4C14 26.8 8.6 22.8 8.6 16Z" />
      <path fill={`url(#${cyan})`} d="M20.8 7.6C23.8 6.4 26.2 8.8 24.6 11.2C23.9 10.1 22.4 9.2 20.8 9Z" />
      <path fill="#A78BFA" d="M22.6 12.8 25.8 16.4 22.6 20 19.4 16.4Z" />
      <path fill="#E0F7FA" d="M22.2 12.5 25.6 16.4 22.2 20.3 18.8 16.4Z" />
    </svg>
  );
}
