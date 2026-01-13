import React, { useState } from "react"

import "./Ui89Breadcrumbs.css"
import "../style/typo.css"
import "../style/reset.css"
import "../style/chosen-theme.css"

import { Ui89Theme } from "../theme"
import { useUi89 } from "../Ui89Provider"
import { Ui89LinkBase } from "./private/LinkBase"

export interface Ui89BreadcrumbsPropsItem {
  label: React.ReactNode
  url?: string
}

export interface Ui89BreadcrumbsProps<T> {
  theme?: Ui89Theme | keyof typeof Ui89Theme
  items: T[]
  getLabel?: (item: T) => React.ReactNode
  getUrl?: (item: T) => string | undefined
  onSelect?: (item: T) => void | Promise<void>
}

export function Ui89BreadcrumbsItem({
  index,
  label,
  url,
  onClick,
}: {
  index: number
  label: React.ReactNode
  url?: string
  onClick?: () => void | Promise<void>
}) {
  const style = { "--ui89-index": index } as React.CSSProperties

  return (
    <Ui89LinkBase
      className={`ui-89-reset-a ui89-breadcrumbs__item`}
      href={url}
      style={style}
      onClick={onClick}
    >
      <div className="ui89-breadcrumbs__item__background"></div>
      {label}
    </Ui89LinkBase>
  )
}

export function Ui89Breadcrumbs<T = Ui89BreadcrumbsPropsItem>({
  theme = Ui89Theme.primary,
  items,
  getLabel,
  getUrl,
  onSelect,
}: Ui89BreadcrumbsProps<T>) {
  return (
    <div
      className={`ui89-breadcrumbs ui89-typo-special ui89-chosen-theme-${theme}`}
    >
      {[...items.entries()].reverse().map(([index, item]) => {
        const label = getLabel ? getLabel(item) : (item as any).label
        const url = getUrl ? getUrl(item) : (item as any).url

        const onClick = (() => {
          if (onSelect) {
            return () => {
              return onSelect(item)
            }
          } else {
            return undefined
          }
        })()

        return (
          <Ui89BreadcrumbsItem
            key={index}
            index={index}
            label={label}
            url={url}
            onClick={onClick}
          />
        )
      })}
    </div>
  )
}
