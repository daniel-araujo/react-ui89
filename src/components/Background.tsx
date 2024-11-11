import React from 'react'

import { Ui89Look } from '../theme'

import style from './Background.module.css'
import lookStyle from '../style/look.module.css'

export default function Background({
  look,
  children
}: {
  look: keyof typeof Ui89Look | Ui89Look,
  children: React.ReactNode
}) {
  return (
    <div className={`${style.container} ${lookStyle[look]}`}>
      {children}
    </div>
  )
}
