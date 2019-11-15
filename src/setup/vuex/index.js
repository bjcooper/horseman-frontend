import Vue from "vue";
import Vuex from "vuex";

import { HorsemanArticles } from "./Articles";
import { HorsemanEmbeddables } from "./Embeddables";
import { HorsemanRecipes } from "./Recipes";

Vue.use(Vuex);

// Set up our Vuex store.
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production"
});

// Initialize storage modules.
const config = {
  store,
  baseUrl: process.env.VUE_APP_HORSEMAN_SERVER,
  preLoad: true,
  consumerId: process.env.VUE_APP_HORSEMAN_CONSUMER_ID
};
new HorsemanArticles(config);
new HorsemanEmbeddables(config);
new HorsemanRecipes(config);

// Let Cypress use the store.
if (window.Cypress) {
  window.__store = store;
}

export { store };
