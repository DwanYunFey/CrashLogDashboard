<template>
  <div class="app-container">
    <div v-if="Quser">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :Iuser="Quser" />
        </el-col>
        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="账号信息" name="account">
                <account :info="Quser" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import UserCard from './components/UserCard';
import Account from './components/Account';
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
  name: 'Profile',
  components: { UserCard, Account },
  data() {
    return {
      Quser: {},
      activeTab: 'account'
    };
  },
  computed: {
    ...mapState(store.user, [
      'roles',
      'cas:user',
      'cas:miID',
      'cas:displayName',
      'cas:uid',
      'cas:username',
      'cas:type',
      'cas:email',
      'cas:departmentName',
      'cas:name',
      'cas:avatar',
    ])
  },
  watch: {
    name(newVal) {
      this.Quser.name = newVal;
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.Quser = {
        'displayName': this['cas:displayName'],
        'user': this['cas:user'],
        'email': this['cas:email'],
        'departmentName': this['cas:departmentName'],
        'type': this['cas:type'],
        'name': this['cas:name'],
        'username': this['cas:username'],
        'roles': this.roles.join(' | '),
        'miID': this['cas:miID'],
        'uid': this['cas:uid'],
        'avatar': this['cas:avatar'],
      };
    }
  }
});
</script>
