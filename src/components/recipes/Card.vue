<template>
  <b-card
    v-if="recipe"
    :img-src="recipe.image.imageFile.links.recipe_list_350_300.href"
    img-top
  >
    <strong class="d-inline-block text-primary">Recipe</strong>
    <b-card-title>{{ recipe.title }}</b-card-title>

    <b-card-text>
      <p>{{ recipe.summary.value | teaser }}</p>
      <b-button
        variant="light"
        :to="{ name: 'recipe', params: { uuid: recipe.uuid } }"
      >
        Continue reading
        <font-awesome-icon :icon="['fal', 'chevron-right']" />
      </b-button>
    </b-card-text>
  </b-card>
</template>

<script>
import RecipeTeaser from "@/components/recipes/Teaser";
import { BButton, BCard, BCardText, BCardTitle } from "bootstrap-vue";

export default {
  name: "RecipeCard",
  extends: RecipeTeaser,
  components: {
    BButton,
    BCard,
    BCardText,
    BCardTitle
  }
};
</script>
