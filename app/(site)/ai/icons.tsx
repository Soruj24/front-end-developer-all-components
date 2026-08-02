"use client";

import type { SVGProps } from "react";

function Svg({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" {...props}>
      {children}
    </svg>
  );
}

const path = {
  close: "M6 18L18 6M6 6l12 12",
  menu: "M4 6h16M4 12h16M4 18h16",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  sun: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  moon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
  copy: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
  regenerate: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  trash: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  thumbUp: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5",
  thumbDown: "M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5",
  paperclip: "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13",
  image: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  mic: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
};

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path.close} />
    </Svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path.menu} />
    </Svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path.search} />
    </Svg>
  );
}

export function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path.sun} />
    </Svg>
  );
}

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path.moon} />
    </Svg>
  );
}

export function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path.copy} />
    </Svg>
  );
}

export function RegenerateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path.regenerate} />
    </Svg>
  );
}

export function EditIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path.edit} />
    </Svg>
  );
}

export function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path.trash} />
    </Svg>
  );
}

export function ThumbsUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path.thumbUp} />
    </Svg>
  );
}

export function ThumbsDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path.thumbDown} />
    </Svg>
  );
}

export function PaperclipIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path.paperclip} />
    </Svg>
  );
}

export function ImageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path.image} />
    </Svg>
  );
}

export function MicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path.mic} />
    </Svg>
  );
}
