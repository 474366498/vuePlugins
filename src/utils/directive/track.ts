import Exposure from '../buriedPoint/exposure'
import Click from '../buriedPoint/click'
import Keyup from '../buriedPoint/keyup'

const exp = new Exposure()
const cli = new Click()
const _key = new Keyup()
const track = {
  mounted(el: HTMLElement, binding: any) {
    // console.log(18, el)
    const { arg } = binding
    // console.log(19, arg, arg.split('|'))
    arg.split('|').forEach((item: string) => {
      if (item === 'click') {
        console.log(21, 'click')
        cli.add({ el })
      } else if (item === 'exposure') {
        exp.add({ el })
      } else if (item === 'enter') {
        _key.add({ el })
      }
    })
  }
}

export default track

