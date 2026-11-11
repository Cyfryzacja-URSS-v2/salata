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
<<<<<<< HEAD
=======
        <!-- Links -->
        <div class="tw-flex tw-flex-col tw-gap-2">
          <div class="tw-mb-1 tw-font-bold">Links</div>
          <div>
            <a href="/blog" class="tw-text-sm">Blog</a>
          </div>
          <div>
            <v-menu :nudge-bottom="10" offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <span
                  class="tw-cursor-pointer tw-text-sm tw-text-white/80 hover:tw-text-white"
                  v-bind="attrs"
                  v-on="on"
                >
                  Contact us
                </span>
              </template>
              <v-card class="tw-p-3">
                <div class="tw-text-sm">
                  Email us at
                  <span class="tw-text-green tw-underline"
                    >contact@timeful.app</span
                  >
                </div>
              </v-card>
            </v-menu>
          </div>
          <div>
            <a
              href="https://forms.gle/A96i4TTWeKgH3P1W6"
              target="_blank"
              class="tw-text-sm"
              >Give Feedback</a
            >
          </div>
          <div>
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=KWCH6LGJCP6E6"
              target="_blank"
              class="tw-text-sm"
              >Donate</a
            >
          </div>
        </div>
        <!-- Articles -->
        <div class="tw-flex tw-flex-col tw-gap-2">
          <div class="tw-mb-1 tw-font-bold">Articles</div>
          <div>
            <a href="/blog/timeful-is-now-free/" class="tw-text-sm"
              >Timeful is now completely free</a
            >
          </div>
          <div>
            <a href="/blog/schej-is-now-timeful/" class="tw-text-sm"
              >Schej is now Timeful</a
            >
          </div>
          <div>
            <a href="/blog/about/" class="tw-text-sm"
              >Welcome to the Timeful blog!</a
            >
          </div>
          <div>
            <a href="/blog/doodle/" class="tw-text-sm">Timeful vs Doodle</a>
          </div>
          <div>
            <a href="/blog/when2meet/" class="tw-text-sm"
              >Timeful vs When2meet</a
            >
          </div>
          <div>
            <a href="/blog/gcalandwhen2meet/" class="tw-text-sm"
              >How to use When2meet with Google Calendar</a
            >
          </div>
        </div>
        <!-- Reddit posts -->
        <div class="tw-flex tw-flex-col tw-gap-2">
          <div class="tw-mb-1 tw-font-bold">Reddit posts</div>
          <div>
            <a
              href="https://www.reddit.com/r/opensource/comments/1dlol7r/i_made_a_better_when2meet/"
              target="_blank"
              class="tw-text-sm"
              >I made a better when2meet</a
            >
          </div>
          <div>
            <a
              href="https://www.reddit.com/r/opensource/comments/1klu471/i_made_a_doodle_alternative/"
              target="_blank"
              class="tw-text-sm"
              >I made a Doodle alternative</a
            >
          </div>
        </div>
      </div>
      <div
        class="tw-mt-8 tw-border-t tw-border-white/20 tw-pt-4 tw-text-sm tw-text-white/80"
      >
        &copy; {{ new Date().getFullYear() }} Liu Laboratories LLC. All rights
        reserved.
>>>>>>> upstream/main
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
