<template>
  <footer class="tw-mt-16 tw-bg-green tw-p-8 tw-text-white">
    <div class="tw-mx-auto tw-max-w-7xl">
      <div class="tw-flex tw-flex-col tw-gap-8 md:tw-grid md:tw-grid-cols-4">
        <!-- Logo and Info -->
        <div>
          <div class="tw-mb-3 tw-flex tw-items-center">
            <v-icon class="tw-mr-1 tw-text-white">mdi-calendar-blank</v-icon>
            <span class="tw-text-2xl tw-font-medium">Sałata URSS</span>
          </div>
          <div class="tw-mb-6 tw-leading-snug">
            Fork projektu timeful autorstwa:
            <a
              href="https://x.com/jonathanzliu/"
              target="_blank"
              class="tw-text-white tw-underline"
              >@jonathanzliu</a
            >
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-justify-end tw-gap-2">
          <div class="tw-mb-2 tw-text-sm tw-text-white/80">
            <span
              class="uppercase tw-mb-1 tw-block tw-font-bold tw-tracking-wide"
            ></span>
            Ten serwis został przygotowany na użytek własny URSS AGH.<br />
            Nie bierzemy odpowiedzialności za korzystanie przez osoby spoza
            organizacji.<br />
            Korzystasz na własne ryzyko – żadnych gwarancji, żadnej obsługi
            postronnych kont.
          </div>
          <div
            class="tw-mt-8 tw-border-t tw-border-white/20 tw-pt-4 tw-text-sm tw-text-white/80"
          >
            &copy; {{ new Date().getFullYear() }} Uczelniana Rada Samorządu
            Studentów AGH |
            <a
              href="https://github.com/Cyfryzacja-URSS-v2/salata"
              target="_blank"
              rel="noopener noreferrer"
              >Kod źródłowy</a
            >
            | AGPL-3.0.
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
div:has(a) {
  @apply tw-leading-none;
}
a {
  @apply tw-text-white/80 !important;
}
a:hover {
  @apply tw-text-white !important;
}
</style>

<script>
import { mapActions } from "vuex"

export default {
  name: "Footer",
  data() {
    return {
      contractAddress: "2uHvhSasjzHm4PPAWaVpuU7yKtd4yUGYx6WK2oxutQnm",
    }
  },
  computed: {
    contractAddressTruncated() {
      return (
        this.contractAddress.slice(0, 6) +
        "..." +
        this.contractAddress.slice(-4)
      )
    },
  },
  methods: {
    ...mapActions(["showInfo"]),
    copyContractAddress() {
      navigator.clipboard
        .writeText(this.contractAddress)
        .then(() => {
          this.showInfo("Contract address copied to clipboard!")
        })
        .catch((err) => {
          console.error("Failed to copy contract address: ", err)
          // Optionally, show an error message to the user
        })
    },
  },
}
</script>
