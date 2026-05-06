'use client';

import { useState } from "react";
import Image from "next/image";

type CompanyLogoBadgeProps = {
  logoUrl: string | null;
  companyName: string;
};

export function CompanyLogoBadge({ logoUrl, companyName }: CompanyLogoBadgeProps) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!logoUrl || imageFailed) {
    return (
      <div
        style={{
          width: 56,
          height: 56,
          flexShrink: 0,
          borderRadius: 16,
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          border: "1px solid #dbe3ee",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 800, color: "#14213d", textTransform: "uppercase" }}>
          {companyName.slice(0, 2)}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        width: 56,
        height: 56,
        flexShrink: 0,
        borderRadius: 16,
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        border: "1px solid #dbe3ee",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src={logoUrl}
        alt={companyName}
        width={56}
        height={56}
        style={{ width: "100%", height: "100%", objectFit: "contain", padding: 8 }}
        unoptimized
        onError={() => setImageFailed(true)}
      />
    </div>
  );
}
