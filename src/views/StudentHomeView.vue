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
      realIndex: 0
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
</style>
