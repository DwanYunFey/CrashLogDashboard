import { defineStore } from 'pinia';
import { Login as apiLogin, Logout as apiLogout, UserInfo as apiGetInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import router, { resetRouter } from '@/router';
import tagsViewStore from './tagsView';
import permissionStore from './permission';

export interface IUserState {
  token: string;
  roles: string[];
  user: string;
  miID: string;
  displayName: string;
  uid: string;
  username: string;
  type: string;
  email: string;
  departmentName: string;
  name: string;
  avatar: string;
}
export default defineStore({
  id: 'user',
  state: (): IUserState => ({
    token: getToken(),
    roles: [],
    user: "",
    miID: "",
    displayName: "",
    uid: "",
    username: "",
    type: "",
    email: "",
    departmentName: "",
    name: "",
    avatar: "",
  }),
  getters: {},
  actions: {
    // user login
    login(): Promise<void> {
      return new Promise((resolve, reject) => {
        apiLogin().then(response => {
          const { data } = response;
          this.token = data.token;
          setToken(data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // get user info
    getInfo() {
      return new Promise((resolve, reject) => {
        apiGetInfo(this.token).then(response => {
          const { data } = response;
          if (!data) {
            reject('Verification failed, please Login again.');
          }

          const { roles } = data;

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!');
          }
          // 将 data 中的所有字段设置到当前对象中
          Object.assign(this, data);
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // user logout
    logout(): Promise<void> {
      return new Promise((resolve, reject) => {
        apiLogout(this.token).then(() => {
          this.token = '';
          this.roles = [];
          removeToken();
          resetRouter();

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          tagsViewStore().delAllViews();

          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // remove token
    resetToken() {
      this.token = '';
      this.roles = [];
      removeToken();
    },

    // dynamically modify permissions
    async changeRoles(role) {
      const token = role + '-token';

      this.token = token;
      setToken(token);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const infoRes = await this.getInfo() as any;
      let roles = [];
      if (infoRes.roles) {
        roles = infoRes.roles;
      }

      resetRouter();

      // generate accessible routes map based on roles
      const accessRoutes = await permissionStore().generateRoutes(roles);
      // dynamically add accessible routes
      // router.addRoutes(accessRoutes);
      accessRoutes.forEach(item => {
        router.addRoute(item);
      });

      // reset visited views and cached views
      tagsViewStore().delAllViews();
    }
  }
});
