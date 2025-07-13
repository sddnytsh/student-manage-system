<template>
    <div class="header">
        <div class="logo">
            <img src="/images/logo1.png">
        </div>
        <div></div>
        <div class="person">
            <img src="/images/default-avatar.png" class="avatar"> <!-- 更换头像逻辑未处理 -->
            <div class="dropdown-box">
                <span class="dropdown-item"><ion-icon name="person-circle-outline"></ion-icon>个人资料</span> <!--个人资料逻辑未处理-->
                <span class="dropdown-item"><ion-icon name="moon-outline"></ion-icon>切换主题</span> <!-- 切换主题逻辑未处理 -->
                <span class="dropdown-iten"><ion-icon name="settings-outline"></ion-icon>设置</span> <!-- 设置逻辑未处理 -->
                <span class="dropdown-item" @click="logout"><ion-icon name="log-out-outline"></ion-icon>退出登录</span>
            </div>
        </div>
    </div>
    <div class="aside"> <!--当前所处router-link变色未处理-->
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
                    <ion-icon name="stats-chart-sharp"></ion-icon>
                    <span>课程</span>
                </router-link>
                <router-link to="/student/grades" class="sub-item">
                    <ion-icon name="stats-chart-sharp"></ion-icon>
                    <span>成绩</span>
                </router-link>
                <router-link to="/student/profile" class="sub-item">
                    <ion-icon name="body-sharp"></ion-icon>
                    <span>个人信息</span>
                </router-link>
            </div>
        </transition>
        <router-link to="/student/chatToUs" class="aside-item"><ion-icon name="hammer-sharp"></ion-icon><span>联系我们</span></router-link>
    </div>
    <div class="main">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
  name: 'StudentView',
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    logout () {
      this.$router.push('/login'); // 存在假退出登录逻辑，未处理
    },
    changeStatus () {
      this.isActive = !this.isActive;
    }
  }
};
</script>
<style scoped lang="scss">
.header {
    width: 100%;
    height: 70px;
    background-color: rgb(11, 185, 197);
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
    background-color: rgb(47, 64, 80);

    .aside-item {
        width: 100%;
        height: 54px;
        text-align: start;
        line-height: 54px;
        padding-left: 20px;
        color: #000;
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
            background-color: #f0f0f0;
        }
    }

    .sub-menu {
        width: 100%;
        height: 150px;
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
            color: #000;
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
                background-color: #f0f0f0;
            }
        }
    }
}

.main {
    position: absolute;
    top: 70px;
    left: 200px;
    width: calc(100% - 220px);
    height: calc(100% - 70px);
}
</style>
