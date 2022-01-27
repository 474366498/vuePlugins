
import { track } from './sendData'

export default class Keyup {
  constructor() {

  }
  add(entry: any) {
    console.log('keyup', entry)
    const el: HTMLElement = entry.el
    const inputEls: HTMLCollectionOf<HTMLInputElement> = el.getElementsByTagName('input')
    const elNodeMap: NamedNodeMap = el && el.attributes
    const elTrackParams = elNodeMap && elNodeMap['track-params']
    if (!elTrackParams || !inputEls || inputEls.length < 1) return false
    console.log(inputEls[0])
    inputEls[0].addEventListener('keyup', function (e) {
      if (e.key === 'Enter' && elTrackParams.value) {
        console.log(19, elTrackParams)
        track(elTrackParams.value)
      }
    })



    // let tp: string = elNodeMap && elNodeMap['track-params'].value
    // if (!tp) return false
    // console.log('添加事件')
    // inputEl.addEventListener('keyup', function (e) {
    //   console.log(16, e)
    // })
  }
}