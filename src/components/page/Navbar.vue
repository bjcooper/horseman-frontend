<template>
  <b-navbar variant="primary" type="dark" class="mb-4">
    <div class="container">
      <b-navbar-brand :to="{ name: 'front' }">
        Horseman's Favorite Recipes
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            v-for="(text, route) in navItems"
            :key="route"
            :to="{ name: route }"
            :class="{ active: isCurrentRoute(route) }"
          >
            {{ text }}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import {
  BCollapse,
  BNavbar,
  BNavbarBrand,
  BNavbarNav,
  BNavbarToggle,
  BNavItem
} from "bootstrap-vue";

export default {
  name: "PageNavbar",
  components: {
    BCollapse,
    BNavbar,
    BNavbarBrand,
    BNavbarNav,
    BNavbarToggle,
    BNavItem
  },
  data() {
    return {
      navItems: {
        front: "Home",
        recipes: "Recipes",
        articles: "Articles"
      }
    };
  },
  methods: {
    isCurrentRoute(routeName) {
      return this.$route.name === routeName;
    }
  }
};
</script>
