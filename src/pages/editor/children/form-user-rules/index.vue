<template>
  <section class="flex flex-dir-c">
    <el-form :model="formData">
      <h4>表单活动验证</h4>
      <el-form-item
        label="num"
        v-for="(item, index) in formData.list"
        :key="index"
        :prop="'list.' + index + '.num'"
        :rules="[
          { required: true, message: 're', trigger: 'blur' },
          { pattern: /^\d{1,2}$/g, message: 'patt', trigger: 'blur' }
        ]"
      >
        <el-input v-model="item.num" />
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
export default {
  name : 'form-user-rules' ,
  cname : '表单活动验证' ,
  data () {
    return {
      formData: {
        list: [{ num: 'null' }, { num: 'null' }]
      },
      rules: {
        validatorFn(r, v, cb) {
          console.log(170, r, v)
        }
      }
    }
  }
}
</script>