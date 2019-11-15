<template>
  <b-jumbotron v-if="jumbotron" bg-variant="light" class="mb-4 p-md-5">
    <template v-slot:header>{{ jumbotron.header }}</template>

    <template v-if="jumbotron.lead" v-slot:lead>
      {{ jumbotron.lead }}
    </template>

    <hr class="my-4" />

    <div v-html="jumbotron.body.value" />

    <b-button
      v-for="(cta, uuid) in ctas"
      :key="uuid"
      :variant="cta.variant"
      :to="cta.to"
    >
      {{ cta.text }}
      <font-awesome-icon :icon="['fal', 'chevron-right']" />
    </b-button>
  </b-jumbotron>
</template>

<script>
import { FRONTEND_ROUTE_MAP } from "@/setup/constants";
import { BButton, BJumbotron } from "bootstrap-vue";
export default {
  name: "EmbeddableJumbotron",
  components: {
    BButton,
    BJumbotron
  },
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  computed: {
    jumbotron() {
      const embeddable = this.$store.getters["embeddables/find"](this.uuid);
      if (embeddable) {
        return embeddable.content[0];
      }
      return false;
    },
    ctas() {
      const ctas = {};
      this.jumbotron.calls_to_action.forEach(cta => {
        ctas[cta.uuid] = {
          text: cta.text,
          variant: cta.button_variant.class
            ? cta.button_variant.class.replace("btn-", "")
            : "default",
          to: {
            name: FRONTEND_ROUTE_MAP[cta.frontend_route.machine_name]
          }
        };
      });
      return ctas;
    }
  }
};
</script>
