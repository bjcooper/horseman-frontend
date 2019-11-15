<template>
  <footer class="py-4 bg-dark text-white-50">
    <div class="container">
      <div class="row">
        <!-- Questions blurb -->
        <div v-if="questionsBlurb" class="col-4">
          <h2 v-if="questionsBlurb.header">{{ questionsBlurb.header }}</h2>
          <div v-html="questionsBlurb.body.value" />
        </div>

        <div class="col-4"></div>

        <!-- Social media links -->
        <div v-if="socialMediaLinks.length" class="col-4">
          <h2>Follow the social</h2>
          <a
            v-for="link in socialMediaLinks"
            :key="link.key"
            target="_blank"
            :href="link.href"
            class="h3 mr-2"
          >
            <font-awesome-icon :icon="link.icon" />
          </a>
        </div>
      </div>
      <div class="row">
        <!-- Copyright -->
        <div class="col-12 text-center">
          <small>Copyright © Wiznerd Horseman</small>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "PageFooter",
  data() {
    return {
      questionsBlurbUuid: "7a6eb4c5-4210-4763-8358-e8398f5ea142",
      socialMediaUuid: "7b9ef88e-9e72-4c0c-96c9-5e838e0dfd02"
    };
  },
  computed: {
    questionsBlurb() {
      const embeddable = this.$store.getters["embeddables/find"](
        this.questionsBlurbUuid
      );
      if (embeddable) {
        return embeddable.content[0];
      }
      return false;
    },
    socialMediaLinks() {
      const links = [];
      const embeddable = this.$store.getters["embeddables/find"](
        this.socialMediaUuid
      );
      if (embeddable) {
        embeddable.content.forEach(pair => {
          if (pair.key) {
            links.push({
              key: pair.key,
              icon: ["fab", pair.key],
              href: pair.body.value
            });
          }
        });
      }
      return links;
    }
  }
};
</script>
