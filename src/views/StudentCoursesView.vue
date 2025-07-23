<template>
  <div class="schedule-container">
    <!-- Header -->
    <div class="header">
      <div class="header-content">
        <h1 class="title">我的课程表</h1>
        <div class="week-selector">
          <label for="week-select">选择周数：</label>
          <select id="week-select" v-model="selectedWeek" class="week-select">
            <option v-for="week in weeks" :key="week.value" :value="week.value">
              {{ week.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Schedule Table -->
    <div class="schedule-wrapper">
      <div class="schedule-table">
        <!-- Table Header -->
        <div class="table-header">
          <div class="time-header">时间</div>
          <div
            v-for="day in weekDays"
            :key="day.key"
            class="day-header"
          >
            <div class="day-name">{{ day.name }}</div>
            <div class="day-date">{{ day.date }}</div>
          </div>
        </div>

        <!-- Table Body -->
        <div class="table-body">
          <div
            v-for="(timeSlot, index) in timeSlots"
            :key="index"
            class="time-row"
          >
            <!-- Time Column -->
            <div class="time-cell">
              <div class="time-period">{{ timeSlot }}</div>
              <div class="time-index">第{{ index + 1 }}节</div>
            </div>

            <!-- Course Columns -->
            <div
              v-for="day in weekDays"
              :key="`${day.key}-${index}`"
              class="course-cell"
              @click="handleCellClick(day.key, index)"
            >
              <div
                v-if="getCourse(day.key, index)"
                class="course-item"
                :class="getCourseClass(getCourse(day.key, index))"
                @click.stop="showCourseDetail(getCourse(day.key, index))"
              >
                <div class="course-name">{{ getCourse(day.key, index).name }}</div>
                <div class="course-location">{{ getCourse(day.key, index).location }}</div>
                <div class="course-teacher">{{ getCourse(day.key, index).teacher }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Course Detail Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">课程详情</h3>
          <button class="close-btn" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="modal-body" v-if="selectedCourse">
          <div class="course-detail-item">
            <span class="detail-label">课程名称：</span>
            <span class="detail-value">{{ selectedCourse.name }}</span>
          </div>
          <div class="course-detail-item">
            <span class="detail-label">授课教师：</span>
            <span class="detail-value">{{ selectedCourse.teacher }}</span>
          </div>
          <div class="course-detail-item">
            <span class="detail-label">上课地点：</span>
            <span class="detail-value">{{ selectedCourse.location }}</span>
          </div>
          <div class="course-detail-item">
            <span class="detail-label">上课时间：</span>
            <span class="detail-value">{{ selectedCourse.time }}</span>
          </div>
          <div class="course-detail-item">
            <span class="detail-label">课程人数：</span>
            <span class="detail-value">{{ selectedCourse.studentCount }}人</span>
          </div>
          <div class="course-detail-item">
            <span class="detail-label">课程群号：</span>
            <span class="detail-value">{{ selectedCourse.groupNumber }}</span>
          </div>
          <div class="course-detail-item">
            <span class="detail-label">课程类型：</span>
            <span class="detail-value">{{ selectedCourse.type }}</span>
          </div>
          <div class="course-detail-item">
            <span class="detail-label">学分：</span>
            <span class="detail-value">{{ selectedCourse.credits }}学分</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const selectedWeek = ref(1)
const showModal = ref(false)
const selectedCourse = ref(null)

const weeks = ref([
  { value: 1, label: '第1周 (2024.02.26 - 2024.03.03)' },
  { value: 2, label: '第2周 (2024.03.04 - 2024.03.10)' },
  { value: 3, label: '第3周 (2024.03.11 - 2024.03.17)' },
  { value: 4, label: '第4周 (2024.03.18 - 2024.03.24)' },
  { value: 5, label: '第5周 (2024.03.25 - 2024.03.31)' },
  { value: 6, label: '第6周 (2024.04.01 - 2024.04.07)' },
  { value: 7, label: '第7周 (2024.04.08 - 2024.04.14)' },
  { value: 8, label: '第8周 (2024.04.15 - 2024.04.21)' },
  { value: 9, label: '第9周 (2024.04.22 - 2024.04.28)' },
  { value: 10, label: '第10周 (2024.04.29 - 2024.05.05)' }
])

const timeSlots = [
  '08:00-08:45',
  '08:50-09:35',
  '09:50-10:35',
  '10:40-11:25',
  '11:30-12:15',
  '14:00-14:45',
  '14:50-15:35',
  '15:50-16:35',
  '16:40-17:25',
  '17:30-18:15',
  '19:00-19:45',
  '19:50-20:35',
  '20:40-21:25'
]

const weekDays = computed(() => {
  const baseDate = new Date(2024, 1, 26) // 2024年2月26日为第1周周一
  const weekOffset = (selectedWeek.value - 1) * 7

  return [
    { key: 'monday', name: '周一', date: '' },
    { key: 'tuesday', name: '周二', date: '' },
    { key: 'wednesday', name: '周三', date: '' },
    { key: 'thursday', name: '周四', date: '' },
    { key: 'friday', name: '周五', date: '' },
    { key: 'saturday', name: '周六', date: '' },
    { key: 'sunday', name: '周日', date: '' }
  ].map((day, index) => {
    const currentDate = new Date(baseDate)
    currentDate.setDate(baseDate.getDate() + weekOffset + index)
    return {
      ...day,
      date: `${currentDate.getMonth() + 1}/${currentDate.getDate()}`
    }
  })
})

const courses = ref({
  monday: {
    0: {
      name: '高等数学A',
      teacher: '张教授',
      location: '教学楼A101',
      time: '周一 08:00-08:45',
      studentCount: 120,
      groupNumber: '123456789',
      type: '必修课',
      credits: 4,
      color: 'blue'
    },
    2: {
      name: '大学英语',
      teacher: '李老师',
      location: '外语楼201',
      time: '周一 09:50-10:35',
      studentCount: 45,
      groupNumber: '987654321',
      type: '必修课',
      credits: 2,
      color: 'green'
    }
  },
  tuesday: {
    1: {
      name: '数据结构',
      teacher: '王教授',
      location: '计算机楼301',
      time: '周二 08:50-09:35',
      studentCount: 80,
      groupNumber: '456789123',
      type: '专业课',
      credits: 3,
      color: 'purple'
    },
    6: {
      name: '体育课',
      teacher: '刘教练',
      location: '体育馆',
      time: '周二 14:50-15:35',
      studentCount: 30,
      groupNumber: '789123456',
      type: '必修课',
      credits: 1,
      color: 'orange'
    }
  },
  wednesday: {
    3: {
      name: '线性代数',
      teacher: '陈教授',
      location: '教学楼B205',
      time: '周三 10:40-11:25',
      studentCount: 100,
      groupNumber: '321654987',
      type: '必修课',
      credits: 3,
      color: 'red'
    },
    5: {
      name: '计算机网络',
      teacher: '赵老师',
      location: '计算机楼401',
      time: '周三 14:00-14:45',
      studentCount: 60,
      groupNumber: '654987321',
      type: '专业课',
      credits: 3,
      color: 'teal'
    }
  },
  thursday: {
    0: {
      name: '概率论',
      teacher: '孙教授',
      location: '教学楼C102',
      time: '周四 08:00-08:45',
      studentCount: 90,
      groupNumber: '147258369',
      type: '必修课',
      credits: 3,
      color: 'indigo'
    },
    10: {
      name: '软件工程',
      teacher: '周老师',
      location: '计算机楼501',
      time: '周四 19:00-19:45',
      studentCount: 70,
      groupNumber: '369258147',
      type: '专业课',
      credits: 3,
      color: 'pink'
    }
  },
  friday: {
    2: {
      name: '操作系统',
      teacher: '吴教授',
      location: '计算机楼201',
      time: '周五 09:50-10:35',
      studentCount: 85,
      groupNumber: '258147369',
      type: '专业课',
      credits: 4,
      color: 'cyan'
    },
    7: {
      name: '数据库原理',
      teacher: '郑老师',
      location: '计算机楼302',
      time: '周五 15:50-16:35',
      studentCount: 75,
      groupNumber: '741852963',
      type: '专业课',
      credits: 3,
      color: 'yellow'
    }
  }
})

const getCourse = (day, timeIndex) => {
  return courses.value[day] && courses.value[day][timeIndex]
}

const getCourseClass = (course) => {
  return `course-${course.color}`
}

const showCourseDetail = (course) => {
  selectedCourse.value = course
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedCourse.value = null
}

const handleCellClick = (day, timeIndex) => {
  // 可以在这里添加空白单元格点击事件，比如添加课程
  console.log(`Clicked empty cell: ${day}, time slot ${timeIndex}`)
}

onMounted(() => {
  // 组件挂载后的初始化逻辑
})
</script>

<style scoped lang="scss">
.schedule-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;

  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      color: white;
      font-size: 1.8rem;
      font-weight: 600;
      margin: 0;
    }

    .week-selector {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;

      label {
        font-weight: 500;
      }

      .week-select {
        padding: 0.5rem 1rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        font-size: 0.9rem;
        backdrop-filter: blur(10px);

        &:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
        }

        option {
          background: #4a5568;
          color: white;
        }
      }
    }
  }
}

.schedule-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  overflow-x: auto;
}

.schedule-table {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-width: 1200px;
}

.table-header {
  display: grid;
  grid-template-columns: 120px repeat(7, 1fr);
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

  .time-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }

  .day-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem 0.5rem;
    color: white;
    border-right: 1px solid rgba(255, 255, 255, 0.2);

    &:last-child {
      border-right: none;
    }

    .day-name {
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    .day-date {
      font-size: 0.85rem;
      opacity: 0.9;
    }
  }
}

.table-body {
  .time-row {
    display: grid;
    grid-template-columns: 120px repeat(7, 1fr);
    border-bottom: 1px solid #e2e8f0;

    &:last-child {
      border-bottom: none;
    }

    .time-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem 0.5rem;
      background: #f8fafc;
      border-right: 1px solid #e2e8f0;
      min-height: 80px;

      .time-period {
        font-weight: 600;
        color: #2d3748;
        font-size: 0.9rem;
      }

      .time-index {
        font-size: 0.75rem;
        color: #718096;
        margin-top: 0.25rem;
      }
    }

    .course-cell {
      border-right: 1px solid #e2e8f0;
      min-height: 80px;
      position: relative;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:last-child {
        border-right: none;
      }

      &:hover:not(:has(.course-item)) {
        background: #f7fafc;
      }

      .course-item {
        height: 100%;
        padding: 0.75rem 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        border-radius: 6px;
        margin: 2px;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .course-name {
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 0.25rem;
          line-height: 1.2;
        }

        .course-location {
          font-size: 0.75rem;
          opacity: 0.9;
          margin-bottom: 0.25rem;
        }

        .course-teacher {
          font-size: 0.7rem;
          opacity: 0.8;
        }

        // 课程颜色主题
        &.course-blue {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        &.course-green {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          color: white;
        }

        &.course-purple {
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
          color: #2d3748;
        }

        &.course-orange {
          background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
          color: #2d3748;
        }

        &.course-red {
          background: linear-gradient(135deg, #ff6b6b 0%, #ffa8a8 100%);
          color: white;
        }

        &.course-teal {
          background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
          color: white;
        }

        &.course-indigo {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        &.course-pink {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
        }

        &.course-cyan {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
        }

        &.course-yellow {
          background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
          color: #2d3748;
        }
      }
    }
  }
}

// Modal样式
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;

    .modal-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 6px;
      color: #718096;
      transition: all 0.2s ease;

      &:hover {
        background: #f7fafc;
        color: #2d3748;
      }

      svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }

  .modal-body {
    padding: 1.5rem;

    .course-detail-item {
      display: flex;
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }

      .detail-label {
        font-weight: 600;
        color: #4a5568;
        min-width: 100px;
        flex-shrink: 0;
      }

      .detail-value {
        color: #2d3748;
        flex: 1;
      }
    }
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .schedule-wrapper {
    padding: 1rem 0.5rem;
  }

  .schedule-table {
    min-width: 1000px;
  }
}

@media (max-width: 768px) {
  .header .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;

    .title {
      font-size: 1.5rem;
    }
  }

  .schedule-table {
    min-width: 800px;
  }

  .table-header {
    grid-template-columns: 100px repeat(7, 1fr);

    .time-header {
      padding: 0.75rem 0.5rem;
      font-size: 0.9rem;
    }

    .day-header {
      padding: 0.75rem 0.25rem;

      .day-name {
        font-size: 0.9rem;
      }

      .day-date {
        font-size: 0.8rem;
      }
    }
  }

  .table-body .time-row {
    grid-template-columns: 100px repeat(7, 1fr);

    .time-cell {
      padding: 0.75rem 0.25rem;
      min-height: 70px;

      .time-period {
        font-size: 0.8rem;
      }

      .time-index {
        font-size: 0.7rem;
      }
    }

    .course-cell {
      min-height: 70px;

      .course-item {
        padding: 0.5rem 0.25rem;

        .course-name {
          font-size: 0.8rem;
        }

        .course-location {
          font-size: 0.7rem;
        }

        .course-teacher {
          font-size: 0.65rem;
        }
      }
    }
  }

  .modal-content {
    margin: 1rem;
    width: calc(100% - 2rem);
  }
}

@media (max-width: 480px) {
  .schedule-table {
    min-width: 600px;
  }

  .table-header {
    grid-template-columns: 80px repeat(7, 1fr);
  }

  .table-body .time-row {
    grid-template-columns: 80px repeat(7, 1fr);
  }
}
</style>
