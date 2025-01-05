import React from "react"

import style from "./Ui89NameValuePair.module.css"

export function Ui89NameValuePair({
  name,
  value,
}: {
  name: string | number
  value: string | number
}) {
  return (
    <div className={style.nameValuePair}>
      <div className={style.nameValuePair__name}>{name}</div>
      <div className={style.nameValuePair__dots}></div>
      <div className={style.nameValuePair__value}>{value}</div>
    </div>
  )
}
