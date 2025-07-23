<template>
  <div class="warpper">
    <form class="container">
      <h1>学生信息</h1>
      <div class="form-item">
        <div class="left">
          <div class="row">
            <div class="item">
              <label for="name">姓名</label>
              <input id="name" type="text" v-model="profile.name" :readonly="!isRevising" required />
            </div>
            <div class="item">
              <label for="gender">性别</label>
              <input id="gender" type="text" v-model="profile.gender" :readonly="!isRevising" required />
            </div>
            <div class="item">
              <label for="age">年龄</label>
              <input id="age" type="text" v-model="profile.age" :readonly="!isRevising" required />
            </div>
          </div>
          <div class="row">
            <div class="item">
              <label for="birth">出生日期</label>
              <input id="birth" type="text" v-model="profile.birth" :readonly="!isRevising" required />
            </div>
            <div class="item">
              <label for="nation">民簇</label>
              <input id="nation" type="text" v-model="profile.nation" :readonly="!isRevising" required />
            </div>
            <div class="item">
              <label for="placeOfBirth">籍贯</label>
              <input id="placeOfBirth" type="text" v-model="profile.placeOfBirth" :readonly="!isRevising" required />
            </div>
          </div>
          <div class="row">
            <div class="item">
              <label for="height">身高</label>
              <input id="height" type="text" v-model="profile.height" :readonly="!isRevising" required />
            </div>
            <div class="item">
              <label for="weight">体重</label>
              <input id="weight" type="text" v-model="profile.weight" :readonly="!isRevising" required />
            </div>
            <div class="item">
              <label for="status">政治面貌</label>
              <input id="status" type="text" v-model="profile.status" :readonly="!isRevising" required />
            </div>
          </div>
          <div class="row">
            <div class="item">
              <label for="phone">电话</label>
              <input id="phone" type="text" v-model="profile.phone" :readonly="!isRevising" required />
            </div>
            <div class="item">
              <label for="emergencyContact">紧急联系人</label>
              <input id="emergencyContact" type="text" v-model="profile.emergencyContact" :readonly="!isRevising"
                required />
            </div>
            <div class="item">
              <label for="emergencyContactNumber">紧急联系人电话</label>
              <input id="emergencyContactNumber" type="text" v-model="profile.emergencyContactNumber"
                :readonly="!isRevising" required />
            </div>
          </div>
        </div>
        <div class="right">
          <img :src="profile.photo" alt="Profile Photo">
        </div>
      </div>
      <div class="form-item">
        <label for="familyMembers">家庭成员</label>
        <div v-for="(member, index) in profile.familyMembers" :key="index" class="family-member">
          <input type="text" v-model="member.name" placeholder="姓名" :readonly="!isRevising" required />
          <input type="text" v-model="member.relationship" placeholder="关系" :readonly="!isRevising" required />
          <input type="text" v-model="member.phone" placeholder="电话" :readonly="!isRevising" required />
          <input type="text" v-model="member.age" placeholder="年龄" :readonly="!isRevising" required />
          <input type="text" v-model="member.job" placeholder="工作" :readonly="!isRevising" required />
          <input type="text" v-model="member.jobAddress" placeholder="工作地址" :readonly="!isRevising" required />
          <button @click.prevent="removeFamilyMember(index)" v-if="isRevising">删除</button>
        </div>
        <button @click.prevent="addFamilyMember" v-if="isRevising">添加家庭成员</button>
      </div>
      <div class="form-item">
        <label for="awards">获奖记录</label>
        <textarea id="awards" type="text" v-model="profile.awards" :readonly="!isRevising" required />
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'StudentProfileView',
  data () {
    return {
      isRevising: false,
      profile: {
        name: '',
        gender: '',
        age: '',
        birth: '',
        nation: '',
        placeOfBirth: '',
        height: '',
        weight: '',
        status: '',
        photo: '',
        phone: '',
        emergencyContact: '',
        emergencyContactNumber: '',
        familyMenbers: [
          {
            name: '',
            relationship: '',
            phone: '',
            age: '',
            job: '',
            jobAddress: ''
          }
        ],
        awards: ''
      }
    }
  },
  methods: {
    //
  }
}
</script>
<style scoped lang="scss">
.warpper{
  height: auto;
  width: 1480px;
  height: 1500px;
  position: relative;
  overflow: auto;
}

.container {
  z-index: -1;
  box-sizing: border-box;
  padding: 20px;
  min-width: 1200px;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);

  h1 {
    font-size: 30px;
    text-align: center;
  }

  .form-item {
    height: 240px;
    width: 100%;
    display: flex;
    flex-direction: row;

    .left {
      width: 85%;
      display: flex;
      flex-direction: column;

      .row {
        height: 60px;
        display: grid;
        align-items: center;
        grid-template-columns: 1fr 1fr 1fr;

        .item {
          display: flex;
          align-items: center;

          label {
            width: 120px;
            text-align: right;
            box-sizing: border-box;
            padding-right: 10px;
          }

          input {
            flex: 1;
            padding: 8px;
            border: 1px solid #ccc;
          }
        }
      }
    }

    .right {
      width: 15%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
        border-radius: 0;
        object-fit: cover;
      }
    }
  }
}
</style>
