import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  enableScrollSnap?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, enableScrollSnap = false }) => {
  return (
    <div className={enableScrollSnap ? "overflow-y-scroll font-sans scroll-snap-type-y" : "overflow-y-scroll font-sans"}>
      {children}
    </div>
  )
}

export default Layout;
