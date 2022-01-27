<template>
<section class="flex flex-dir-c">
  <h4>自定义select 搜索</h4>
  <div class="flex user-select">
    <el-select
      v-model="value1"
      clearable
      @focus.native.capture="e => onSelectFocus('nowList', 'List')"
      multiple
      filterable
      :filter-method="e => selectFilterFn(e, 'nowList', 'List')"
    >
      <el-option
        v-for="(item, index) in nowList"
        :key="index"
        v-show="!item.filter"
        :label="item.cname"
        :value="item.id"
      ></el-option>
    </el-select>
    <el-select
    style="margin-left:20px;"
      v-model="value2"
      ref="s2"
      clearable
      @focus.native.capture="e => onSelectFocus('userList', 'baseUserList')"
      :multiple="false"
      filterable
      :filter-method="e => selectFilterFn(e, 'userList', 'baseUserList')"
    >
      <el-option
        v-for="(item, index) in userList"
        :key="index"
        :label="item.userName"
        :value="item.userId"
      ></el-option>
    </el-select>
  </div>
</section>
</template>
<script type="text/javascript">
import { pinyin } from '@/utils/Pinyin.js'
console.log(27, pinyin)
export default {
  name : 'select-user-search' ,
  cname : '自定义select 搜索' ,
  data () {
    return {
      value1: '',
      List: [
        {
          id: 40,
          cname: '非v下次非v下次',
          initials: 'fvxcfvxc',
          projectId: 9,
          projectName: null,
          gmtCreate: '2021-09-29 14:07:34',
          createUserId: 122,
          createUserName: '梁缘',
          delFlag: 0
        },
        {
          id: 39,
          cname: '非v下次',
          initials: 'fvxc',
          projectId: 9,
          projectName: null,
          gmtCreate: '2021-09-29 14:07:23',
          createUserId: 122,
          createUserName: '梁缘',
          delFlag: 0
        },
        {
          id: 38,
          cname: '你 是你自己空虚',
          initials: 'n snzjkx',
          projectId: 9,
          projectName: null,
          gmtCreate: '2021-09-29 14:07:12',
          createUserId: 122,
          createUserName: '梁缘',
          delFlag: 0
        },
        {
          id: 37,
          cname: '回车',
          initials: 'hc',
          projectId: 9,
          projectName: null,
          gmtCreate: '2021-09-29 13:50:22',
          createUserId: 122,
          createUserName: '梁缘',
          delFlag: 0
        },
        {
          id: 36,
          cname: '标书通模块5',
          initials: 'bstmk5',
          projectId: 9,
          projectName: null,
          gmtCreate: '2021-09-29 10:43:14',
          createUserId: 122,
          createUserName: '梁缘',
          delFlag: 0
        },
        {
          id: 30,
          cname: '液晶模块个v不错嘛',
          initials: 'yjmkgvbcm',
          projectId: 9,
          projectName: null,
          gmtCreate: '2021-09-29 10:38:42',
          createUserId: 122,
          createUserName: '梁缘',
          delFlag: 0
        },
        {
          id: 29,
          cname: 'u汉考克',
          initials: 'uhkk',
          projectId: 9,
          projectName: null,
          gmtCreate: '2021-09-29 10:36:28',
          createUserId: 122,
          createUserName: '梁缘',
          delFlag: 0
        },
        {
          id: 27,
          cname: '标书通模块4',
          initials: 'bstmk4',
          projectId: 9,
          projectName: null,
          gmtCreate: '2021-09-28 14:00:40',
          createUserId: 122,
          createUserName: '梁缘',
          delFlag: 0
        },
        {
          id: 24,
          cname: '标书通模块31',
          initials: null,
          projectId: 9,
          projectName: null,
          gmtCreate: '2021-09-28 13:55:44',
          createUserId: 122,
          createUserName: '梁缘',
          delFlag: 0
        },
        {
          id: 23,
          cname: '标书通模块2',
          projectId: 9,
          projectName: null,
          gmtCreate: '2021-09-28 13:55:40',
          createUserId: 122,
          createUserName: '梁缘',
          delFlag: 0
        },
        {
          id: 22,
          cname: '标书通模块1',
          initials: '',
          projectId: 9,
          projectName: null,
          gmtCreate: '2021-09-28 13:55:35',
          createUserId: 122,
          createUserName: '梁缘',
          delFlag: 0
        }
      ],
      userList: [],
      nowList: [],
      value2: 1335,
      baseUserList: [
        {
          id: 151,
          name: 'lycoris',
          positionTypeId: '6',
          userId: 151,
          userName: 'lycoris'
        },
        {
          id: 148,
          name: '两个人',
          positionTypeId: '4',
          userId: 148,
          userName: '两个人'
        },
        {
          id: 147,
          name: '一个人',
          positionTypeId: '',
          userId: 147,
          userName: '一个人'
        },
        {
          id: 146,
          name: '后端test',
          positionTypeId: '3',
          userId: 146,
          userName: '后端test'
        },
        {
          id: 145,
          name: 'ui test',
          positionTypeId: '1',
          userId: 145,
          userName: 'ui test'
        },
        {
          id: 144,
          name: '前端test',
          positionTypeId: '2',
          userId: 144,
          userName: '前端test'
        },
        {
          id: 143,
          name: '产品test',
          positionTypeId: '5',
          userId: 143,
          userName: '产品test'
        },
        {
          id: 142,
          name: '产品',
          positionTypeId: '5',
          userId: 142,
          userName: '产品'
        },
        {
          id: 136,
          name: '测试test',
          positionTypeId: '4',
          userId: 136,
          userName: '测试test'
        },
        {
          id: 135,
          name: '马莉',
          positionTypeId: '5',
          userId: 135,
          userName: '马莉'
        },
        {
          id: 134,
          name: '胡松华',
          positionTypeId: '3',
          userId: 134,
          userName: '胡松华'
        },
        {
          id: 133,
          name: '张韬',
          positionTypeId: '3',
          userId: 133,
          userName: '张韬'
        },
        {
          id: 132,
          name: '马玲',
          positionTypeId: '4',
          userId: 132,
          userName: '马玲'
        },
        {
          id: 131,
          name: '谢婷',
          positionTypeId: '1',
          userId: 131,
          userName: '谢婷'
        },
        {
          id: 130,
          name: '贾燕龙',
          positionTypeId: '3',
          userId: 130,
          userName: '贾燕龙'
        },
        {
          id: 129,
          name: '刘永德',
          positionTypeId: '3',
          userId: 129,
          userName: '刘永德'
        },
        {
          id: 128,
          name: '张正国',
          positionTypeId: '3',
          userId: 128,
          userName: '张正国'
        },
        {
          id: 127,
          name: '蒋彬',
          positionTypeId: '2',
          userId: 127,
          userName: '蒋彬'
        },
        {
          id: 126,
          name: '朱永平',
          positionTypeId: '3',
          userId: 126,
          userName: '朱永平'
        },
        {
          id: 125,
          name: '黄波',
          positionTypeId: '2',
          userId: 125,
          userName: '黄波'
        },
        {
          id: 123,
          name: '刘婷婷',
          positionTypeId: '2',
          userId: 123,
          userName: '刘婷婷'
        },
        {
          id: 122,
          name: '梁缘',
          positionTypeId: '6',
          userId: 122,
          userName: '梁缘'
        }
      ]
    }
  },
  mounted () {
    let item = {
      id: 1335,
      name: '马莉1',
      positionTypeId: '5',
      userId: 1335,
      userName: '马莉1'
    }
    let flg = this.baseUserList.findIndex(_item => _item.id == item.id) >= 0
    console.log(519, flg)
    this.userList = flg
      ? this.baseUserList
      : this.baseUserList.concat(Object.assign({ disabled: true }, item))
  },
  methods : {
     onSelectFocus(list, base) {
      // 这个到时提到 create 或者 ....
      this[base].forEach(item => {
        if (!item.initials) {
          item.initials = pinyin
            .getCamelChars(item.cname ? item.cname : item.name)
            .toLowerCase()
        }
        return item
      })
      this[list] = this[base].map(item => {
        return item
      })
    },
    selectFilterFn(val, list, base) {
      console.log(val, list, base)
      if (val) {
        let pyReg = /[a-z]/g
        if (pyReg.test(val)) {
          console.log('字母')
          this[list] = this[base].filter(
            item => item.initials.indexOf(val) >= 0
          )
        } else {
          console.log('非字母')
          this[list] = this[base].filter(item => item.cname.indexOf(val) >= 0)
        }
      } else {
        this[list] = this[base].map(item => item)
      }
    }
  }
}

</script>
<style lang="sss" scoped>

</style>