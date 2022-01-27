<script>
import {h} from 'vue'
console.log(3,h)
export default {
  name : 'render-child' ,
  cname : 'render方法创建节点' ,
  data () {
    return {

    }
  },
  // props : {
  //  childObj
  // },
  props:['childObj'],
  render(context, params) {
        console.log(220, context, this.childObj)
        let { childObj } = this
        const __this__ = this
        return h('div','vue 3 怎么写render了？')
        /*
        return h('div', {}, [
          h('span', {
            domProps: {
              innerHTML: 'span节点'
            }
          }),
          h('input', {
            attrs: {
              id: 'input_01',
              elType: 'input',
              dataValue: this._value
            },
            domProps: {
              value: childObj.num,
              _value: this.value
            },
            on: {
              input: function(e) {
                console.log(412, e, e.target.value, __this__)
                __this__._value = e.target.value
                __this__.$emit('change', { type: 'num', value: e.target.value })
              }
            }
          }),
          h('input', {
            attrs: {
              id: 'input_02',
              type: 'checkbox',
              elType: 'checkbox'
            },
            domProps: {
              value: childObj.flg,
              _value: this.value
            },
            on: {
              click: function(e) {
                console.log(435, e, e.target, e.target.checked)
                __this__._value = e.target.checked
                __this__.$emit('change', {
                  type: 'flg',
                  value: e.target.checked
                })
              }
            }
          }),
          // switchObj
          h(
            'span',
            {
              attrs: {
                id: 'switch_01',
                type: 'switch',
                elType: 'switch',
                dataStr: JSON.stringify(childObj.switchObj)
              },
              domProps: {
                value: childObj.switchObj.value,
                activeText: childObj.switchObj.activeText,
                inactiveText: childObj.switchObj.inactiveText
              },
              on: {
                click(e) {
                  console.log(e, this.value)
                }
              }
            },
            [
              h('i', {
                attrs: {
                  class: 'active-i',
                  title: this.activeText
                },
                domProps: {
                  innerHTML: childObj.switchObj.activeText
                }
              }),
              h('span', {
                attrs: {
                  class: 'switch',
                  value: childObj.switchObj.value
                },
                domProps: {
                  innerHTML: childObj.switchObj.value,
                  value: childObj.switchObj.value
                }
              }),
              h('i', {
                attrs: {
                  class: 'inactive-i'
                },
                domProps: {
                  innerHTML: childObj.switchObj.inactiveText
                }
              })
            ]
          )
        ])
        */
      }
}

</script>