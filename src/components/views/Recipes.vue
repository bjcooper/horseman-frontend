<template>
  <div>
    <!-- Search form -->
    <b-form class="mb-4" inline>
      <b-form-group id="recipe-filter--tags" label="Tags" class="mr-4">
        <b-form-select multiple v-model="selectedTags" :options="tagOptions" />
      </b-form-group>

      <b-form-group id="recipe-filter--categories" label="Categories">
        <b-form-select
          multiple
          v-model="selectedCategories"
          :options="categoryOptions"
        />
      </b-form-group>
    </b-form>

    <!-- Recipe grid -->
    <div class="recipe-grid mb-4 row">
      <div
        v-for="recipe in filteredRecipes"
        :key="recipe.uuid"
        class="col-sm-6 col-lg-4 col-xl-3 mb-4"
      >
        <RecipeCard :uuid="recipe.uuid" />
      </div>
    </div>
    <!-- Empty text -->
    <p v-if="!filteredRecipes.length">
      <em>There are no recipes matching the current filter criteria.</em>
    </p>
  </div>
</template>

<script>
import { BForm, BFormGroup, BFormSelect } from "bootstrap-vue";
import RecipeCard from "@/components/recipes/Card";

export default {
  name: "ViewRecipes",
  components: {
    BForm,
    BFormGroup,
    BFormSelect,
    RecipeCard
  },
  data() {
    return {
      selectedCategories: [],
      selectedTags: []
    };
  },
  computed: {
    recipes() {
      return this.$store.getters["recipes/all"];
    },
    filteredRecipes() {
      // Get recipes that match on any tag.
      const tagMatches = {};
      Object.values(this.recipes).forEach(recipe => {
        recipe.tags.forEach(tag => {
          if (
            !this.selectedTags.length ||
            this.selectedTags.includes(tag.uuid)
          ) {
            tagMatches[recipe.uuid] = recipe;
          }
        });
      });

      // Get recipes that match on any category.
      const catMatches = {};
      Object.values(this.recipes).forEach(recipe => {
        recipe.category.forEach(cat => {
          if (
            !this.selectedCategories.length ||
            this.selectedCategories.includes(cat.uuid)
          ) {
            catMatches[recipe.uuid] = recipe;
          }
        });
      });

      // The result is all recipes that match on at least one of each.

      return Object.values(tagMatches).filter(
        recipe => catMatches[recipe.uuid]
      );
    },
    tagOptions() {
      const tags = {};

      Object.values(this.recipes).forEach(recipe => {
        recipe.tags.forEach(tag => {
          tags[tag.uuid] = { value: tag.uuid, text: tag.name };
        });
      });

      return Object.values(tags);
    },
    categoryOptions() {
      const categories = {};

      Object.values(this.recipes).forEach(recipe => {
        recipe.category.forEach(category => {
          categories[category.uuid] = {
            value: category.uuid,
            text: category.name
          };
        });
      });

      return Object.values(categories);
    }
  }
};
</script>
