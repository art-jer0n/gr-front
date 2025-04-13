import React from "react";

export interface PdfToolbarItem {
  id?: string;
  label?: string;
  icon?: string;
  command?: (event: React.MouseEvent) => void;
  style?: React.CSSProperties;
  className?: string;
}