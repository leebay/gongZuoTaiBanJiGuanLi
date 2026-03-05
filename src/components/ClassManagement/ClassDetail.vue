<template>
  <div class="class-detail">
    <!-- Header + Info Bar in one card -->
    <div class="detail-header-card">
      <div class="header-row">
        <div class="header-left">
          <h2 class="class-name">{{ classInfo.name }}</h2>
          <span class="class-tag" :class="classInfo.type === 'shared' ? 'tag-shared' : 'tag-self'">
            {{ classInfo.type === 'shared' ? '共享班' : '自建班' }}
          </span>
        </div>
        <div class="header-actions">
          <el-button @click="$emit('edit', classInfo)">
            <el-icon><EditPen /></el-icon>
            修改信息
          </el-button>
          <el-button
            :disabled="classInfo.deletable === false"
            @click="$emit('delete', classInfo)"
          >
            <el-icon><Delete /></el-icon>
            删除班级
          </el-button>
          <el-button type="danger" plain @click="$emit('quit', classInfo)">
            退出班级
          </el-button>
        </div>
      </div>

      <div class="info-bar">
        <div class="info-item">
          <span class="info-label">
            <el-icon><User /></el-icon>
            关联老师
          </span>
          <span class="info-value">{{ classInfo.teacher || '—' }}</span>
        </div>
        <div class="info-divider" />
        <div class="info-item">
          <span class="info-label">
            <el-icon><Avatar /></el-icon>
            学生人数
          </span>
          <span class="info-value">{{ classInfo.studentCount ?? 0 }} 人</span>
        </div>
        <div class="info-divider" />
        <div class="info-item">
          <span class="info-label">
            <el-icon><Reading /></el-icon>
            授课数量
          </span>
          <span class="info-value">{{ classInfo.courseCount ?? 0 }} 门</span>
        </div>
        <div class="info-divider" />
        <div class="info-item">
          <span class="info-label">
            <el-icon><Timer /></el-icon>
            创建时间
          </span>
          <span class="info-value">{{ classInfo.createDate || '—' }}</span>
        </div>
      </div>
    </div>

    <!-- Tab Navigation + Content in one card -->
    <div class="tab-card">
      <div class="tab-nav">
        <div class="tab-nav-left">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="tab-btn"
            :class="{ 'is-active': activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>
        <div v-if="activeTab === 'students'" class="tab-nav-right">
          <el-button size="small" text @click="handleDownloadTemplate">
            <el-icon><Download /></el-icon>
            下载导入模板
          </el-button>
          <el-button size="small" type="primary" @click="handleImport">
            <el-icon><Upload /></el-icon>
            导入
          </el-button>
          <el-button size="small" type="primary" @click="handleAddStudent">
            <el-icon><Plus /></el-icon>
            新增
          </el-button>
          <el-button size="small" type="primary" @click="handleLinkStudent">
            <el-icon><Link /></el-icon>
            关联学生
          </el-button>
        </div>
      </div>
      <div class="tab-content">
        <ClassCourses
          v-if="activeTab === 'courses'"
          :semesters="classInfo.semesters || []"
        />
        <StudentList
          v-else-if="activeTab === 'students'"
          :class-id="classInfo.id"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { EditPen, Delete, User, Avatar, Reading, Timer, Download, Upload, Plus, Link } from '@element-plus/icons-vue'
import ClassCourses from './ClassCourses.vue'
import StudentList from './StudentList.vue'

defineProps({
  classInfo: {
    type: Object,
    required: true,
  },
})

defineEmits(['edit', 'delete', 'quit'])

const activeTab = ref('courses')

const tabs = [
  { key: 'courses', label: '班级课程' },
  { key: 'students', label: '学生名单' },
]

function handleDownloadTemplate() { console.log('下载导入模板') }
function handleImport() { console.log('导入') }
function handleAddStudent() { console.log('新增学生') }
function handleLinkStudent() { console.log('关联学生') }
</script>

<style scoped>
.class-detail {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  align-self: flex-start;
}

/* Header + Info card */
.detail-header-card {
  background: #fff;
  border-radius: 8px;
  padding: 18px 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.class-name {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

.class-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
}

.tag-shared {
  color: #00a67d;
  background-color: #e6f7f3;
}

.tag-self {
  color: #0078e0;
  background-color: #e6f2fc;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.header-actions .el-button {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Info Bar */
.info-bar {
  display: flex;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;
}

.info-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #999;
}

.info-label .el-icon {
  font-size: 13px;
}

.info-value {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a2e;
}

.info-divider {
  width: 1px;
  height: 36px;
  background: #eee;
  flex-shrink: 0;
  margin: 0 20px;
}

/* Tab Card */
.tab-card {
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

/* Tab Nav */
.tab-nav {
  padding: 12px 16px 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.tab-nav-left {
  display: flex;
  align-items: center;
  background: #f0f2f5;
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}

.tab-nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-btn {
  padding: 6px 20px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 14px;
  color: #888;
  cursor: pointer;
  transition: all 0.18s;
  font-weight: 400;
  white-space: nowrap;
}

.tab-btn:hover {
  color: #0078e0;
}

.tab-btn.is-active {
  background: #fff;
  color: #0078e0;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* Tab Content */
.tab-content {
  overflow: visible;
}
</style>
