/*!
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
!(function (t, e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e(require('vue')))
    : 'function' == typeof define && define.amd
      ? define(['vue'], e)
      : 'object' == typeof exports
        ? (exports.CKEditor = e(require('vue')))
        : (t.CKEditor = e(t.Vue))
})(window, function (t) {
  return (function (t) {
    var e = {}
    function n(r) {
      if (e[r]) return e[r].exports
      var i = (e[r] = { i: r, l: !1, exports: {} })
      return t[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports
    }
    return (
      (n.m = t),
      (n.c = e),
      (n.d = function (t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r })
      }),
      (n.r = function (t) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 })
      }),
      (n.t = function (t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t
        if (4 & e && 'object' == typeof t && t && t.__esModule) return t
        var r = Object.create(null)
        if (
          (n.r(r),
            Object.defineProperty(r, 'default', { enumerable: !0, value: t }),
            2 & e && 'string' != typeof t)
        )
          for (var i in t)
            n.d(
              r,
              i,
              function (e) {
                return t[e]
              }.bind(null, i)
            )
        return r
      }),
      (n.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
              return t.default
            }
            : function () {
              return t
            }
        return n.d(e, 'a', e), e
      }),
      (n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
      }),
      (n.p = ''),
      n((n.s = 3))
    )
  })([
    function (e, n) {
      e.exports = t
    },
    function (t, e, n) {
      'use strict'
        ; (function (t) {
          var n = 'object' == typeof t && t && t.Object === Object && t
          e.a = n
        }.call(this, n(2)))
    },
    function (t, e) {
      var n
      n = (function () {
        return this
      })()
      try {
        n = n || new Function('return this')()
      } catch (t) {
        'object' == typeof window && (n = window)
      }
      t.exports = n
    },
    function (t, e, n) {
      'use strict'
      n.r(e)
      var r = n(0),
        i = n.n(r)
      var o = function (t) {
        var e = typeof t
        return null != t && ('object' == e || 'function' == e)
      },
        u = n(1),
        a = 'object' == typeof self && self && self.Object === Object && self,
        c = u.a || a || Function('return this')(),
        s = function () {
          return c.Date.now()
        },
        f = c.Symbol,
        l = Object.prototype,
        d = l.hasOwnProperty,
        p = l.toString,
        v = f ? f.toStringTag : void 0
      var y = function (t) {
        var e = d.call(t, v),
          n = t[v]
        try {
          t[v] = void 0
          var r = !0
        } catch (t) { }
        var i = p.call(t)
        return r && (e ? (t[v] = n) : delete t[v]), i
      },
        h = Object.prototype.toString
      var b = function (t) {
        return h.call(t)
      },
        m = f ? f.toStringTag : void 0
      var g = function (t) {
        return null == t
          ? void 0 === t
            ? '[object Undefined]'
            : '[object Null]'
          : m && m in Object(t)
            ? y(t)
            : b(t)
      }
      var j = function (t) {
        return null != t && 'object' == typeof t
      }
      var $ = function (t) {
        return 'symbol' == typeof t || (j(t) && '[object Symbol]' == g(t))
      },
        O = /^\s+|\s+$/g,
        w = /^[-+]0x[0-9a-f]+$/i,
        _ = /^0b[01]+$/i,
        x = /^0o[0-7]+$/i,
        S = parseInt
      var E = function (t) {
        if ('number' == typeof t) return t
        if ($(t)) return NaN
        if (o(t)) {
          var e = 'function' == typeof t.valueOf ? t.valueOf() : t
          t = o(e) ? e + '' : e
        }
        if ('string' != typeof t) return 0 === t ? t : +t
        t = t.replace(O, '')
        var n = _.test(t)
        return n || x.test(t)
          ? S(t.slice(2), n ? 2 : 8)
          : w.test(t)
            ? NaN
            : +t
      },
        T = Math.max,
        D = Math.min
      var N = function (t, e, n) {
        var r,
          i,
          u,
          a,
          c,
          f,
          l = 0,
          d = !1,
          p = !1,
          v = !0
        if ('function' != typeof t) throw new TypeError('Expected a function')
        function y(e) {
          var n = r,
            o = i
          return (r = i = void 0), (l = e), (a = t.apply(o, n))
        }
        function h(t) {
          return (l = t), (c = setTimeout(m, e)), d ? y(t) : a
        }
        function b(t) {
          var n = t - f
          return void 0 === f || n >= e || n < 0 || (p && t - l >= u)
        }
        function m() {
          var t = s()
          if (b(t)) return g(t)
          c = setTimeout(
            m,
            (function (t) {
              var n = e - (t - f)
              return p ? D(n, u - (t - l)) : n
            })(t)
          )
        }
        function g(t) {
          return (c = void 0), v && r ? y(t) : ((r = i = void 0), a)
        }
        function j() {
          var t = s(),
            n = b(t)
          if (((r = arguments), (i = this), (f = t), n)) {
            if (void 0 === c) return h(f)
            if (p) return clearTimeout(c), (c = setTimeout(m, e)), y(f)
          }
          return void 0 === c && (c = setTimeout(m, e)), a
        }
        return (
          (e = E(e) || 0),
          o(n) &&
          ((d = !!n.leading),
            (u = (p = 'maxWait' in n) ? T(E(n.maxWait) || 0, e) : u),
            (v = 'trailing' in n ? !!n.trailing : v)),
          (j.cancel = function () {
            void 0 !== c && clearTimeout(c), (l = 0), (r = f = i = c = void 0)
          }),
          (j.flush = function () {
            return void 0 === c ? a : g(s())
          }),
          j
        )
      }
      var k = {
        name: 'ckeditor',
        render(t) {
          return t(this.tagName)
        },
        props: {
          editor: { type: Function, default: null },
          value: { type: String, default: '' },
          config: { type: Object, default: () => ({}) },
          tagName: { type: String, default: 'div' },
          disabled: { type: Boolean, default: !1 }
        },
        data: () => ({
          $_instance: null,
          $_lastEditorData: { type: String, default: '' }
        }),
        mounted() {
          const t = Object.assign({}, this.config)
          this.value && (t.initialData = this.value),
            this.editor
              .create(this.$el, t)
              .then(t => {
                console.log(251, t)
                  ; (this.$_instance = t),
                    (t.isReadOnly = this.disabled),
                    this.$_setUpEditorEvents(),
                    this.$emit('ready', t)
              })
              .catch(t => {
                console.error(t)
              })

        },
        beforeDestroy() {
          this.$_instance &&
            (this.$_instance.destroy(), (this.$_instance = null)),
            this.$emit('destroy', this.$_instance)
        },
        watch: {
          value(t, e) {
            t !== e && t !== this.$_lastEditorData && this.$_instance.setData(t)
          },
          disabled(t) {
            this.$_instance.isReadOnly = t
          }
        },
        methods: {
          $_setUpEditorEvents() {
            const t = this.$_instance,
              e = N(
                e => {
                  const n = (this.$_lastEditorData = t.getData())
                  this.$emit('input', n, e, t)
                },
                300,
                { leading: !0 }
              )

            t.model.document.on('change:data', e),
              t.editing.view.document.on('focus', e => {
                this.$emit('focus', e, t)
              }),
              t.editing.view.document.on('blur', e => {
                this.$emit('blur', e, t)
              })
          }
        }
      }
      const M = i.a ? i.a.version : r.version,
        [P] = M.split('.').map(t => parseInt(t, 10))
      if (2 !== P)
        throw new Error(
          'The CKEditor plugin works only with Vue 2.x. For more information, please refer to https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v2.html'
        )
      const F = {
        install(t) {
          t.component('ckeditor', k)
        },
        component: k
      }
      e.default = F
    }
  ]).default
})
//# sourceMappingURL=ckeditor.js.map
