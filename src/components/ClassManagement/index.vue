<template>
  <div class="class-management">
    <ClassList
      :classes="classList"
      :active-id="activeClassId"
      @select="handleSelectClass"
      @add="handleAddClass"
    />
    <ClassDetail
      v-if="activeClass"
      :class-info="activeClass"
      @edit="handleEdit"
      @delete="handleDelete"
      @quit="handleQuit"
    />
    <div v-else class="empty-placeholder">
      <el-empty description="请选择一个班级" />
    </div>

    <!-- 添加班级弹窗 -->
    <AddClassDialog v-model="showAddDialog" @confirm="handleAddConfirm" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import ClassList from './ClassList.vue'
import ClassDetail from './ClassDetail.vue'
import AddClassDialog from './AddClassDialog.vue'

const activeClassId = ref(2)
const showAddDialog = ref(false)

const classList = ref([
  {
    id: 1,
    name: '无人机应用技术',
    type: 'shared',
    icon: 'user-group',
  },
  {
    id: 2,
    name: '无人机应用技术3班',
    type: 'self',
    icon: 'user-group',
    teacher: '熊老师',
    studentCount: 8,
    courseCount: 3,
    createDate: '2024-08-15',
    deletable: false,
    semesters: [
      {
        id: 1,
        label: '第1学年（下）',
        courses: [
          {
            id: 101,
            name: '无人机装调检修实训',
            type: 'open',
            cover: '',
          },
        ],
      },
      { id: 2, label: '第1学年（上）', courses: [] },
      { id: 3, label: '第2学年（上）', courses: [] },
      { id: 4, label: '第2学年（下）', courses: [] },
    ],
  },
  {
    id: 3,
    name: '111',
    type: 'self',
    icon: 'user-group',
    teacher: '',
    studentCount: 0,
    courseCount: 0,
    createDate: '2025-01-10',
    deletable: true,
    semesters: [],
  },
])

const activeClass = computed(() =>
  classList.value.find((c) => c.id === activeClassId.value) || null
)

function handleSelectClass(id) {
  activeClassId.value = id
}

function handleAddClass() {
  showAddDialog.value = true
}

function handleAddConfirm(data) {
  if (data.type === 'join') {
    ElMessage.success(`已关联 ${data.classes.length} 个班级`)
  } else {
    const newId = Date.now()
    classList.value.push({
      id: newId,
      name: data.name,
      type: 'self',
      icon: 'user-group',
      teacher: '',
      studentCount: 0,
      courseCount: 0,
      createDate: new Date().toISOString().slice(0, 10),
      deletable: true,
      semesters: [],
    })
    activeClassId.value = newId
    ElMessage.success(`班级「${data.name}」创建成功`)
  }
}

function handleEdit(classInfo) {
  console.log('修改信息', classInfo)
}

function handleDelete(classInfo) {
  console.log('删除班级', classInfo)
}

function handleQuit(classInfo) {
  console.log('退出班级', classInfo)
}
</script>

<style scoped>
.class-management {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  min-height: calc(100vh - 48px);
}

.empty-placeholder {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
