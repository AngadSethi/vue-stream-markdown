import type { CSSProperties } from 'vue'
import type { ICONS } from '../constants'

export type IconName
  = | keyof typeof ICONS
    | 'flipVertical'
    | 'rotateRight'
    | 'arrowRight'

export interface SelectItem {
  label: string
  value: string
  icon?: string
}

export interface Action {
  key: string
  name: string
  icon: string
  iconStyle?: CSSProperties
  buttonStyle?: CSSProperties
  options?: SelectItem[]
  onClick: (event: MouseEvent, item?: SelectItem) => void
}
