<template>
  <ul>
    <li v-for="(article, id) in articles" :key="id">
      <ArticleTeaser :uuid="id" />
    </li>
  </ul>
</template>

<script>
import ArticleTeaser from "@/components/articles/Teaser";

export default {
  name: "ViewArticles",
  components: {
    ArticleTeaser
  },
  computed: {
    articles() {
      return this.$store.getters["articles/all"];
    }
  }
};
</script>
