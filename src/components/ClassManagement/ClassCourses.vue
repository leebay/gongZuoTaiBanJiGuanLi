<template>
  <div class="class-courses">
    <!-- Semester Tabs -->
    <div class="semester-tabs">
      <button
        v-for="sem in semesters"
        :key="sem.id"
        class="semester-tab"
        :class="{ 'is-active': activeSemesterId === sem.id }"
        @click="activeSemesterId = sem.id"
      >
        {{ sem.label }}
      </button>
    </div>

    <!-- Course Grid -->
    <div class="course-grid">
      <CourseCard
        v-for="course in activeCourses"
        :key="course.id"
        :course="course"
        @click="handleCourseClick(course)"
      />
      <div class="add-course-card" @click="handleAddCourse">
        <el-icon class="add-icon"><Plus /></el-icon>
        <span>添加课程</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import CourseCard from './CourseCard.vue'

const props = defineProps({
  semesters: {
    type: Array,
    default: () => [],
  },
})

const activeSemesterId = ref(props.semesters[0]?.id ?? null)

const activeCourses = computed(() => {
  const sem = props.semesters.find((s) => s.id === activeSemesterId.value)
  return sem?.courses ?? []
})

function handleCourseClick(course) {
  console.log('打开课程', course)
}

function handleAddCourse() {
  console.log('添加课程')
}
</script>

<style scoped>
.class-courses {
  padding: 20px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Semester Tabs */
.semester-tabs {
  display: flex;
  gap: 4px;
  background: #f3f4f8;
  border-radius: 8px;
  padding: 4px;
  width: fit-content;
}

.semester-tab {
  padding: 6px 16px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.semester-tab:hover {
  color: #5b6ef5;
}

.semester-tab.is-active {
  background: #5b6ef5;
  color: #fff;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(91, 110, 245, 0.3);
}

/* Course Grid */
.course-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/* Add Course Card */
.add-course-card {
  width: 148px;
  height: 148px;
  border: 1.5px dashed #c8cde8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  color: #aab0cc;
  font-size: 13px;
  transition: all 0.2s;
  background: #fafbff;
}

.add-course-card:hover {
  border-color: #5b6ef5;
  color: #5b6ef5;
  background: #f5f7ff;
}

.add-icon {
  font-size: 20px;
}
</style>
