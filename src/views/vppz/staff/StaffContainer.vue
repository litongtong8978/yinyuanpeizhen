<script setup>
import {ref,onMounted,nextTick} from 'vue'
import {Plus,Delete,Check,InfoFilled} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import {useRoute} from 'vue-router'

import {photoListService,companionService,companionListService,deleteCompanionService} from '@/api'
const dialogVisible=ref(false)
const dialogFormVisible=ref(false)
const dialogImgVisible=ref(false)
const handleClose=()=>{
  dialogVisible.value=false
}
const route=useRoute()
onMounted(()=>{photoListService().then(res=>{
    // console.log(res)
    fileList.value=res.data.data
  })})
const beforeClose=()=>{
  dialogFormVisible.value=false
//   formModel.value={
//     id:'',
//     mobile:'',
//     name:'',
//     active:1,
//     avatar:'',
// }
form.value.resetFields()
 
}
const form = ref(null)
const formModel=ref({
  id:'',
  mobile:'',
  name:'',
  active:1,
  avatar:'',
  sex:'',
  age:28
})
const validateUser=(rule, value, callback)=> {
  // 不能为空
  if (formModel.value.mobile === '') {
    return new Error('请输入手机号')
  } else {
    const reg = /^1[3-9]\d{9}$/
    reg.test(formModel.value.mobile) ? callback() : callback(new Error('手机号格式不对,请输入正确手机号'))
}

}

const rules=ref({
  name: [{ required: true, trigger: 'blur', message: '请填写昵称' }],
  avatar:[{ required: true, message: '请选择头像'}],
  sex:[{ required: true, trigger: 'change', message: '请选择性别'}],
  mobile: [{ required: true, validator: validateUser, trigger: 'blur' }]
})

const paginationData = ref({
  pageNum: 1,
  pageSize: 10
})
const tableData=ref({
  list:[],
  total:0
})
const getListData=()=>{
  companionListService(paginationData.value).then(res=>{
    console.log(res)
    tableData.value.list=res.data.data.list
    tableData.value.total=res.data.data.total
  })
}
const confirm=async()=>{
  await form.value.validate((valid,fields) => {
    if (valid) {
      console.log('submit!')
      companionService(formModel.value).then(res=>{
        console.log(res)
        if(res.data.code===10000){
          ElMessage.success('操作成功')
          beforeClose()
          getListData()
        }else{
          ElMessage.error(res.data.msg)
        }
      })
      // 提交表单数据
      // 关闭弹窗
      dialogFormVisible.value = false
    } else {
      console.log('error submit!!')
      return false
    }
  })

}
const open=(row={})=>{
  dialogFormVisible.value=true
  nextTick(()=>{
    if(row){
      formModel.value={...row}
    }
  })


}
const selectTableData=ref([])
const handleSelectionChange=(val)=>{
  selectTableData.value=val
}

 const confirmEvent=()=>{
  if(!selectTableData.value.length){
    return ElMessage.error('请选择要删除的陪护师')
  }
  deleteCompanionService({id:selectTableData.value}).then(({ data }) => {
    if (data.code === 10000) {
      getListData()
    }
  })
}

const fileList=ref([])
const selectedIndex=ref(0)
const confirmImg=()=>{
  formModel.value.avatar=fileList.value[selectedIndex.value].url
  dialogImgVisible.value=false
}
</script>

<template>
      <panel-head :info="route" />
    <div class="btns">
        <el-button @click="open(null)" type="primary" size="small" :icon="Plus">新增</el-button>
        <el-popconfirm
          confirm-button-text="是"
          cancel-button-text="否"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="是否确认删除？"
          @confirm="confirmEvent"
        >
          <template #reference>
            <el-button type="danger" size="small" :icon="Delete">删除</el-button>
          </template>
        </el-popconfirm>
    </div>
  <!-- <panel-head :info="route" /> -->
  <el-table stripe style="width: 100%" :data="tableData.list" border  @selection-change="handleSelectionChange">

    <el-table-column  type="selection" width="50" />
        <el-table-column label="id" prop="id" />
        <el-table-column label="昵称" prop="name" />
        <el-table-column label="头像" prop="avater">
          <template #default="scope">
           <el-image
            style="width:50px;height: 50px;"
           :src=scope.row.avatar></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="性别">
          <template #default="scope">
            {{ scope.row.sex==='1'?'男':'女' }}
          </template>
        </el-table-column>  
        <el-table-column label="状态" prop="active">
          <template #default="scope">
            <el-tag v-if="scope.row.active===1" type="success">生效</el-tag>
            <el-tag v-else type="danger">失效</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" >
          <template #default="scope">
              <div class="flex-box">
                <el-icon><Clock></Clock></el-icon>
                <span style="margin-left: 10px;">{{ scope.row.create_time }}</span>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="open(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
 
   <el-dialog
      v-model="dialogFormVisible"
      :before-close="beforeClose"
      title="陪护师"
      width="500">
      <el-form
        label-width="100px"
        label-position="left"
        :model="formModel"
        :rules="rules"
        ref="form"
        >
        <el-form-item v-show="false" prop="id">
          <el-input v-model="formModel.id" placeholder="请输入昵称"/>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input  v-model="formModel.name" placeholder="请输入昵称"/>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-button v-if="!formModel.avatar" @click="dialogImgVisible=true" type="primary">点击上传</el-button>
          <el-image
            v-else
            style="width: 100px;
            height: 100px"
            :src="formModel.avatar"
            @click="dialogImgVisible=true"
          />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-select v-model="formModel.sex" placeholder="请选择性别">
                <el-option label="男" value="1" />
                <el-option label="女" value="2" />
            </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
            <el-input-number v-model="formModel.age" :min="18" :max="50" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formModel.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="是否生效" prop="active">
          <el-radio-group v-model="formModel.active">
            <el-radio :value="0">失效</el-radio>
            <el-radio :value="1">生效</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirm(form)">
          确认
          </el-button>
        </div>
      </template>
   </el-dialog>
      <el-dialog
      v-model="dialogImgVisible"
      :before-close="beforeClose"
      title="头像选择"
      width="500">
      <div class="image-list">
        <div v-for="(item,index) in fileList" :key="item.name" class="image-box" @click="selectedIndex=index">
          <div v-if="selectedIndex===index" class="select"></div>
          <el-image>
            :src="item.url"
            style="width: 148px;height: 148px"
            :fit="contain"
            :preview-src-list="fileList.map(item=>item.url)"
            :z-index="999"
          </el-image>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirmImg">确认</el-button>
          <el-button @click="dialogImgVisible=false"> 取消</el-button>
        </div>
      </template>
    </el-dialog>
</template>


<style lang="less" scoped >
.btns {
    padding: 10px 0 10px 10px;
    background-color: #fff;
}
.image-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .img-box {
    position: relative;
    .select {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 24px;
      height: 24px;
      background-color: #67c23a;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .el-image {
    margin-right: 10px;
    margin-bottom: 10px;
  }}
</style>