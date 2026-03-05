<template>
  <div class="class-list">
    <h3 class="list-title">我的班级</h3>
    <ul class="list-items">
      <li
        v-for="item in classes"
        :key="item.id"
        class="list-item"
        :class="{ 'is-active': item.id === activeId }"
        @click="$emit('select', item.id)"
      >
        <el-icon class="item-icon"><UserFilled /></el-icon>
        <span class="item-name">{{ item.name }}</span>
        <span class="item-tag" :class="item.type === 'shared' ? 'tag-shared' : 'tag-self'">
          {{ item.type === 'shared' ? '共享班' : '自建班' }}
        </span>
      </li>
    </ul>
    <button class="add-btn" @click="$emit('add')">
      <el-icon><Plus /></el-icon>
      添加班级
    </button>
  </div>
</template>

<script setup>
import { UserFilled, Plus } from '@element-plus/icons-vue'

defineProps({
  classes: {
    type: Array,
    default: () => [],
  },
  activeId: {
    type: Number,
    default: null,
  },
})

defineEmits(['select', 'add'])
</script>

<style scoped>
.class-list {
  width: 280px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 8px;
  padding: 20px 0 16px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
}

.list-title {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  padding: 0 16px 14px;
  border-bottom: 1px solid #f0f0f0;
  margin: 0;
}

.list-items {
  list-style: none;
  padding: 8px 0;
  flex: 1;
  overflow-y: auto;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: all 0.2s;
  color: #555;
  font-size: 13px;
}

.list-item:hover {
  background-color: #f5f7ff;
  color: #0078e0;
}

.list-item.is-active {
  background-color: #e6f2fc;
  border-left-color: #0078e0;
  color: #0078e0;
  font-weight: 500;
}

.item-icon {
  font-size: 16px;
  flex-shrink: 0;
  color: inherit;
}

.item-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-tag {
  flex-shrink: 0;
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 10px;
  font-weight: 500;
  line-height: 18px;
}

.tag-shared {
  color: #00a67d;
  background-color: #e6f7f3;
}

.tag-self {
  color: #0078e0;
  background-color: #e6f2fc;
}

.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 8px 16px 4px;
  padding: 9px 0;
  border: 1.5px dashed #9ec5e8;
  border-radius: 6px;
  background: transparent;
  color: #6aa3cc;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.add-btn:hover {
  border-color: #0078e0;
  color: #0078e0;
  background-color: #f5f7ff;
}
</style>
