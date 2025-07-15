/* eslint-disable */
<template>
    <div class="container" :style="{backgroundImage: `url(${randomImage})`}"></div>
    <div class="login">
        <div class="left">
            <div class="form">
                <div class="title">
                    <img src="/images/logo2.png">
                    <h1>身份认证中心</h1>
                </div>
                <form @submit.prevent="goToHome">
                    <input type="text" class="account" placeholder="账号" required v-model="account">
                    <input type="password" class="password" placeholder="密码" required v-model="password">
                    <button type="submit" @click="goToHome">登录</button>
                    <button type="button" id="forget">忘记密码</button>
                </form>
            </div>
        </div>
        <div class="right">
            <img class="background" :src="randomImage">
            <img class="logo" src="/images/logo1.png">
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      account: '',
      password: '',
      randomImage: '',
      images: [
        '/images/LoginBackground1.jpg',
        '/images/LoginBackground2.jpg'
      ]
    }
  },
  methods: {
    goToHome () {
      if (this.account === '' || this.password === '') {
        alert('请输入账号和密码!')
        return
      }
      this.$router.push('/student') // 不同角色不同路由，未处理
    },
    loadRandomImage () {
      const randomIndex = Math.floor(Math.random() * this.images.length);
      this.randomImage = this.images[randomIndex];
    }
  },
  mounted () {
    this.loadRandomImage();
  }
}
</script>
<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    filter: blur(10px);
}

.login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 90%;
    height: 75%;
    min-height: 600px;
    border-radius: 50px;
    overflow: hidden;

    .left {
        z-index: 1;
        background-color: #fff;
        position: absolute;
        left: 0;
        height: 100%;
        width: 45%;
        min-width: 600px;

        .form {
            margin-top: 30px;
            width: 50%;
            height: 500px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: transform 0.3s ease-in-out;

            .title {
                text-align: center;
                margin-bottom: 38px;

                img {
                    width: 200px;
                    height: 60px;
                    margin: 0;
                }

                h1 {
                    font-size: 26px;
                    font-weight: 700;
                    letter-spacing: 3px;
                    margin: 0;
                }
            }

            form {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 20px;

                input {
                    height: 24px;
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 30px;
                    border: 1px solid #ccc;
                    border-radius: 20px;
                    box-shadow: rgb(245, 245, 245) 3px 3px 3px 3px;
                }

                button {
                    width: 100%;
                    height: 45px;
                    padding: 10px;
                    border: none;
                    border-radius: 20px;
                    background-color: #58c55f;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    margin-top: 10px;

                    &[type="button"] {
                        margin-top: 20px;
                        background-color: #818681;
                    }

                    &:hover {
                        background-color: #4ca652;
                        color: #a8aaa8;
                    }

                    &[type="button"]:hover {
                        background-color: #616361;
                        color: #a8aaa8;
                    }
                }
            }
        }
    }

    .right {
        flex-grow: 1;
        min-width: 0;
        position: absolute;
        right: 0;
        width: 80%;
        height: 700px;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;

        .background {
            position: absolute;
            right: 0;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .logo {
            position: absolute;
            right: 40px;
            top: 30px;
            width: 200px;
            height: 60px;
        }
    }
}

@media (max-width: 700px) {
  .login {

    .left {
        width: 100%;
        min-width: 0;

        .form {
            width: 50%;
            min-width: 300px;
            height: 500px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            transition: transform 0.3s ease-in-out;
        }
    }

    .right {
      display: none;
    }
  }
}
</style>
