<template>
  <div class="class-courses">
    <!-- Course Grid -->
    <div class="course-grid">
      <CourseCard
        v-for="course in allCourses"
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
import { computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import CourseCard from './CourseCard.vue'

const props = defineProps({
  semesters: {
    type: Array,
    default: () => [],
  },
})

// 汇总所有学期的课程
const allCourses = computed(() =>
  props.semesters.flatMap((s) => s.courses ?? [])
)

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
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Course Grid */
.course-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/* Add Course Card */
.add-course-card {
  width: 200px;
  aspect-ratio: 4 / 3;
  height: auto;
  border: 1.5px dashed #9ec5e8;
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
  border-color: #0078e0;
  color: #0078e0;
  background: #f0f7ff;
}

.add-icon {
  font-size: 20px;
}
</style>
