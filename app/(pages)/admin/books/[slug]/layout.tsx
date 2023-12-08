import React from "react";

export default function Layout(props: {
  children: React.ReactNode;
  chapters: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2">{props.children}</div>
      <div>{props.chapters}</div>
    </div>
  );
}
