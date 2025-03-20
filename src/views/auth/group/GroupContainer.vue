<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { userGetMenuService, userSetMenuService, menuListService } from '@/api'
import { ElTree, ElMessage } from 'element-plus'
import { useUserStore } from "@/store"
import { Plus } from '@element-plus/icons-vue'

const formModel = ref({
  id: '',
  name: '',
  permissions: ''
})

const paginationData = ref({
  pageNum: 1,
  pageSize: 10
})

const permissionsData = ref([])
const form = ref(null)
const dialogVisible = ref(false)
const tree = ref(null)

const defaultKeys = [4, 5]

const rules = ref({
  name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }]
})
const tableData = ref({
  list:[],
  total: 0
})
//关闭弹窗
const handleClose = () => {
  dialogVisible.value = false
  formModel.value = {
    id: '',
    name: '',
    permissions: ''
  }
  tree.value.setCheckedKeys([defaultKeys])
}

const open = (rowData={}) => {
  dialogVisible.value = true
  //页面回显
  nextTick(()=>{
    Object.assign(formModel.value,{id:rowData.id,name:rowData.name})
    tree.value.setCheckedKeys(rowData.permissions ? JSON.parse(rowData.permissions) : [])
  })
  if (row) {
    formModel.value = { ...row }
  } else {
    formModel.value = {
      id: '',
      name: '',
      permissions: ''
    }
  }
}

onMounted(async () => {
  getListData()
  const store = useUserStore()
  if (!store.token) {
    console.error('No token found, redirecting...')
  }
  try {
    const res = await userGetMenuService()
    console.log('Menu data:', res)
    if (res.data && res.data.data) {
      permissionsData.value = res.data.data
    } else {
      console.error('Invalid menu data format:', res)
    }
  } catch (error) {
    console.error('Failed to fetch menu data:', error)
  }
})

const confirm = async () => {
  try {
    await form.value.validate()
    const permissions = JSON.stringify(tree.value.getCheckedKeys())
    userSetMenuService({ name: formModel.value.name, permissions, id: formModel.value.id })
      .then(({ data }) => {
        console.log('添加权限成功', data)
        ElMessage.success('添加权限成功')
        dialogVisible.value = false
        getListData() // 刷新列表
      })
      .catch((error) => {
        console.error('Error adding permission:', error)
        ElMessage.error('添加权限失败')
      })
  } catch (error) {
    console.error('Validation failed:', error)
    ElMessage.error('请完善表单信息')
  }
}

const getListData = () => {
  menuListService(paginationData.value)
    .then(res => {
      console.log('获取权限列表', res)
      const { list,total } = res.data.data
      tableData.list=list
      tableData.total=total
      // if (res.data.code === 10000) {
      //   ElMessage.success('获取权限列表成功')
      // } else {
      //   ElMessage.error('获取权限列表失败')
      // }
    })
    .catch(error => {
      console.error('获取权限列表失败:', error)
      ElMessage.error('获取权限列表失败')
    })
}
</script>

<template>
  <div class="group-container">
    <div class="content-wrapper">
      <div class="btns">
        <el-button @click="open(null)" type="primary" size="small" :icon="Plus">新增</el-button>
      </div>
      
      <el-table stripe style="width: 100%" :data="tableData.list" border>
        <el-table-column label="id" prop="id" />
        <el-table-column label="昵称" prop="name" />
        <el-table-column label="菜单权限" prop="permissionName" width="500px" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="open(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        v-model="dialogVisible"
        title="添加权限"
        width="500px"
        :before-close="handleClose"
      >
        <el-form
          ref="form"
          label-width="100px"
          label-position="left"
          :model="formModel"
          :rules="rules"
        >
          <el-form-item label="ID" prop="id">
            <el-input v-model="formModel.id" placeholder="请输入ID"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="名称">
            <el-input v-model="formModel.name" placeholder="请填写权限名称"></el-input>
          </el-form-item>
          <el-form-item prop="permissions" label="权限">
            <el-tree
              ref="tree"
              style="max-width: 600px"
              :data="permissionsData"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2]"
              :default-checked-keys="defaultKeys"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirm">确认</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped lang="less">
// .group-container {
//   height: 100%;
//   padding: 20px;
//   box-sizing: border-box;
// }

// .content-wrapper {
//   background-color: #fff;
//   padding: 20px;
//   border-radius: 4px;
//   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
//   min-height: calc(100vh - 110px);
// }



// .dialog-footer {
//   display: flex;
//   justify-content: flex-end;
//   gap: 10px;
// }
.btns {
  padding: 10px 0 10px 10px;
  background-color: #fff;
}
</style>