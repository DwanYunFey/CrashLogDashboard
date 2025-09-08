<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';

interface QueryType {
  [propname: string]: string;
} // 自定义key 任意字符串

export default defineComponent({
  name: 'Login',
  data() {
    return {
      loading: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    this.loading = true;
    store.user().login().then(
      () => {
        this.$router.push(
          {
            path: this.redirect || '/',
            query: this.otherQuery
          }
        );
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
  },
  render: function () {
    // 返回一个空的 div，或者直接返回 null/undefined
    return null; // 或者 return h('div');
  },
  methods: {
    getOtherQuery(query: QueryType) {
      return Object.keys(query).reduce((acc: QueryType, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
});
</script>