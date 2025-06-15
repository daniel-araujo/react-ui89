import React, { useState } from "react"

import "./Ui89Breadcrumbs.css"
import "../style/typo.css"
import "../style/reset.css"
import "../style/chosen-theme.css"

import { Ui89Theme } from "../theme"
import { useUi89 } from "../Ui89Provider"

export type Ui89BreadcrumbsPropsOnSelect = (e: {
  item: Ui89BreadcrumbsPropsItem
}) => void | Promise<void>

export interface Ui89BreadcrumbsPropsItem {
  label: React.ReactNode
  url?: string
}

export interface Ui89BreadcrumbsProps {
  theme?: Ui89Theme | keyof typeof Ui89Theme
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
  const style = { "--ui89-index": index } as React.CSSProperties
  const tagname = item.url !== undefined ? "a" : "div"
  const overrides = useUi89()

  const onClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (item.url !== undefined) {
      if (item.url.startsWith("/")) {
        if (overrides.routerPush !== undefined) {
          e.preventDefault()
          overrides.routerPush(item.url)
        }
      }
    }
  }

  return (
    <a
      className={`ui-89-reset-a ui89-breadcrumbs__item`}
      href={item.url}
      style={style}
      onClick={onClick}
    >
      <div className="ui89-breadcrumbs__item__background"></div>
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
      className={`ui89-breadcrumbs ui89-typo-special ui89-chosen-theme-${theme}`}
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
