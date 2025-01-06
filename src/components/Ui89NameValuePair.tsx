import React from "react"

import style from "./Ui89NameValuePair.module.css"

export interface Ui89NameValuePairProps {
  name: React.ReactNode
  value: React.ReactNode
  leftWidth?: number
}

export function Ui89NameValuePair({
  name,
  value,
  leftWidth,
}: Ui89NameValuePairProps) {
  return (
    <div className={style.nameValuePair}>
      <div
        className={style.nameValuePair__nameWrapper}
        style={{ width: `${leftWidth}px` }}
      >
        <div className={style.nameValuePair__name}>{name}</div>
        <div className={style.nameValuePair__dots}></div>
      </div>
      <div className={style.nameValuePair__value}>{value}</div>
    </div>
  )
}
