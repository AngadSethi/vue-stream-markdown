import { OVERLAY_CONTAINER_ID } from '../constants'

export function getOverlayContainer(): Element | null {
  return document.querySelector(`#${OVERLAY_CONTAINER_ID}`)
}
