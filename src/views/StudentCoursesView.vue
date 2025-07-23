<script>
export default {
  name: 'StudentCoursesView',
  data () {
    return {
      selectedWeek: 1,
      weeks: Array.from({ length: 16 }, (_, i) => i + 1),
      firstDayOfSemester: new Date('2023-09-04'),
      timeSlots: [
        '08:00-08:45', '08:50-09:35', '09:50-10:35', '10:40-11:25',
        '11:30-12:15', '14:00-14:45', '14:50-15:35', '15:50-16:35',
        '16:40-17:25', '17:30-18:15', '19:00-19:45', '19:50-20:35',
        '20:40-20:25'
      ],
      courses: [
        { name: '高等数学', start: 1, end: 2, day: 1 },
        { name: '大学英语', start: 3, end: 4, day: 2 },
        { name: '计算机基础', start: 5, end: 6, day: 3 },
        { name: '大学物理', start: 7, end: 8, day: 4 },
        { name: '体育', start: 9, end: 10, day: 5 }
      ]
    }
  },
  methods: {
    getWeekDates (selectedWeek) {
      const week = [];
      const currentWeek = selectedWeek - 1;
      const firstDay = new Date(this.firstDayOfSemeter);
      for (let i = 0; i < 7; i++) {
        const date = new Date(firstDay);
        date.setDate(firstDay.getDate() + currentWeek * 7 + i);
        week.push(date);
      }
      return week;
    },
    getCoursesForDay (day, selectedWeek) {
      return this.courses.filter(course => course.day === day && course.start >= (selectedWeek - 1) * 2 + 1 && course.end <= selectedWeek * 2);
    },
    calculateTop (startSlot) {
      return (startSlot - 1) * (100 / this.timeSlots.length);
    },
    calculateHeight (startSlot, endSlot) {
      return (endSlot - startSlot + 1) * (100 / this.timeSlots.length);
    }
  }
}
</script>
<template>
  <div class="schedule">
    <div class="week">
      <select v-model="selectedWeek">
        <option v-for="week in weeks" :key="week" :value="week">第 {{ week }} 周</option>
      </select>
    </div>
    <div class="header">
      <div class="day"></div>
      <div class="day" v-for="(date, i) in getWeekDates(selectedWeek)" :key="i">
        <div class="day-name">{{ ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()] }}</div>
        <div class="day-date">{{ date.getDate() }}</div>
      </div>
    </div>
    <div class="row">
      <div class="time">
        <div class="slot" v-for="(slot, i) in timeSlots" :key="i">
          {{ slot }}
        </div>
      </div>
      <div class="blank-container">
        <div class="blank"  v-for="i in 7" :key="i">
          <div class="slot" v-for="(_, i) in timeSlots" :key="i">
          </div>
        </div>
      </div>
    </div>
    <div class="days" v-for="(date, i) in getWeekDates(selectedWeek)" :key="i">
      <div class="courses">
        <div class="course" v-for="course in getCoursesForDay(date.getDay(), selectedWeek)" :key="course.name" :style="{
          top: `${calculateTop(course.start)}%`,
          height: `${calculateHeight(course.start, course.end)}%`
        }">
          {{ course.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.schedule {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  min-width: 800px;
  margin-block: 20px;

  .week {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    select {
      width: 150px;
      height: 46px;
      font-size: 26px;
      border: 1px solid #ccc;
      border-radius: 5px;
      text-align: center;
    }
  }

  .header {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    .day {
      box-sizing: border-box;
      width: 12.5%;
      height: 100%;
      border: #ccc solid 1px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px;

      .day-name {
        font-size: 20px;
        text-align: center;
      }

      .day-date {
        font-size: 16px;
        text-align: center;
      }
    }
  }

  .row {
    width: 100%;
    position: relative;

    .time {
      position: absolute;
      left: 0;
      top: 0;
      width: 12.5%;
      display: flex;
      flex-direction: column;

      .slot {
        box-sizing: border-box;
        width: 100%;
        height: 80px;
        border: #ccc solid 1px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
      }
    }

    .blank-container {
      position: absolute;
      left: 12.5%;
      top: 0;
      width: 87.5%;
      display: flex;
      flex-direction: row;

      .blank {
        width: calc(100% / 7);
        display: flex;
        flex-direction: column;

        .slot {
          box-sizing: border-box;
          width: 100%;
          height: 80px;
          border: #ccc solid 1px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
        }
      }
    }
  }

  .days {
    position: absolute;
    left: 12.5%;
    top: 80px;
    width: 87.5%;
    display: flex;
    flex-direction: row;

    .courses {
      position: relative;
      width: calc(100% / 7);
      height: calc(80px * 13);

      .course {
        position: absolute;
        left: 0;
        width: 100%;
        background: rgba(100, 180, 255, 0.7);
        border: 1px solid #64b4ff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 2px 4px;
        overflow: hidden;
        color: white;
        font-size: 14px;
        z-index: 10;

        &:hover {
          background: rgba(80, 160, 240, 0.9);
          z-index: 20;
        }
      }
    }
  }
}
</style>
