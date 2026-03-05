<template>
  <div class="course-card" @click="$emit('click')">
    <!-- Cover Area -->
    <div class="card-cover">
      <img v-if="course.cover" :src="course.cover" :alt="course.name" class="cover-img" />
      <div v-else class="cover-placeholder">
        <el-icon class="cover-icon"><Cellphone /></el-icon>
      </div>
      <!-- Badge -->
      <span v-if="course.type" class="course-badge" :class="`badge-${course.type}`">
        {{ badgeLabel }}
      </span>
    </div>
    <!-- Title -->
    <div class="card-title">{{ course.name }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Cellphone } from '@element-plus/icons-vue'

const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
})

defineEmits(['click'])

const BADGE_MAP = {
  open: '开源课程',
  private: '自建课程',
  shared: '共享课程',
}

const badgeLabel = computed(() => BADGE_MAP[props.course.type] ?? props.course.type)
</script>

<style scoped>
.course-card {
  width: 200px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eee;
  transition: box-shadow 0.2s, transform 0.2s;
  background: #fff;
}

.course-card:hover {
  box-shadow: 0 4px 16px rgba(91, 110, 245, 0.15);
  transform: translateY(-2px);
}

/* Cover */
.card-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  height: auto;
  background: linear-gradient(135deg, #1e2a6e 0%, #2d3a8c 100%);
  overflow: hidden;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-icon {
  font-size: 32px;
  color: rgba(255, 255, 255, 0.45);
}

/* Badge */
.course-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
  line-height: 18px;
}

.badge-open {
  background: #0078e0;
  color: #fff;
}

.badge-private {
  background: #ff7d45;
  color: #fff;
}

.badge-shared {
  background: #00a67d;
  color: #fff;
}

/* Title */
.card-title {
  padding: 8px 10px;
  font-size: 13px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
