import Vue from "vue";
import VueMq from "vue-mq";

const breakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1500,
  xxl: Infinity
};

Vue.use(VueMq, { breakpoints });

export { breakpoints };
