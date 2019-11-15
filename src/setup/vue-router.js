import Vue from "vue";
import VueRouter from "vue-router";
import { store } from "@/main";

// View components.
import Home from "@/components/views/Home";
import Recipe from "@/components/views/Recipe";
import Recipes from "@/components/views/Recipes";
import Article from "@/components/views/Article";
import Articles from "@/components/views/Articles";

Vue.use(VueRouter);

// Specify routes.
const routes = [
  {
    path: "/",
    component: Home,
    name: "front",
    meta: {
      hideBreadcrumb: true,
      hideTitle: true,
      title: () => "Home",
    }
  },
  {
    path: "/recipes",
    component: Recipes,
    name: "recipes",
    meta: {
      parent: "front",
      title: () => "Recipes"
    }
  },
  {
    path: "/recipe/:uuid",
    component: Recipe,
    name: "recipe",
    meta: {
      parent: "recipes",
      title: route => {
        const entity = store.getters["recipes/find"](route.params.uuid);
        return entity ? entity.title : "";
      }
    }
  },
  {
    path: "/articles",
    component: Articles,
    name: "articles",
    meta: {
      parent: "front",
      title: () => "Articles"
    }
  },
  {
    path: "/article/:uuid",
    component: Article,
    name: "article",
    meta: {
      parent: "articles",
      title: route => {
        const entity = store.getters["articles/find"](route.params.uuid);
        return entity ? entity.title : "";
      }
    }
  },
];

// Initialize the router.
const router = new VueRouter({
  mode: "history",
  routes: routes
});

// This gets called before each router change and page load.
router.beforeEach((to, from, next) => {
  // Set the document title from the current route.
  document.title = to.meta.title(to);
  next();
});

// Let Cypress use the router.
if (window.Cypress) {
  window.__router = router;
}

export { router };
