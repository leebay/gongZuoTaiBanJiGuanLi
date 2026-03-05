<template>
  <el-dialog
    v-model="visible"
    title="添加班级"
    width="660px"
    :close-on-click-modal="false"
    class="add-class-dialog"
    @close="handleClose"
  >
    <!-- 校内班级列表 -->
    <div class="block">
      <div class="block-header">
        <span class="block-title">关联已有班级</span>
        <span class="block-desc">勾选校内班级后点击确定，即可将该班级与您关联</span>
      </div>

      <el-table
        :data="schoolClasses"
        class="school-table"
        :header-cell-style="{
          background: '#f7f8fa',
          color: '#888',
          fontWeight: '500',
          fontSize: '12px',
          padding: '10px 0',
        }"
        :cell-style="{ fontSize: '13px', color: '#333', padding: '10px 0' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="44" />
        <el-table-column prop="name" label="班级名称" align="center" />
        <el-table-column prop="studentCount" label="人数" align="center" width="70" />
        <el-table-column prop="teachers" label="教师" align="center" />
        <el-table-column label="操作" align="center" width="90">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleViewStudents(row)">
              查看学生
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-row">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="5"
          :total="schoolClasses.length"
          layout="prev, pager, next"
          small
        />
      </div>
    </div>

    <!-- 分隔线 -->
    <div class="divider">
      <span class="divider-text">或者创建新班级</span>
    </div>

    <!-- 创建新班级 -->
    <div class="block">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        class="create-form"
      >
        <el-form-item label="班级名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入班级名称"
            clearable
          />
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'confirm'])

const visible = ref(props.modelValue)
watch(() => props.modelValue, (val) => { visible.value = val })
watch(visible, (val) => { emit('update:modelValue', val) })

const schoolClasses = ref([
  { id: 1, name: '无人机应用技术', studentCount: 2, teachers: '熊老师、李宏文等3位老师' },
  { id: 2, name: '测试', studentCount: 0, teachers: '李宏文、张凤连' },
  { id: 3, name: '无人机应用技术3班', studentCount: 0, teachers: '熊老师' },
  { id: 4, name: '测试1', studentCount: 2, teachers: '李宏文' },
  { id: 5, name: '2班', studentCount: 3, teachers: '熊老师' },
])

const currentPage = ref(1)
const selectedRows = ref([])

function handleSelectionChange(rows) {
  selectedRows.value = rows
}

function handleViewStudents(row) {
  ElMessage.info(`查看「${row.name}」的学生列表`)
}

const formRef = ref(null)
const form = reactive({ name: '' })
const rules = {
  name: [{ required: true, message: '请输入班级名称', trigger: 'blur' }],
}

function handleClose() {
  visible.value = false
  formRef.value?.resetFields()
  selectedRows.value = []
}

async function handleConfirm() {
  if (selectedRows.value.length > 0) {
    emit('confirm', { type: 'join', classes: selectedRows.value })
    handleClose()
    return
  }
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  emit('confirm', { type: 'create', ...form })
  handleClose()
}
</script>

<style scoped>
/* Dialog 基础覆盖 */
:deep(.el-dialog) {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.el-dialog__header) {
  padding: 20px 24px 18px;
  border-bottom: 1px solid #f0f0f0;
  margin-right: 0;
}

:deep(.el-dialog__title) {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
}

:deep(.el-dialog__body) {
  padding: 20px 24px 4px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

:deep(.el-dialog__footer) {
  padding: 14px 24px 20px;
  border-top: 1px solid #f0f0f0;
}

/* 区块 */
.block {
  padding: 0;
}

.block-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 12px;
}

.block-title {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
}

.block-desc {
  font-size: 12px;
  color: #aaa;
}

/* 表格 */
.school-table {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eee;
  width: 100%;
}

:deep(.el-table__row:hover > td) {
  background: #f0f7ff !important;
}

:deep(.el-table__header-wrapper th) {
  border-bottom: 1px solid #eee !important;
}

/* 分页 */
.pagination-row {
  display: flex;
  justify-content: center;
  padding: 12px 0 4px;
}

/* 分隔线 */
.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0 18px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #eee;
}

.divider-text {
  font-size: 12px;
  color: #bbb;
  white-space: nowrap;
}

/* 表单 */
.create-form {
  padding: 0;
}

:deep(.el-form-item) {
  margin-bottom: 0;
}

:deep(.el-form-item__label) {
  font-size: 13px;
  font-weight: 500;
  color: #555;
  padding-bottom: 6px;
  line-height: 1.4;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 0 0 1px #e0e0e0 inset;
  transition: box-shadow 0.2s;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #0078e0 inset;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1.5px #0078e0 inset !important;
}

/* footer */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
