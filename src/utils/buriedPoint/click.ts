import { track } from './sendData'

export default class Click {
  constructor() {

  }
  add(entry: any) {
    const el: HTMLElement = entry.el
    const elNodeMap: NamedNodeMap = el && el.attributes
    let tp: string = elNodeMap && elNodeMap['track-params'].value
    console.log(8, entry, elNodeMap, tp)
    if (tp == null) return false
    el.addEventListener('click', function () {
      console.log('click', tp)
      track(tp)
    })
  }
}