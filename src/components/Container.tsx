'use client'
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "@/app/GlobalRedux/store";

interface ContainerProps {
  children: ReactNode;
  className?: string; // Optional className prop for additional styles
  centered?: boolean; // New prop to conditionally apply centered styles
}

/**
 * `Container` is a layout component that adjusts its left margin based on the sidebar state.
 * 
 * - When the `isSideBarOpen` state from Redux is true, it applies a larger left margin for better layout.
 * - It accepts an optional `centered` prop to align its children in the center.
 * - Additional styles can be passed through the `className` prop.
 * 
 * @param {ContainerProps} props - Component properties.
 * @param {ReactNode} props.children - The content to be displayed inside the container.
 * @param {string} [props.className] - Additional custom styles to apply to the container.
 * @param {boolean} [props.centered=false] - If true, centers the content using grid alignment.
 * @returns {JSX.Element} A styled container component.
 */
function Container({ children, className = "", centered = false }: ContainerProps) {
  const isSideBarOpen = useSelector((state: RootState) => state.sidebar.isSideBarOpen);

  return (
    <div className={`${isSideBarOpen ? "lg:ml-[270px]" : "lg:ml-[120px]"} mr-[5px] ${centered ? "grid justify-center items-center" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default Container;
