<template>
  <ArticleDisplay :uuid="uuid" />
</template>

<script>
import ArticleDisplay from "@/components/articles/Display";

export default {
  name: "ViewArticle",
  components: {
    ArticleDisplay
  },
  computed: {
    uuid() {
      return this.$route.params.uuid;
    }
  }
};
</script>
