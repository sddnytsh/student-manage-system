<template>
    <div :class="themeClass">
        <div class="header">
            <div class="logo">
                <img src="/images/logo1.png">
            </div>
            <div></div>
            <div class="person">
                <img src="/images/default-avatar.png" class="avatar" alt="头像"> <!-- 更换头像逻辑未处理 -->
                <div class="dropdown-box">
                    <span class="dropdown-item" @click="openProfile"><ion-icon
                            name="person-circle-outline"></ion-icon>个人资料</span>
                    <span class="dropdown-item" @click="changeTheme"><ion-icon
                            name="moon-outline"></ion-icon>切换主题</span>
                    <span class="dropdown-iten" @click="openSettings"><ion-icon
                            name="settings-outline"></ion-icon>设置</span>
                    <span class="dropdown-item" @click="logout"><ion-icon
                            name="log-out-outline"></ion-icon>退出登录</span>
                </div>
            </div>
        </div>
        <div class="aside">
            <router-link to="/student/home" class="aside-item">
                <ion-icon name="home-sharp"></ion-icon>
                <span>首页</span>
            </router-link>
            <div class="aside-item" @click="changeStatus">
                <ion-icon name="body-sharp"></ion-icon>
                <span>学生管理</span>
                <ion-icon class="arrow" name="chevron-back-outline" v-if="!isActive"></ion-icon>
                <ion-icon class="arrow" name="chevron-down-outline" v-else></ion-icon>
            </div>
            <transition>
                <div v-show="isActive" class="sub-menu">
                    <router-link to="/student/courses" class="sub-item">
                        <ion-icon name="calendar-sharp"></ion-icon>
                        <span>课表</span>
                    </router-link>
                    <router-link to="/student/grades" class="sub-item">
                        <ion-icon name="stats-chart-sharp"></ion-icon>
                        <span>成绩</span>
                    </router-link>
                    <router-link to="/student/grab" class="sub-item">
                        <ion-icon name="file-tray-full-sharp"></ion-icon>
                        <span>抢课</span>
                    </router-link>
                    <router-link to="/student/profile" class="sub-item">
                        <ion-icon name="body-sharp"></ion-icon>
                        <span>个人信息</span>
                    </router-link>
                    <router-link to="/student/forum" class="sub-item">
                        <ion-icon name="chatbubbles-sharp"></ion-icon>
                        <span>虎踞龙蟠</span>
                    </router-link>
                </div>
            </transition>
            <router-link to="/student/contact" class="aside-item"><ion-icon
                    name="hammer-sharp"></ion-icon><span>联系我们</span></router-link>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
        <div class="cover1" v-show="showSettings">
            <div class="settings">
                <span class="close" @click="closeSettings"><ion-icon name="close-outline"></ion-icon></span>
                <div class="container">
                    <!-- 头像、姓名、性别、修改密码、退出登录 -->
                    <h1>设置</h1>
                    <div class="setting-item">
                        <span>头像</span>
                        <span @click="openPreview"><img src="/images/default-avatar.png" alt="头像"></span>
                    </div>
                    <div class="setting-item">
                        <span>姓名</span>
                        <span>张三</span>
                    </div>
                    <div class="setting-item">
                        <span>性别</span>
                        <span>男</span>
                    </div>
                    <div class="setting-item"> <!-- 密码显示和隐藏功能未实现 -->
                        <span>修改密码</span>
                        <span></span>
                    </div>
                    <button @click="logout">退出登录<ion-icon name="log-out-outline"></ion-icon></button>
                </div>
            </div>
        </div>
        <div class="cover2" v-show="showPreview" @click="closePreview">
            <div>
                <img src="/images/default-avatar.png" alt="头像">
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'StudentView',
  data () {
    return {
      isActive: false,
      showSettings: false,
      showPreview: false,
      theme: 'light'
    }
  },
  computed: {
    themeClass () {
      return {
        'theme-light': this.theme === 'light',
        'theme-dark': this.theme === 'dark'
      };
    }
  },
  methods: {
    logout () {
      this.$router.push('/login'); // 存在假退出登录逻辑，未处理
    },
    changeStatus () {
      this.isActive = !this.isActive;
    },
    openProfile () {
      this.$router.push('/student/profile');
    },
    openSettings () {
      this.showSettings = true;
    },
    closeSettings () {
      this.showSettings = false;
    },
    openPreview () {
      this.showPreview = true;
    },
    closePreview () {
      this.showPreview = false;
    },
    changeTheme () {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.theme);
    }
  },
  mounted () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.changeTheme(savedTheme);
  }
};
</script>
<style scoped lang="scss">
.theme-light {
  --header-bg: #0bb9c5;
  --sidebar-bg: #2f4050;
  --menu-text: #ffffff;
}

.theme-dark {
  --header-bg: #333333;
  --sidebar-bg: #1e1e1e;
  --menu-text: #ffffff;
}

.header {
    width: 100%;
    height: 70px;
    background-color: var(--header-bg);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;

    .logo {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            margin-left: 20px;
            width: 180px;
            height: 80%;
            object-fit: contain;
        }
    }

    .person {
        position: absolute;
        top: 0;
        right: 0;
        width: 70px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 2;

        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }

        .dropdown-box {
            position: absolute;
            top: 70px;
            right: 0;
            width: 200px;
            height: 200px;
            display: none;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background-color: #fefefe;
            z-index: 999;

            span {
                width: 100%;
                height: 50px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                padding: 0 10px;
                border-bottom: #000 solid 1px;
                font-size: 18px;

                ion-icon {
                    font-size: 22px;
                }
            }

            span:last-child {
                border-bottom: none;
            }

            span:hover {
                background-color: #f0f0f0;
            }
        }

        &:hover .dropdown-box {
            display: flex;
        }
    }
}

.aside {
    position: fixed;
    top: 70px;
    left: 0;
    width: 220px;
    height: calc(100% - 70px);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    border-right: #000 solid 1px;
    background-color: var(--sidebar-bg);

    .aside-item {
        width: 100%;
        height: 54px;
        text-align: start;
        line-height: 54px;
        padding-left: 20px;
        color: var(--menu-text);
        text-decoration: none;
        font-size: 18px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        gap: 10px;
        position: relative;

        .arrow {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
        }

        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }

        &.router-link-active {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }

    .sub-menu {
        width: 100%;
        height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;

        .sub-item {
            width: 100%;
            height: 50px;
            text-align: start;
            line-height: 50px;
            padding-left: 40px;
            color: var(--menu-text);
            text-decoration: none;
            font-size: 16px;
            display: flex;
            align-items: center;
            box-sizing: border-box;

            ion-icon {
                font-size: 20px;
                margin-right: 10px;
            }

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }

            &.router-link-active {
                background-color: rgba(255, 255, 255, 0.2);
            }
        }
    }
}

.main {
    position: absolute;
    top: 70px;
    left: 220px;
    width: calc(100% - 220px);
    height: calc(100% - 70px);
    overflow: auto;
}

.cover1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;

    .settings {
        position: absolute;
        max-width: 600px;
        min-width: 400px;
        width: 88%;
        height: 440px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;

        .close {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 30px;
            cursor: pointer;
        }

        .container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;

            h1 {
                margin: 8px;
                font-size: 32px;
            }

            .setting-item {
                width: 100%;
                height: 60px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                padding: 0 20px;
                border-bottom: 1px solid #ccc;
                font-size: 20px;

                span {
                    &:first-child {
                        text-align: start;
                    }

                    &:last-child {
                        text-align: end;
                        color: #777;
                    }

                    img {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        object-fit: cover;
                    }
                }

                &:nth-child(2) {
                    height: 80px;
                    border-top: 1px solid #ccc;
                }
            }

            button {
                width: 120px;
                height: 48px;
                background-color: rgb(235, 81, 81);
                border-radius: 10px;
                border: none;
                font-size: 18px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                bottom: 26px;
                left: 50%;
                transform: translateX(-50%);

                ion-icon {
                    margin-left: 8px;
                    font-size: 20px;
                }
            }
        }
    }
}

.cover2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;

    div {
        width: 400px;
        height: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>
