import React from "react"
import "./HoverShadow.css"

export default function HoverShadow({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <span className="ui89-hover-shadow">
      <span className="ui89-hover-shadow__bottom"></span>
      <span className="ui89-hover-shadow__right"></span>
      {children}
    </span>
  )
}
