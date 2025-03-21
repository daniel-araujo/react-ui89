import React from "react"
import "./ScrollContainer.css"

export default function ScrollContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return <span className="ui89-scroll-container">{children}</span>
}
