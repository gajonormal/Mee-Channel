"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ChannelBannerData {
  id: string;
  title: string;
  href: string;
  bannerContent?: ReactNode;
  originRect?: DOMRect;
}

interface ChannelBannerContextType {
  activeBanner: ChannelBannerData | null;
  openBanner: (data: ChannelBannerData) => void;
  closeBanner: () => void;
}

const ChannelBannerContext = createContext<ChannelBannerContextType | undefined>(undefined);

export function ChannelBannerProvider({ children }: { children: ReactNode }) {
  const [activeBanner, setActiveBanner] = useState<ChannelBannerData | null>(null);

  const openBanner = (data: ChannelBannerData) => {
    setActiveBanner(data);
  };

  const closeBanner = () => {
    setActiveBanner(null);
  };

  return (
    <ChannelBannerContext.Provider value={{ activeBanner, openBanner, closeBanner }}>
      {children}
    </ChannelBannerContext.Provider>
  );
}

export function useChannelBanner() {
  const context = useContext(ChannelBannerContext);
  if (context === undefined) {
    throw new Error("useChannelBanner must be used within a ChannelBannerProvider");
  }
  return context;
}
