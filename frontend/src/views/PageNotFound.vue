<template>
  <div
    class="tw-flex tw-h-full tw-flex-col tw-items-center tw-justify-center tw-p-2"
  >
    <v-img
      alt="schejie sad"
      src="@/assets/schejie/sad.png"
      transition="fade-transition"
      contain
      class="tw-mb-6 tw-h-[150px] tw-flex-none sm:tw-h-[200px]"
    />
    <div class="tw-mb-8 tw-max-w-[19rem]">
      <h1 class="tw-mb-2 tw-text-center tw-text-2xl tw-font-medium">
        404 - nie znaleziono strony
      </h1>
      <div class="tw-text-center tw-text-dark-gray">
        Strona, której szukasz, nie istnieje lub została przeniesiona.
      </div>
    </div>
    <v-btn href="/home" color="primary">Powrót do strony głównej</v-btn>
  </div>
</template>

<script>
import { isPhone } from "@/utils"

export default {
  name: "PageNotFound",

  metaInfo: {
    title: "Nie znaleziono strony - Sałata URSS",
  },

  computed: {
    isPhone() {
      return isPhone(this.$vuetify)
    },
  },
}
</script>
