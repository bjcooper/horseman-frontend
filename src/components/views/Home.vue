<template>
  <div>
    <!-- Recipe Jumbotron -->
    <EmbeddableJumbotron :uuid="recipeJumbotron" variant="light" class="mb-4" />

    <!-- Highlighted items -->
    <div class="row">
      <!-- Highlighted recipe -->
      <div class="col-md-6 mb-4">
        <RecipeCard v-if="featuredRecipe" :uuid="featuredRecipe" />
      </div>
      <!-- Highlighted article -->
      <div class="col-md-6 mb-4">
        <ArticleCard v-if="featuredArticle" :uuid="featuredArticle" />
      </div>
    </div>

    <!-- Articles Jumbotron -->
    <EmbeddableJumbotron
      :uuid="articleJumbotron"
      variant="light"
      class="mb-4"
    />
  </div>
</template>

<script>
import ArticleCard from "@/components/articles/Card";
import RecipeCard from "@/components/recipes/Card";
import EmbeddableJumbotron from "@/components/embeddables/Jumbotron";

export default {
  name: "ViewHome",
  components: {
    ArticleCard,
    EmbeddableJumbotron,
    RecipeCard
  },
  data() {
    return {
      recipeJumbotron: "9c8e33b4-c9ca-459c-9426-dafd99f30728",
      articleJumbotron: "675b27f4-8b54-4343-9761-190bbb7d49c4"
    };
  },
  filters: {
    teaser(value) {
      let output = value.replace(/<[^>]*>?/gm, "");
      return output.slice(0, 100).trim() + "...";
    }
  },
  computed: {
    featuredArticle() {
      const uuids = Object.keys(this.$store.getters["articles/all"]);
      return uuids.length ? uuids[0] : false;
    },
    featuredRecipe() {
      const uuids = Object.keys(this.$store.getters["recipes/all"]);
      return uuids.length ? uuids[0] : false;
    }
  }
};
</script>
