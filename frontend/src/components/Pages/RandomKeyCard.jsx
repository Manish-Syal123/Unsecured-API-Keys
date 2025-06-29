import React, { useContext, useEffect, useState } from "react";
import { KeysContext } from "../../context/KeysContext";
import { Copy, Eye, ExternalLink } from "lucide-react";

const RandomKeyCard = ({ isRandom }) => {
  const { allKeysData } = useContext(KeysContext);
  const [randomKeyData, setRandomKeyData] = React.useState(null);
  const [copied, setCopied] = useState(false);

  // Helper function to calculate age string from firstFound date
  function calculateAge(firstFound) {
    if (!firstFound) return "";
    const firstDate = new Date(firstFound);
    if (isNaN(firstDate)) return "";

    const now = new Date();
    const diffMs = now - firstDate;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSeconds < 60) {
      return `${diffSeconds} second${diffSeconds !== 1 ? "s" : ""} ago`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    } else if (diffWeeks < 5) {
      return `${diffWeeks} week${diffWeeks !== 1 ? "s" : ""} ago`;
    } else if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
    } else {
      return `${diffYears} year${diffYears !== 1 ? "s" : ""} ago`;
    }
  }

  useEffect(() => {
    // Set random key immediately on mount
    const initialRandomKey = getRandomKey();
    setRandomKeyData(initialRandomKey);

    const interval = setInterval(() => {
      const newRandomKey = getRandomKey();
      setRandomKeyData(newRandomKey);
    }, 60000); // Update every 60 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [allKeysData, isRandom]);

  function getRandomKey() {
    if (allKeysData && allKeysData.length > 0) {
      const randomIndex = Math.floor(Math.random() * allKeysData.length);
      return allKeysData[randomIndex];
    }
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(randomKeyData?.key || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="container mx-auto px-4 py-2.5 max-w-4xl border rounded-md shadow-lg h-[30rem] mb-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold inline-flex items-center gap-2">
          Exposed Key!!{" "}
          <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-[#4285F4]/5 text-[#4285F4] border-[#4285F4]/20 border">
            {randomKeyData?.provider}
          </span>
        </h2>
        <p className="flex gap-2.5 items-center text-center">
          <Eye size={17} /> {randomKeyData?.views} views
        </p>
      </div>
      {/* Key */}
      <div className="inline-flex items-center justify-between gap-2 border border-default px-4 py-2 rounded-lg bg-transparent w-full text-base text-foreground">
        <pre className="font-mono text-inherit bg-transparent whitespace-normal break-all">
          <span className="select-none">$ </span>
          <span>{randomKeyData?.key}</span>
        </pre>
        <button
          type="button"
          aria-label="Copy to clipboard"
          onClick={handleCopy}
          className="relative group inline-flex items-center justify-center w-8 h-8 rounded-sm text-lg text-inherit hover:bg-transparent transition"
        >
          <Copy />
        </button>
      </div>
      {/* Details section */}
      <div className="mt-9">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-9">
          {/* Left Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-default-700">Status:</span>
              <span className="px-2 py-0.5 rounded-full text-sm font-medium bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20">
                {randomKeyData?.status}
              </span>
              <span className="text-xs text-default-400">
                {randomKeyData?.verifiedAt}
              </span>
            </div>
            <div>
              <span className="font-semibold text-default-700">
                First Found:
              </span>{" "}
              <span className="text-default-600">
                {new Date(randomKeyData?.firstFound).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="font-semibold text-default-700">Age:</span>{" "}
              <span className="text-default-600">
                {calculateAge(randomKeyData?.firstFound)}
              </span>
              {/* Based on the first found and the current date calculate the Ages ago eg: 5 days ago , 1week ago etc */}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <div>
              <span className="font-semibold ">Repository:</span>
              <a
                className="inline-flex items-center ml-2 font-medium text-blue-400 hover:opacity-80 transition-opacity gap-1.5"
                href={`https://github.com/${randomKeyData?.owner}/${randomKeyData?.repoName}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {randomKeyData?.repoName}
                <ExternalLink size={20} />
              </a>
            </div>
            <div>
              <span className="font-semibold ">Owner:</span>
              <a
                className="inline-flex items-center ml-2 font-medium text-blue-400 hover:opacity-80 transition-opacity"
                href={`https://github.com/${randomKeyData?.owner}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {randomKeyData?.owner}
              </a>
            </div>
            <div>
              <span className="font-semibold block mb-1">File:</span>
              <a
                className="inline-flex items-center hover:opacity-80 transition-opacity gap-1.5"
                href={`https://github.com/${randomKeyData?.owner}/${randomKeyData?.repoName}/blob/${randomKeyData?.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <code className="px-2 py-1 rounded bg-slate-400 text-sm font-bold">
                  {randomKeyData?.filePath}
                </code>
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Context */}
        <div className="pt-4 border-t border-default-200 dark:border-default-100">
          <span className="font-semibold text-default-700 block mb-2">
            Context:
          </span>
          <code className="block p-3 text-sm font-mono rounded bg-default-100 dark:bg-default-50 break-all whitespace-pre-wrap max-w-full text-default-700">
            {randomKeyData?.context}
          </code>
          <p className="mt-2 text-sm text-default-400">
            Line {randomKeyData?.lineNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RandomKeyCard;
