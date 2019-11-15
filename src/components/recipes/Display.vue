<template>
  <div v-if="recipe" class="recipe">
    <img v-if="imageURL" :src="imageURL" />
    <div v-html="recipe.summary.processed" />

    <h2>Details</h2>
    <ul>
      <li><strong>Difficulty:</strong> {{ recipe.difficulty }}</li>
      <li>
        <strong>Time:</strong>
        {{ recipe.preparationTime + recipe.cookingTime }}min ({{
          recipe.preparationTime
        }}
        preperation, {{ recipe.cookingTime }} cooking)
      </li>
    </ul>

    <h2>Instructions</h2>
    <div v-html="recipe.instructions" />
  </div>
</template>

<script>
export default {
  name: "RecipeDisplay",
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  computed: {
    recipe() {
      return this.$store.getters["recipes/find"](this.uuid);
    },
    imageURL() {
      return this.recipe.image
        ? this.recipe.image.imageFile.links.recipe_detail_750_550.href
        : false;
    }
  }
};
</script>
