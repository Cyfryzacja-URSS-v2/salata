<template>
  <div class="tw-flex tw-flex-col tw-gap-6">
    <div class="tw-flex tw-flex-col tw-gap-3">
      <div class="tw-text-md tw-flex tw-flex-row tw-items-center tw-justify-start tw-gap-2 tw-font-medium">
        Połącz kanał kalendarza ICS
      </div>
      <div class="tw-flex tw-flex-col tw-gap-2">
        <div class="tw-text-sm tw-text-very-dark-gray">
          Wklej adres kanału ICS od dostawcy kalendarza. Zwykle znajdziesz go w ustawieniach udostępniania lub eksportu kalendarza.
        </div>
      </div>
    </div>
    <div class="tw-flex tw-flex-col tw-gap-3">
      <v-text-field solo placeholder="Adres kanału" v-model="feedUrl" hide-details="auto" :error-messages="feedUrlError" />
      <v-text-field solo placeholder="Nazwa" hide-details v-model="label" />
      <div class="tw-flex tw-items-center tw-gap-2">
        <v-btn text class="tw-grow" @click="$emit('back')">Wstecz</v-btn>
        <v-btn :disabled="!enableSubmit" color="primary" class="tw-grow" :loading="loading"
          @click="submit">Dodaj</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "@/utils"
import { mapActions } from "vuex"
import { urlRegex } from "@/constants";

export default {
  name: "ICSCredentials",

  data() {
    return {
      feedUrl: "",
      label: "",
      loading: false,
    }
  },

  computed: {
    enableSubmit() {
      return this.label && urlRegex.test(this.feedUrl)
    },
    feedUrlError() {
      if (!this.feedUrl || this.feedUrl.length === 0) return ""
      if (!urlRegex.test(this.feedUrl)) return "Wpisz prawidłowy adres URL"
      return ""
    },
  },

  methods: {
    ...mapActions(["showError", "refreshAuthUser"]),
    submit() {
      this.loading = true
      post(`/user/add-ics-calendar-account`, {
        feedUrl: this.feedUrl,
        label: this.label,
      })
        .then(async () => {
          await this.refreshAuthUser()
          this.$emit("addedCalendar")

          this.$posthog.capture("ICS Calendar Added")
        })
        .catch((err) => {
          this.showError(
            "Nie udało się dodać kalendarza ICS. Sprawdź adres kanału lub spróbuj ponownie później."
          )
          console.error(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
