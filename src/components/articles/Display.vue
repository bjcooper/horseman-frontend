<template>
  <div v-if="article" class="article">
    <img v-if="imageUrl" :src="imageUrl" />
    <div v-html="article.body.processed" />
  </div>
</template>

<script>
export default {
  name: "ArticleDisplay",
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  computed: {
    article() {
      return this.$store.getters["articles/find"](this.uuid);
    },
    imageUrl() {
      return this.article.image
        ? this.article.image.imageFile.links.recipe_detail_750_550.href
        : false;
    }
  }
};
</script>
