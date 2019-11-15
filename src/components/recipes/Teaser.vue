<template>
  <div v-if="recipe" class="recipe-teaser">
    <router-link :to="{ name: 'recipe', params: { uuid: uuid } }">
      {{ recipe.title }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "RecipeTeaser",
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  filters: {
    teaser(value) {
      let output = value.replace(/<[^>]*>?/gm, "");
      return output.slice(0, 100).trim() + "...";
    }
  },
  computed: {
    recipe() {
      return this.$store.getters["recipes/find"](this.uuid);
    }
  }
};
</script>
