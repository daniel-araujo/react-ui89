import React from "react"

import "./Ui89NameValuePair.css"

export interface Ui89NameValuePairProps {
  name: React.ReactNode
  value: React.ReactNode
  leftMaxWidth?: number
}

export function Ui89NameValuePair({
  name,
  value,
  leftMaxWidth,
}: Ui89NameValuePairProps) {
  return (
    <div className="ui-89-name-value-pair">
      <div
        className="ui-89-name-value-pair__name-wrapper"
        style={{ maxWidth: `${leftMaxWidth}px` }}
      >
        <div className="ui-89-name-value-pair__name">{name}</div>
        <div className="ui-89-name-value-pair__dots"></div>
      </div>
      <div className="ui-89-name-value-pair__value">{value}</div>
    </div>
  )
}
