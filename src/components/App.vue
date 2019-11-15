<template>
  <div id="app">
    <!-- Navbar -->
    <Navbar />

    <!-- Main page content -->
    <transition name="page-content-transition" mode="out-in">
      <div class="page container" :key="$route.path">
        <!-- Breadcrumb -->
        <Breadcrumb />

        <!-- Page title -->
        <h1 v-if="!$route.meta.hideTitle">{{ $route.meta.title($route) }}</h1>

        <!-- Page content -->
        <router-view></router-view>
      </div>
    </transition>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Breadcrumb from "@/components/page/Breadcrumb";
import Footer from "@/components/page/Footer";
import Navbar from "@/components/page/Navbar";

export default {
  name: "app",
  components: {
    Breadcrumb,
    Footer,
    Navbar
  },
  methods: {
    onWindowResize() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  },
  created() {
    // React to window resizing.
    window.addEventListener("resize", this.onWindowResize);
    this.onWindowResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
  }
};
</script>

<style lang="scss">
@import "~scss/framework";
@import "~scss/once";
</style>
