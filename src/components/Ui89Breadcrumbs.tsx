import React, { useState } from "react"

import styles from "./Ui89Breadcrumbs.module.css"
import typoStyles from "../style/typo.module.css"
import resetStyles from "../style/reset.module.css"
import chosenThemeStyles from "../style/chosen-theme.module.css"

import { Ui89Theme } from "../theme"

export type Ui89BreadcrumbsPropsOnSelect = (e: {
  item: Ui89BreadcrumbsPropsItem
}) => void | Promise<void>

export interface Ui89BreadcrumbsPropsItem {
  label: string
  url?: string
}

export interface Ui89BreadcrumbsProps {
  theme?: Ui89Theme
  items: Ui89BreadcrumbsPropsItem[]
  onSelect?: Ui89BreadcrumbsPropsOnSelect
}

export function Ui89BreadcrumbsItem({
  index,
  item,
  onSelect,
}: {
  index: number
  item: Ui89BreadcrumbsPropsItem
  onSelect?: Ui89BreadcrumbsPropsOnSelect
}) {
  const tagname = item.url !== undefined ? "a" : "div"

  return (
    <a
      className={`${resetStyles.a} ${styles.breadcrumbsItem}`}
      href={item.url}
      style={{ "--ui89-index": index }}
    >
      <div className={styles.breadcrumbsItemBackground}></div>
      {item.label}
    </a>
  )
}

export function Ui89Breadcrumbs({
  theme = Ui89Theme.primary,
  items,
  onSelect,
}: Ui89BreadcrumbsProps) {
  return (
    <div
      className={`${styles.breadcrumbs} ${typoStyles.special} ${chosenThemeStyles[theme]}`}
    >
      {[...items.entries()].reverse().map(([index, item]) => (
        <Ui89BreadcrumbsItem
          key={index}
          index={index}
          item={item}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
