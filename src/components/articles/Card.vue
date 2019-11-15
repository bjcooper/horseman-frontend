<template>
  <b-card
    v-if="article"
    :img-src="article.image.imageFile.links.recipe_list_350_300.href"
    img-top
  >
    <strong class="d-inline-block text-success">Article</strong>
    <b-card-title>{{ article.title }}</b-card-title>

    <b-card-text>
      <p>{{ article.body.value | teaser }}</p>
      <b-button
        variant="light"
        :to="{ name: 'article', params: { uuid: article.uuid } }"
      >
        Continue reading
        <font-awesome-icon :icon="['fal', 'chevron-right']" />
      </b-button>
    </b-card-text>
  </b-card>
</template>

<script>
import ArticleTeaser from "@/components/articles/Teaser";
import { BButton, BCard, BCardText, BCardTitle } from "bootstrap-vue";

export default {
  name: "ArticleCard",
  extends: ArticleTeaser,
  components: {
    BButton,
    BCard,
    BCardText,
    BCardTitle
  }
};
</script>
