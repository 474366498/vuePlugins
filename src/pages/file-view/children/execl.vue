<template>
  <section class="execl">
    execl
    <div v-html="execlStr"></div>
  </section>
</template>

<script lang="ts">
const execlStyle = `
<style lang="css">
table{
  width: 100%;
  margin: 20px auto;
  border-collapse:collapse;
  border-spacing: 0;
}
th , td {
    border:1px solid #333;
    padding:5px;
    line-height:26px;
    text-align: center;
  }
  th{
    font-weight: 600;
  }
</style>
`
import * as XLSX from 'xlsx'
import Vue , {defineComponent, getCurrentInstance ,onMounted , ref} from 'vue'
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
    const {proxy} = getCurrentInstance()
    console.log(23,proxy)
    let {$route , $router} = proxy.$root
     console.log(23,$route , $router)
    const execlStr = ref('')
    onMounted(()=>{
      if(props.path) {
        resolveExecl(props.path)
        // createPrintIframe(props.path)
      }
    })
    // execl 在 iframe 显示不出来噢 
    const createPrintIframe =  path=>{
      let url = `http://127.0.0.1:3000/`+path 
      let printIframe:HTMLIFrameElement = document.createElement('iframe')
      printIframe.setAttribute('id','print-iframe')
      printIframe.setAttribute('src',url)
      document.body.appendChild(printIframe)
      setTimeout(() => {
        printIframe.contentWindow?.focus()
        printIframe.contentWindow?.print()
      }, 5000);
    }
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
      setTimeout(() => {
        exportExecl()
      }, 5000);
    }
    function exportExecl() {
      console.log(78,execlStr.value)
      const routeData = $router.resolve({
        path:'/fileViewPrint',
        query:{
          type : 'execl' 
        }
      })
      let printData = execlStyle + execlStr.value
      let printWin = window.open(routeData.href,'_blank')
      printWin?.document.write(printData)
      printWin?.document.close()
      printWin?.print()
      printWin?.close()
      // let printWin = 
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




