import React from "react";

type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function CustomPageHeader({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="mb-2 flex items-center justify-between space-x-5">
      <div className="space-y-1">
        <h2 className="text-3xl font-normal text-primary">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div>{children}</div>
    </div>
  );
}
