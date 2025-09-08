
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
};
const g = {
  'user': 'liushaozhen',
  'miID': '-1',
  'displayName': '刘少真',
  'uid': '9802b29e006349f39daf715689442566',
  'username': 'liushaozhen',
  'type': 'intern',
  'email': 'liushaozhen@xiaomi.com',
  'departmentName': '软件系统组',
  'name': '刘少真',
  'avatar': 'https:\/\/cas.mioffice.cn\/v2\/static\/avatar.png'
};
const users = {
  'admin-token': {
    'roles': ['admin'],
    'user': 'liushaozhen',
    'miID': '-1',
    'displayName': '刘少真',
    'uid': '9802b29e006349f39daf715689442566',
    'username': 'liushaozhen',
    'type': 'intern',
    'email': 'liushaozhen@xiaomi.com',
    'departmentName': '软件系统组',
    'name': '刘少真',
    'avatar': 'https:\/\/cas.mioffice.cn\/v2\/static\/avatar.png'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: g['cas:avatar'],
    name: 'Normal Editor'
  }
};

export default [
  // user login
  {
    url: '/vue-element-admin/user/login',
    method: 'get',
    response: _ => {
      const token = tokens['admin'];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        };
      }

      return {
        code: 20000,
        data: token
      };
    }
  },

  // get user info
  {
    url: '/vue-element-admin/user/info',
    method: 'get',
    response: config => {
      const { token } = config.query;
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        };
      }

      return {
        code: 20000,
        data: info
      };
    }
  },

  // user logout
  {
    url: '/voice/upload',
    method: 'post',
    response: (response) => {
      return {
        code: 20000,
        l: response.body.length

      };
    }
  },
  {
    url: '/form',
    method: 'post',
    response: (response) => {
      return {
        code: 20000,
        l: response.body.length
      }
    }
  }
];
