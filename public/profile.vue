<template>
  <form class="container">
    <div class="profile-form">
      <div class="form-group">
        <label>姓名：</label>
        <input v-model="profile.name" :disabled="!isRevising" required/>
      </div>
      <div class="form-group">
        <label>姓名拼音：</label>
        <input v-model="profile.namePinyin" :disabled="!isRevising" required/>
      </div>
      <div class="form-group">
        <label>照片：</label>
        <input type="file" @change="handlePhotoUpload" :disabled="!isRevising" required/>
        <img :src="profile.photo" alt="Profile Photo" v-if="profile.photo" />
      </div>
      <div class="form-group">
        <label>年龄：</label>
        <input v-model="profile.age" :disabled="!isRevising" required/>
      </div>
      <div class="form-group">
        <label>民族：</label>
        <input v-model="profile.ethnicity" :disabled="!isRevising" required/>
      </div>
      <div class="form-group">
        <label>身份证：</label>
        <input v-model="profile.idCard" :disabled="!isRevising" required/>
      </div>
      <div class="form-group">
        <label>联系方式：</label>
        <input v-model="profile.contact" :disabled="!isRevising" required/>
      </div>
      <div class="form-group">
        <label>家庭住址：</label>
        <input v-model="profile.address" :disabled="!isRevising" required/>
      </div>
      <div class="form-group">
        <label>籍贯：</label>
        <input v-model="profile.hometown" :disabled="!isRevising" required/>
      </div>
      <div class="form-group">
        <label>专业：</label>
        <input v-model="profile.major" :disabled="!isRevising" required/>
      </div>
      <div class="form-group">
        <label>紧急联系人：</label>
        <input v-model="profile.emergencyContact" :disabled="!isRevising" required/>
      </div>
      <div class="form-group">
        <label>家庭成员：</label>
        <div v-for="(member, index) in profile.familyMembers" :key="index">
          <input v-model="member.name" placeholder="姓名" :disabled="!isRevising" required/>
          <input v-model="member.phone" placeholder="电话" :disabled="!isRevising" required/>
          <input v-model="member.age" placeholder="年龄" :disabled="!isRevising" required/>
          <input v-model="member.job" placeholder="工作" :disabled="!isRevising" required/>
          <input v-model="member.jobAddress" placeholder="工作地址" :disabled="!isRevising" required/>
          <button @click="removeFamilyMember(index)" v-if="isRevising">删除</button>
        </div>
        <button @click="addFamilyMember" v-if="isRevising">添加家庭成员</button>
      </div>
    </div>
    <div v-if="!isRevising">
      <button @click="isRevising = true">修改</button>
      <button @click="exportData">导出</button>
    </div>
    <div v-else>
      <button @click="saveData">保存</button>
      <button @click="submitData" type="submit">提交</button>
    </div>
  </form>
</template>
<script>
export default {
  name: 'StudentProfileView',
  data () {
    return {
      isRevising: false,
      profile: {
        name: '',
        namePinyin: '',
        photo: '',
        age: '',
        ethnicity: '',
        idCard: '',
        contact: '',
        address: '',
        hometown: '',
        major: '',
        emergencyContact: '',
        familyMembers: []
      }
    }
  },
  methods: {
    exportData () {
      alert('数据已导出');
    },
    saveData () {
      alert('数据已保存');
    },
    submitData () {
      alert('数据已提交');
      this.isRevising = false;
    },
    handlePhotoUpload () {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profile.photo = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    addFamilyMember () {
      this.profile.familyMembers.push({
        name: '',
        phone: '',
        age: '',
        job: '',
        jobAddress: ''
      });
    },
    removeFamilyMember (index) {
      this.profile.familyMembers.splice(index, 1);
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group {
  display: flex;
  gap: 10px;
  align-items: center;

  label {
    width: 100px;
  }

  input {
    flex: 1;
  }

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }
}

button {
  width: 66px;
  height: 40px;
  border-radius: 10px;
  background-color: rgb(69, 185, 52);
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: rgb(50, 145, 32);
  }
}
</style>
