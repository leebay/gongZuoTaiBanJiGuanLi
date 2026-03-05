<template>
  <div class="student-list">
    <!-- Search Bar -->
    <div class="search-bar">
      <span class="search-label">关键字</span>
      <el-input
        v-model="keyword"
        placeholder="按关键字搜索"
        size="default"
        class="search-input"
        clearable
        @keyup.enter="handleSearch"
      />
      <el-button type="primary" size="default" @click="handleSearch">
        <el-icon><Search /></el-icon>
        查询
      </el-button>
      <el-button size="default" @click="handleReset">重置</el-button>
    </div>

    <!-- Table -->
    <el-table :data="filteredStudents" style="width: 100%" :header-cell-style="headerCellStyle">
      <el-table-column prop="name" label="学生姓名" min-width="100" />
      <el-table-column label="头像" width="90">
        <template #default="{ row }">
          <div class="avatar-circle" :style="{ backgroundColor: getAvatarColor(row.name) }">
            {{ row.name.charAt(0) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="idCard" label="身份证号" min-width="180" />
      <el-table-column prop="studentId" label="学号" min-width="100" />
      <el-table-column prop="phone" label="联系方式" min-width="130" />
      <el-table-column label="操作" width="80" align="center">
        <template #default="{ row }">
          <el-dropdown trigger="click" @command="(cmd) => handleCommand(cmd, row)">
            <span class="op-dots">···</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="edit">编辑</el-dropdown-item>
                <el-dropdown-item command="remove" divided style="color: #f56c6c">移除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'

defineProps({
  classId: {
    type: Number,
    default: null,
  },
})

const keyword = ref('')
const searchKeyword = ref('')

const AVATAR_COLORS = [
  '#4361ee', '#3a86ff', '#7b2d8b', '#2ec4b6',
  '#e76f51', '#f4a261', '#06d6a0', '#ef476f',
]

function getAvatarColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

const students = ref([
  { id: 1, name: '张三',   idCard: '11010120050101234', studentId: '2024001', phone: '18600056601' },
  { id: 2, name: '梁嘉浩', idCard: '11010120050202135', studentId: '2024002', phone: '18111111111' },
  { id: 3, name: '李晓明', idCard: '31010120050303236', studentId: '2024003', phone: '13800138001' },
  { id: 4, name: '王芳',   idCard: '44010120050404237', studentId: '2024004', phone: '13900139001' },
  { id: 5, name: '刘洋',   idCard: '21010120050505138', studentId: '2024005', phone: '15900159001' },
  { id: 6, name: '陈静',   idCard: '33010120050606139', studentId: '2024006', phone: '13600136001' },
  { id: 7, name: '赵磊',   idCard: '12010120050707140', studentId: '2024007', phone: '13700137001' },
  { id: 8, name: '孙丽',   idCard: '13010120050808141', studentId: '2024008', phone: '13500135001' },
])

const filteredStudents = computed(() => {
  if (!searchKeyword.value) return students.value
  const kw = searchKeyword.value.trim()
  return students.value.filter(
    (s) => s.name.includes(kw) || s.studentId.includes(kw) || s.phone.includes(kw)
  )
})

const headerCellStyle = {
  backgroundColor: '#fafafa',
  color: '#666',
  fontWeight: '500',
  fontSize: '13px',
}

function handleSearch() {
  searchKeyword.value = keyword.value
}

function handleReset() {
  keyword.value = ''
  searchKeyword.value = ''
}

function handleCommand(cmd, row) {
  if (cmd === 'edit') {
    console.log('编辑学生', row)
  } else if (cmd === 'remove') {
    console.log('移除学生', row)
  }
}
</script>

<style scoped>
.student-list {
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Search Bar */
.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-label {
  font-size: 13px;
  color: #555;
  white-space: nowrap;
}

.search-input {
  width: 220px;
}

/* Avatar */
.avatar-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  user-select: none;
}

/* Operation dots */
.op-dots {
  font-size: 18px;
  font-weight: 700;
  color: #0078e0;
  cursor: pointer;
  letter-spacing: 2px;
  padding: 4px 6px;
  border-radius: 4px;
  transition: background 0.15s;
}

.op-dots:hover {
  background: #f0f2ff;
}
</style>
