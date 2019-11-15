<template>
  <b-breadcrumb v-if="!$route.meta.hideBreadcrumb" :items="items" />
</template>

<script>
import { BBreadcrumb } from "bootstrap-vue";

export default {
  name: "PageBreadrcumb",
  components: {
    BBreadcrumb
  },
  computed: {
    items() {
      const matches = [];

      // Add the current path.
      matches.push({
        text: this.$route.meta.title(this.$route)
      });

      // Trace up the breadcrumb path.
      let parentName = this.$route.meta.parent;
      while (parentName) {
        const parent = this.$router.options.routes.find(
          route => route.name === parentName
        );
        matches.push({
          text: parent.meta.title(parent),
          to: {
            name: parent.name
          }
        });
        parentName = parent.meta.parent;
      }

      return matches.reverse();
    }
  }
};
</script>
