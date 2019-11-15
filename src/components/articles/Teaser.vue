<template>
  <div v-if="article" class="article-teaser">
    <router-link :to="{ name: 'article', params: { uuid: uuid } }">
      {{ article.title }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ArticleTeaser",
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
    article() {
      return this.$store.getters["articles/find"](this.uuid);
    }
  }
};
</script>
