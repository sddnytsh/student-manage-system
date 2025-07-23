<template>
  <div class="lbt-container"  @mouseenter="pause" @mouseleave="start">
    <div class="track"  :style="trackStyle">
      <div v-for="(img, i) in imgs" :key="i" class="lbt" :style="{ width: `100 / ${this.imgs.length}` }">
        <img :src="img" />
      </div>
    </div>
    <button class="left" @click="prev"><ion-icon name="chevron-back-outline"></ion-icon></button>
    <button class="right" @click="next"><ion-icon name="chevron-forward-outline"></ion-icon></button>
    <div class="dots">
      <span v-for="(_, i) in imgs" :key="i" :class="{ active: i === realIndex }" @click="go(i)"></span>
    </div>
  </div>
  <div class="container">
    <div class="announcement">
      <div class="title">公告</div>
      <div class="announcement-item" v-for="(announcement, i) in announcements" :key="i">
        <div class="content">{{ announcement.content }}</div>
        <div class="date">{{ announcement.date }}</div>
      </div>
    </div>
    <div class="academic">
      <div class="title">教务信息</div>
      <div class="academic-item" v-for="(academic, i) in academics" :key="i">
        <div class="content">{{ academic.content }}</div>
        <div class="date">{{ academic.date }}</div>
      </div>
    </div>
    <div class="lecture">
      <div class="title">讲座</div>
      <div class="lecture-item" v-for="(lecture, i) in lectures" :key="i">
        <div class="content">{{ lecture.content }}</div>
        <div class="date">{{ lecture.date }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StudentHomeView',
  data () {
    return {
      imgs: [
        '/images/lbt1.jpg',
        '/images/lbt2.jpg' // 添加照片的时候直接在后面添加就行
      ],
      realIndex: 0,
      timer: null,
      announcements: [
        { content: '欢迎来到学生管理系统！', date: '2024-10-01' },
        { content: '请注意查看最新公告。', date: '2024-10-02' },
        { content: '下周将举行新生入学讲座。', date: '2024-10-03' },
        { content: '请及时更新个人信息。', date: '2024-10-04' },
        { content: '请注意查看最新公告。', date: '2024-10-05' },
        { content: '下周将举行新生入学讲座。', date: '2024-10-06' }
      ],
      lectures: [
        { content: '新生入学讲座', date: '2024-10-07' },
        { content: '学术诚信与道德教育', date: '2024-10-08' },
        { content: '职业规划与发展', date: '2024-10-09' },
        { content: '心理健康与辅导', date: '2024-10-10' },
        { content: '校园安全与应急处理', date: '2024-10-11' }
      ],
      academics: [
        { content: '学术诚信与道德教育', date: '2024-10-12' },
        { content: '职业规划与发展', date: '2024-10-13' },
        { content: '心理健康与辅导', date: '2024-10-14' },
        { content: '校园安全与应急处理', date: '2024-10-15' },
        { content: '学术研究方法与技巧', date: '2024-10-16' }
      ]
    }
  },
  computed: {
    trackStyle () {
      return {
        width: `${this.imgs.length * 100}%`,
        transform: `translateX(${-this.realIndex * 100 / this.imgs.length}%)`
      }
    }
  },
  methods: {
    go (index) {
      this.realIndex = index
    },
    next () {
      this.realIndex = (this.realIndex + 1) % this.imgs.length
    },
    prev () {
      this.realIndex = (this.realIndex - 1 + this.imgs.length) % this.imgs.length
    },
    start () {
      this.timer = setInterval(this.next, 4000)
    },
    pause () {
      clearInterval(this.timer)
    }
  },
  mounted () {
    this.start()
  },
  beforeUnmount () {
    this.pause()
  }
}
</script>
<style scoped lang="scss">
.lbt-container {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  aspect-ratio: 10 / 3; //宽高比
  overflow: hidden;
  top: 20px;

  .track {
    height: 100%;
    transition: transform 0.5s ease-in-out;
    display: flex;
    gap: 0;

    .lbt {
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .left {
    position: absolute;
    width: 50px;
    height: 50px;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;

    ion-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 36px;
    }
  }

  .left:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .right {
    position: absolute;
    width: 50px;
    height: 50px;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;

    ion-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 36px;
    }
  }

  .right:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .dots {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;

    span {
      width: 10px;
      height: 10px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      cursor: pointer;

      &.active {
        background-color: white;
      }
    }
  }
}

.container {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  margin-top: 28px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .announcement {
    width: 400px;
    height: 420px;
    padding-inline: 10px;
    margin-bottom: 20px;

    .title {
      font-size: 28px;
      font-weight: bold;
      width: 100%;
      background-color: aliceblue;
      height: 60px;
      line-height: 60px;
    }

    .announcement-item {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #666;
      position: relative;

      .content {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 20px;
        margin: 0;
        padding: 10px;
        text-align: start;
      }

      .date {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 14px;
        margin: 0;
        padding: 5px;
        color: #666;
      }
    }
  }

  .academic {
    width: 400px;
    height: 420px;
    padding-inline: 10px;
    margin-bottom: 20px;

    .title {
      font-size: 28px;
      font-weight: bold;
      width: 100%;
      background-color: aliceblue;
      height: 60px;
      line-height: 60px;
    }

    .academic-item {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #666;
      position: relative;

      .content {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 20px;
        margin: 0;
        padding: 10px;
        text-align: start;
      }

      .date {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 14px;
        margin: 0;
        padding: 5px;
        color: #666;
      }
    }
  }

  .lecture {
    width: 400px;
    height: 420px;
    padding-inline: 10px;
    margin-bottom: 20px;

    .title {
      font-size: 28px;
      font-weight: bold;
      width: 100%;
      background-color: aliceblue;
      height: 60px;
      line-height: 60px;
    }

    .lecture-item {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #666;
      position: relative;

      .content {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 20px;
        margin: 0;
        padding: 10px;
        text-align: start;
      }

      .date {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 14px;
        margin: 0;
        padding: 5px;
        color: #666;
      }
    }
  }
}
</style>
