<template>
  <div class="tw-bg-light-gray">
    <div
      class="tw-relative tw-m-auto tw-mb-12 tw-flex tw-max-w-6xl tw-flex-col tw-px-4 sm:tw-mb-20"
    >
      <!-- Header -->
      <div class="tw-mb-16 sm:tw-mb-28">
        <div class="tw-flex tw-items-center tw-pt-5">
          <span class="tw-text-2xl tw-font-bold">Sałata URSS</span>

          <v-spacer />

          <LandingPageHeader>
            <div v-if="authUser" class="tw-ml-2">
              <AuthUserMenu />
            </div>
            <v-btn v-else text :to="{ name: 'sign-in' }">Zaloguj się</v-btn>
          </LandingPageHeader>
        </div>
      </div>

      <div class="tw-flex tw-flex-col tw-items-center">
        <div
          class="tw-mb-6 tw-flex tw-max-w-[26rem] tw-flex-col tw-items-center sm:tw-w-[35rem] sm:tw-max-w-none"
        >
          <div
            class="tw-mb-4 tw-flex tw-select-none tw-items-center tw-rounded-full tw-border tw-border-light-gray-stroke tw-bg-white/70 tw-px-2.5 tw-py-1.5 tw-text-sm tw-text-dark-gray"
          >
            Projekt open source
            <github-button
              v-once
              class="-tw-mb-1 tw-ml-2"
              href="https://github.com/schej-it/timeful.app"
              data-show-count="true"
              aria-label="Star timeful.app on GitHub"
              >Star</github-button
            >
          </div>
          <div
            id="header"
            class="tw-mb-4 tw-text-center tw-text-2xl tw-font-medium sm:tw-text-4xl lg:tw-text-4xl xl:tw-text-5xl"
          >
            <h1>Znajdź czas na spotkanie</h1>
          </div>

          <div
            class="lg:tw-text-md tw-text-center tw-text-sm tw-text-very-dark-gray sm:tw-text-lg md:tw-text-lg xl:tw-text-lg"
          >
            Sałata URSS to darmowe narzędzie do planowania spotkań, które pozwala
            znaleźć wspólny czas dla wszystkich uczestników.
            <br class="tw-hidden sm:tw-block" />
            Zintegrowane z Twoim
            <v-tooltip
              top
              content-class="tw-bg-very-dark-gray tw-shadow-lg tw-opacity-100"
            >
              <template v-slot:activator="{ on, attrs }">
                <span
                  class="tw-cursor-pointer tw-border-b tw-border-dashed tw-border-dark-gray"
                  v-bind="attrs"
                  v-on="on"
                  >kalendarzem</span
                >
              </template>
              <span
                >Sałata URSS pozwala automatycznie wypełnić Twoją dostępność z Google
                Calendar</span
              > </v-tooltip
            >.
          </div>
        </div>

        <div class="tw-mb-12 tw-space-y-2">
          <v-btn
            class="tw-block tw-self-center tw-rounded-lg tw-bg-green tw-px-10 tw-text-base sm:tw-px-10 lg:tw-px-12"
            dark
            @click="authUser ? openDashboard() : (newDialog = true)"
            large
            :x-large="$vuetify.breakpoint.mdAndUp"
          >
            {{ authUser ? "Otwórz panel" : "Utwórz spotkanie" }}
          </v-btn>
        </div>
      </div>
    </div>

    <!-- How it works -->
    <div
      id="how-it-works"
      class="tw-grid tw-place-content-center tw-px-4 tw-pt-12"
    >
      <div class="tw-mx-auto tw-flex tw-flex-col tw-gap-4">
        <div
          class="tw-mb-4 tw-text-center tw-text-2xl tw-font-medium sm:tw-text-3xl lg:tw-text-4xl"
        >
          Jak to działa
        </div>
        <div
          v-for="(step, i) in howItWorksSteps"
          :key="i"
          class="tw-flex tw-items-center tw-gap-2"
        >
          <NumberBullet>{{ i + 1 }}</NumberBullet>
          <div class="tw-text-base tw-font-medium md:tw-text-xl">
            <div v-html="step"></div>
          </div>
        </div>
      </div>
    </div>

    <Footer />

    <!-- Sign in dialog -->
    <SignInDialog
      v-model="signInDialog"
      @signIn="_signIn"
      @emailSignIn="_emailSignIn"
    />

    <!-- New event dialog -->
    <NewDialog v-model="newDialog" no-tabs @signIn="signIn" />

  </div>
</template>

<style scoped>
@media screen and (min-width: 375px) and (max-width: 640px) {
  #header {
    font-size: 1.875rem !important; /* 30px */
    line-height: 2.25rem !important; /* 36px */
  }
}
</style>
<style>
.rdt-h {
  @apply tw-rounded tw-bg-light-green/20 tw-px-px tw-text-black;
}
</style>

<script>
import LandingPageCalendar from "@/components/landing/LandingPageCalendar.vue"
import { isPhone, signInGoogle, signInOutlook } from "@/utils"
import Header from "@/components/Header.vue"
import NumberBullet from "@/components/NumberBullet.vue"
import NewEvent from "@/components/NewEvent.vue"
import NewDialog from "@/components/NewDialog.vue"
import LandingPageHeader from "@/components/landing/LandingPageHeader.vue"
import GithubButton from "vue-github-button"
import SignInDialog from "@/components/SignInDialog.vue"
import { calendarTypes } from "@/constants"
import HowItWorksDialog from "@/components/HowItWorksDialog.vue"
import { vueVimeoPlayer } from "vue-vimeo-player"
import Footer from "@/components/Footer.vue"
import PronunciationMenu from "@/components/PronunciationMenu.vue"
import { mapState, mapMutations } from "vuex"
import AuthUserMenu from "@/components/AuthUserMenu.vue"

export default {
  name: "Landing",

  metaInfo: {
    title: "Sałata URSS - Ustal spotkanie",
  },

  components: {
    LandingPageCalendar,
    Header,
    NumberBullet,
    NewEvent,
    NewDialog,
    LandingPageHeader,
    GithubButton,
    SignInDialog,
    HowItWorksDialog,
    vueVimeoPlayer,
    Footer,
    PronunciationMenu,
    AuthUserMenu,
  },

  data: () => ({
    signInDialog: false,
    newDialog: false,
    githubSnackbar: true,
    howItWorksSteps: [
      "Utwórz wydarzenie w Sałata URSS",
      "Udostępnij link do wydarzenia swojej grupie, aby wypełnić",
      "Zobacz, gdzie się pokrywają dostępności wszystkich!",
    ],
    rive: null,
    showSchejy: false,
    showHowItWorksDialog: false,
    isVideoPlaying: false,
  }),

  computed: {
    ...mapState(["authUser"]),
    isPhone() {
      return isPhone(this.$vuetify)
    },
  },

  methods: {
    ...mapMutations(["setAuthUser"]),
    loadRiveAnimation() {
      // if (!this.rive) {
      //   this.rive = new Rive({
      //     src: "/rive/schej.riv",
      //     canvas: document.querySelector("canvas"),
      //     autoplay: false,
      //     stateMachines: "wave",
      //     onLoad: () => {
      //       // r.resizeDrawingSurfaceToCanvas()
      //     },
      //   })
      //   setTimeout(() => {
      //     this.showSchejy = true
      //     setTimeout(() => {
      //       this.rive.play("wave")
      //     }, 1000)
      //   }, 4000)
      // } else {
      //   this.rive.play("wave")
      // }
    },
    _signIn(calendarType) {
      if (calendarType === calendarTypes.GOOGLE) {
        signInGoogle({ state: null, selectAccount: true })
      } else if (calendarType === calendarTypes.OUTLOOK) {
        // NOTE: selectAccount is not supported implemented yet for Outlook, maybe add it later
        signInOutlook({ state: null, selectAccount: true })
      }
    },
    _emailSignIn(user) {
      this.setAuthUser(user)
      this.$posthog?.identify(user._id, {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })
      this.$router.replace({ name: "home" })
    },
    signIn() {
      this.$router.push({ name: "sign-in" })
    },
    openHowItWorksDialog() {
      this.showHowItWorksDialog = true
      this.$posthog.capture("how_it_works_clicked")
    },
    onPlay() {
      setTimeout(() => {
        this.isVideoPlaying = true
      }, 1000)
    },
    openDashboard() {
      this.$router.push({ name: "home" })
    },
  },

  beforeDestroy() {
    this.rive?.cleanup()
  },

  watch: {
    [`$vuetify.breakpoint.name`]: {
      immediate: true,
      handler() {
        if (this.$vuetify.breakpoint.mdAndUp) {
          setTimeout(() => {
            this.loadRiveAnimation()
          }, 0)
        }
      },
    },
  },
}
</script>
