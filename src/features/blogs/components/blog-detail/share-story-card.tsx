"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface ShareStoryCardProps {
  title?: string;
  url?: string;
}

export function ShareStoryCard({ title = "", url }: ShareStoryCardProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: "facebook" | "twitter" | "linkedin" | "copy") => {
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank");
        break;
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, "_blank");
        break;
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, "_blank");
        break;
      case "copy":
        if (navigator.clipboard) {
          navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
        break;
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-[20px] border border-[#343B5515] bg-white px-5 py-3 shadow-[0px_4px_16px_0px_rgba(52,59,85,0.04)]">
      <div className="flex items-center gap-2 text-xs font-semibold text-[#343B55]">
        <Share2 size={16} className="text-[#198399]" />
        <span>Share:</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Facebook */}
        <button
          type="button"
          onClick={() => handleShare("facebook")}
          aria-label="Share on Facebook"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF7F2] text-[#343B55] transition-colors hover:bg-[#343B55] hover:text-white cursor-pointer"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>

        {/* X / Twitter */}
        <button
          type="button"
          onClick={() => handleShare("twitter")}
          aria-label="Share on X"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF7F2] text-[#343B55] transition-colors hover:bg-[#343B55] hover:text-white cursor-pointer"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* LinkedIn */}
        <button
          type="button"
          onClick={() => handleShare("linkedin")}
          aria-label="Share on LinkedIn"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF7F2] text-[#343B55] transition-colors hover:bg-[#343B55] hover:text-white cursor-pointer"
        >
          <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </button>

        {/* Copy Link */}
        <button
          type="button"
          onClick={() => handleShare("copy")}
          aria-label="Copy link"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF7F2] text-[#343B55] transition-colors hover:bg-[#343B55] hover:text-white cursor-pointer relative"
        >
          {copied ? <Check size={14} className="text-[#198399]" /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}

