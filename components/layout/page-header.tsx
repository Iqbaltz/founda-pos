import React from "react";

type Props = {
  title: string;
  description?: string;
  rightContent?: React.ReactNode;
};

export default function PageHeader({
  title,
  description,
  rightContent,
}: Props) {
  return (
    <div className="flex justify-between items-end mb-6 pb-4 border-b">
      <div>
        <h2 className="font-semibold">{title}</h2>
        {description && (
          <p className="text-foreground/50 text-sm">{description}</p>
        )}
      </div>
      <div>{rightContent && rightContent}</div>
    </div>
  );
}
