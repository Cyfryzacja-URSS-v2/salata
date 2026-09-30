<template>
  <div
    class="tw-flex tw-min-h-screen tw-items-center tw-justify-center tw-bg-light-gray tw-px-4"
  >
    <div class="tw-w-full tw-max-w-[420px]">
      <!-- Logo -->
      <div class="tw-mb-8 tw-flex tw-justify-center">
        <router-link :to="{ name: 'landing' }">
          <div class="tw-text-3xl tw-font-medium tw-text-green">
            Sałata URSS
          </div>
        </router-link>
      </div>

      <v-card class="tw-rounded-xl tw-px-2 tw-py-4">
        <!-- Main sign-in screen -->
        <template>
          <v-card-title class="tw-flex tw-flex-col tw-items-center tw-pb-0">
            <div class="tw-text-2xl tw-font-medium">
              Witaj z powrotem
            </div>
            <div class="tw-mt-1 tw-text-sm tw-font-normal tw-text-dark-gray">
              Zaloguj się, aby kontynuować
            </div>
          </v-card-title>
          <v-card-text class="tw-flex tw-flex-col tw-items-center tw-pt-6">
            <div class="tw-mb-4 tw-flex tw-w-full tw-flex-col tw-gap-y-2">
              <v-btn
                block
                @click="signIn(calendarTypes.GOOGLE)"
                class="tw-bg-white"
              >
                <div class="tw-flex tw-w-full tw-items-center tw-gap-2">
                  <v-img
                    class="tw-flex-initial"
                    width="20"
                    height="20"
                    src="@/assets/google_logo.svg"
                  />
                  <v-spacer />
                  Zaloguj się przez Google
                  <v-spacer />
                </div>
              </v-btn>
            </div>
          </v-card-text>
        </template>

      </v-card>
    </div>
  </div>
</template>

<script>
import { authTypes, calendarTypes } from "@/constants"
import { signInGoogle } from "@/utils"

export default {
  name: "SignIn",

  metaInfo() {
    return {
      title: "Logowanie - Sałata URSS",
    }
  },

  computed: {
    upgradeRedirect() {
      return this.$route.query.redirect === "upgrade"
    },
  },

  data() {
    return {
      calendarTypes,
    }
  },

  methods: {
    signIn(provider) {
      const state = this.upgradeRedirect
        ? { type: authTypes.UPGRADE, upgradeParams: this.$route.query.upgradeParams }
        : null
      if (provider === calendarTypes.GOOGLE) {
        signInGoogle({ state, selectAccount: true })
      }
    },
  },
}
</script>
