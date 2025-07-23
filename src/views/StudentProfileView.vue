<template>
  <div class="student-info-container">

    <h2>个人基本信息</h2>
    <div class="form-section">
      <div class="form-row">
        <div class="form-group">
          <label>一卡通号</label>
          <input v-model="studentInfo.cardNumber" type="text">
        </div>
        <div class="form-group">
          <label>姓名</label>
          <input v-model="studentInfo.name" type="text">
        </div>
        <div class="form-group">
          <label>性别</label>
          <select v-model="studentInfo.gender">
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>姓名拼音</label>
          <input v-model="studentInfo.namePinyin" type="text">
        </div>
        <div class="form-group">
          <label>曾用名</label>
          <input v-model="studentInfo.formerName" type="text">
        </div>
        <div class="form-group">
          <label>婚姻状态</label>
          <select v-model="studentInfo.maritalStatus">
            <option value="未婚">未婚</option>
            <option value="已婚">已婚</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>政治面貌</label>
          <select v-model="studentInfo.politicalStatus">
            <option value="群众">群众</option>
            <option value="团员">团员</option>
            <option value="党员">党员</option>
          </select>
        </div>
        <div class="form-group">
          <label>民族</label>
          <input v-model="studentInfo.ethnicity" type="text">
        </div>
        <div class="form-group">
          <label>是否团员</label>
          <select v-model="studentInfo.isLeagueMember">
            <option value="是">是</option>
            <option value="否">否</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>体重（KG）</label>
          <input v-model="studentInfo.weight" type="number">
        </div>
        <div class="form-group">
          <label>身高（CM）</label>
          <input v-model="studentInfo.height" type="number">
        </div>
        <div class="form-group">
          <label>血型</label>
          <select v-model="studentInfo.bloodType">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>爱好</label>
          <input v-model="studentInfo.hobbies" type="text">
        </div>
        <div class="form-group">
          <label>特长</label>
          <input v-model="studentInfo.specialSkills" type="text">
        </div>
        <div class="form-group">
          <label>是否独生子女</label>
          <select v-model="studentInfo.isOnlyChild">
            <option value="是">是</option>
            <option value="否">否</option>
          </select>
        </div>
      </div>
    </div>

    <h2>学籍信息 <button @click="editAcademicInfo" class="edit-btn">编辑</button></h2>
    <div class="form-section">
      <div class="form-row">
        <div class="form-group">
          <label>学生类别</label>
          <input v-model="academicInfo.studentType" :readonly="!isEditing" type="text">
        </div>
        <div class="form-group">
          <label>学籍状态</label>
          <input v-model="academicInfo.status" :readonly="!isEditing" type="text">
        </div>
        <div class="form-group">
          <label>院系</label>
          <input v-model="academicInfo.department" :readonly="!isEditing" type="text">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>入学时间</label>
          <input v-model="academicInfo.enrollmentDate" :readonly="!isEditing" type="date">
        </div>
        <div class="form-group">
          <label>预计毕业日期</label>
          <input v-model="academicInfo.expectedGraduationDate" :readonly="!isEditing" type="date">
        </div>
        <div class="form-group">
          <label>健康状况</label>
          <input v-model="academicInfo.healthStatus" :readonly="!isEditing" type="text">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>是否在校</label>
          <select v-model="academicInfo.isOnCampus" :disabled="!isEditing">
            <option value="是">是</option>
            <option value="否">否</option>
          </select>
        </div>
        <div class="form-group">
          <label>校区</label>
          <input v-model="academicInfo.campus" :readonly="!isEditing" type="text">
        </div>
        <div class="form-group">
          <label>专业</label>
          <input v-model="academicInfo.major" :readonly="!isEditing" type="text">
        </div>
      </div>
      <div v-if="isEditing" class="form-actions">
        <button @click="saveAcademicInfo" class="save-btn">保存</button>
        <button @click="cancelEdit" class="cancel-btn">取消</button>
      </div>
    </div>

    <h2>联系信息</h2>
    <div class="form-section">
      <div class="form-row">
        <div class="form-group">
          <label>手机号码</label>
          <input v-model="contactInfo.phone" type="tel">
        </div>
        <div class="form-group">
          <label>电子邮箱</label>
          <input v-model="contactInfo.email" type="email">
        </div>
        <div class="form-group">
          <label>紧急联系人</label>
          <input v-model="contactInfo.emergencyContact" type="text">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>紧急联系电话</label>
          <input v-model="contactInfo.emergencyPhone" type="tel">
        </div>
        <div class="form-group">
          <label>QQ/微信</label>
          <input v-model="contactInfo.socialMedia" type="text">
        </div>
        <div class="form-group">
          <label>家庭电话</label>
          <input v-model="contactInfo.homePhone" type="tel">
        </div>
      </div>
    </div>

    <h2>家庭信息</h2>
    <div class="form-section">
      <div class="form-row">
        <div class="form-group">
          <label>家庭住址</label>
          <input v-model="familyInfo.address" type="text">
        </div>
        <div class="form-group">
          <label>邮政编码</label>
          <input v-model="familyInfo.postalCode" type="text">
        </div>
        <div class="form-group">
          <label>家庭年收入</label>
          <input v-model="familyInfo.annualIncome" type="number">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>住房类型</label>
          <select v-model="familyInfo.housingType">
            <option value="自有住房">自有住房</option>
            <option value="租赁住房">租赁住房</option>
            <option value="其他">其他</option>
          </select>
        </div>
        <div class="form-group">
          <label>是否低保家庭</label>
          <select v-model="familyInfo.isLowIncome">
            <option value="是">是</option>
            <option value="否">否</option>
          </select>
        </div>
      </div>
    </div>

    <h2>其他信息</h2>
    <div class="form-section">
      <div class="form-row">
        <div class="form-group">
          <label>遗传病史</label>
          <textarea v-model="otherInfo.geneticDiseases" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>过敏史</label>
          <textarea v-model="otherInfo.allergies" rows="3"></textarea>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>毕业去向</label>
          <select v-model="otherInfo.graduationPlan">
            <option value="就业">就业</option>
            <option value="考研">考研</option>
            <option value="出国">出国</option>
            <option value="其他">其他</option>
          </select>
        </div>
        <div class="form-group">
          <label>目标企业/学校</label>
          <input v-model="otherInfo.targetOrganization" type="text">
        </div>
      </div>
    </div>

    <h2>社会关系</h2>
    <div class="form-section">
      <div class="form-row">
        <div class="form-group">
          <label>是否有社会兼职</label>
          <select v-model="socialInfo.hasPartTimeJob">
            <option value="是">是</option>
            <option value="否">否</option>
          </select>
        </div>
        <div class="form-group">
          <label>兼职单位</label>
          <input v-model="socialInfo.partTimeJobCompany" type="text">
        </div>
        <div class="form-group">
          <label>兼职职位</label>
          <input v-model="socialInfo.partTimeJobPosition" type="text">
        </div>
      </div>
    </div>

    <h2>家庭成员信息</h2>
    <div class="form-section">
      <div v-for="(member, index) in familyMembers" :key="index" class="member-card">
        <div class="member-header">
          <h3>家庭成员 {{ index + 1 }}</h3>
          <div class="member-actions">
            <button @click="editMember(index)" class="edit-btn">编辑</button>
            <button @click="removeMember(index)" class="delete-btn">删除</button>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>姓名</label>
            <input v-model="member.name" :readonly="member.editMode === false" type="text">
          </div>
          <div class="form-group">
            <label>关系</label>
            <select v-model="member.relationship" :disabled="member.editMode === false">
              <option value="父亲">父亲</option>
              <option value="母亲">母亲</option>
              <option value="兄弟">兄弟</option>
              <option value="姐妹">姐妹</option>
              <option value="其他">其他</option>
            </select>
          </div>
          <div class="form-group">
            <label>年龄</label>
            <input v-model="member.age" :readonly="member.editMode === false" type="number">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>工作单位</label>
            <input v-model="member.workplace" :readonly="member.editMode === false" type="text">
          </div>
          <div class="form-group">
            <label>职务</label>
            <input v-model="member.position" :readonly="member.editMode === false" type="text">
          </div>
          <div class="form-group">
            <label>联系电话</label>
            <input v-model="member.phone" :readonly="member.editMode === false" type="tel">
          </div>
        </div>
        <div v-if="member.editMode" class="member-footer">
          <button @click="saveMember(index)" class="save-btn">保存</button>
          <button @click="cancelEditMember(index)" class="cancel-btn">取消</button>
        </div>
      </div>
      <button @click="addNewMember" class="add-btn">添加家庭成员</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isEditing: false,
      studentInfo: {
        cardNumber: '',
        name: '',
        namePinyin: '',
        gender: '',
        formerName: '',
        maritalStatus: '',
        politicalStatus: '',
        ethnicity: '',
        isLeagueMember: '',
        weight: 0,
        height: 0,
        bloodType: '',
        hobbies: '',
        specialSkills: '',
        isOnlyChild: ''
      },
      academicInfo: {
        studentType: '本科生',
        status: '正常',
        department: '',
        enrollmentDate: '',
        expectedGraduationDate: '',
        healthStatus: '',
        isOnCampus: '',
        campus: '',
        major: ''
      },
      contactInfo: {
        phone: '',
        email: '',
        emergencyContact: '',
        emergencyPhone: '',
        socialMedia: '',
        homePhone: ''
      },
      familyInfo: {
        address: '',
        postalCode: '',
        annualIncome: '',
        housingType: '自有住房',
        isLowIncome: '否'
      },
      otherInfo: {
        geneticDiseases: '',
        allergies: '',
        graduationPlan: '就业',
        targetOrganization: ''
      },
      socialInfo: {
        hasPartTimeJob: '否',
        partTimeJobCompany: '',
        partTimeJobPosition: ''
      },
      familyMembers: [
        {
          name: '',
          relationship: '父亲',
          age: '',
          workplace: '',
          position: '',
          phone: '',
          editMode: false
        }
      ]
    }
  },
  methods: {
    editAcademicInfo () {
      this.isEditing = true;
    },
    saveAcademicInfo () {
      this.isEditing = false;
    },
    cancelEdit () {
      this.isEditing = false;
    },
    addNewMember () {
      this.familyMembers.push({
        name: '',
        relationship: '父亲',
        age: '',
        workplace: '',
        position: '',
        phone: '',
        editMode: true // 新增成员默认可编辑
      });
    },
    editMember (index) {
      this.familyMembers[index].editMode = true;
    },
    saveMember (index) {
      this.familyMembers[index].editMode = false;
      // 这里可以添加保存到服务器的逻辑
    },
    cancelEditMember (index) {
      if (this.familyMembers[index].name === '' &&
          this.familyMembers[index].phone === '') {
        // 如果是空的新成员，取消时直接删除
        this.familyMembers.splice(index, 1);
      } else {
        this.familyMembers[index].editMode = false;
        // 这里可以添加恢复原始数据的逻辑
      }
    },
    removeMember (index) {
      if (confirm('确定要删除这个家庭成员吗？')) {
        this.familyMembers.splice(index, 1);
      }
    }
  }
}
</script>

<style scoped>
.student-info-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h2 {
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-section {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
  min-width: 250px;
  margin: 0 10px 10px 0;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input[readonly], select:disabled {
  background-color: #f0f0f0;
  color: #666;
}

.edit-btn, .save-btn, .cancel-btn {
  padding: 5px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.edit-btn {
  background-color: #4CAF50;
  color: white;
}

.save-btn {
  background-color: #2196F3;
  color: white;
  margin-right: 10px;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.form-actions {
  text-align: right;
  margin-top: 20px;
}

.member-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #fff;
}

.member-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.member-actions button {
  margin-left: 10px;
  padding: 3px 8px;
  font-size: 12px;
}

.member-footer {
  text-align: right;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.member-footer button {
  margin-left: 10px;
  padding: 5px 10px;
}

.add-btn {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

.add-btn:hover {
  background-color: #45a049;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.edit-btn {
  background-color: #2196F3;
  color: white;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
}

.cancel-btn {
  background-color: #ff9800;
  color: white;
}
</style>
