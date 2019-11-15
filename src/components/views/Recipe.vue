<template>
  <RecipeDisplay :uuid="uuid" />
</template>

<script>
import RecipeDisplay from "@/components/recipes/Display";

export default {
  name: "ViewRecipe",
  components: {
    RecipeDisplay
  },
  computed: {
    uuid() {
      return this.$route.params.uuid;
    }
  }
};
</script>
