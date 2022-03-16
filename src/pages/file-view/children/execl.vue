<template>
  <section class="execl">
    execl
    <div v-html="execlStr"></div>
  </section>
</template>

<script lang="ts">
import * as XLSX from 'xlsx'
import Vue , {defineComponent, onMounted , ref} from 'vue'
export default defineComponent({
  name : 'execl-view' ,
  cname : 'execl-预览',
  props:{
    path:{
      type : String ,
      default : ''
    }
  },
  setup (props) {
    console.log(19,props , XLSX)
    const execlStr = ref('')
    onMounted(()=>{
      if(props.path) {
        resolveExecl(props.path)
      }
    })
    const resolveExecl = (path) => {
      let url = `http://127.0.0.1:3000/`+path 
      fetch(url,{
        method : 'GET' ,
        responseType : 'arraybuffer'
      }).then(res=>res.arrayBuffer()).then(arraybuffer =>{
        let data = new Uint8Array( arraybuffer) 
        var workbook = XLSX.read(data,{type:'array'})
        console.log(34,data , workbook)
        readWorkbook(workbook)
      })
    }

    const readWorkbook = (work) => {
      var sheetNames = work.SheetNames
      console.log(sheetNames) 
      let csvData = {}
      sheetNames.map(item=>{
        let sheet = work.Sheets[item]
        csvData[item] = XLSX.utils.sheet_to_csv(sheet) 
      })
      console.log(48,csvData)
      csvDataToTable(csvData)
      // var worksheet = work.Sheets[sheetNames[0]]
      // var csv = XLSX.utils.sheet_to_csv(worksheet)
      // csv2table(csv)
    }
    function csvDataToTable(csvData){
      console.log(56,csvData)
      for(let key in csvData){
        console.log(key)
        let html = `<table attr-source='${key}' title='${key}' >`
        html += csvToTable(csvData[key])
        html += `</table>`
        console.log(62,html)
        execlStr.value += html
      }
    }

    function csvToTable (csv) {
      let rows = csv.split('\n')
      rows.pop()
      let html = '' 
      rows.forEach((row,index)=>{
        let columns = row.split(',')
        columns.unshift(index+1)
        html += '<tr>'
          for(let i = 0 ; i < columns.length;i++) {
            html += index === 0 
            ? `<th>${(i == 0 ? '1' : String.fromCharCode(65+i -1))}</th>` 
            : `<td>${columns[i]}</td>`
          }
        html+= '</tr>'
      })
      console.log(79,html)
      return html
    }

    return {execlStr}
  }
})
</script>

<style lang="scss">
  table {
	  border-collapse: collapse;
    margin:10px;
    th, td {
	    border: solid 1px #6D6D6D;
	    padding: 5px 10px;
      font-size: 12px;
	  }
	}
	
	
</style>




