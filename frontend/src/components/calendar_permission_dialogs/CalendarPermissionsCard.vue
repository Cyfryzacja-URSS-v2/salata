<template>
  <div>
    <div class="tw-text-md tw-mb-4 tw-font-medium">
      Potrzebujemy następujących uprawnień, aby uzyskać dostęp do wydarzeń w Kalendarzu Google
    </div>

    <div class="tw-mb-8 tw-ml-4 tw-flex tw-flex-col tw-gap-4">
      <div class="tw-flex tw-gap-2 tw-text-sm">
        <v-img
          src="@/assets/gcal_logo.png"
          class="tw-flex-none"
          height="20"
          width="20"
        />
        <div>Wyświetlanie wydarzeń ze wszystkich kalendarzy.</div>
      </div>
      <div class="tw-flex tw-gap-2 tw-text-sm">
        <v-img
          src="@/assets/gcal_logo.png"
          class="tw-flex-none"
          height="20"
          width="20"
        />
        <div>Wyświetlanie listy subskrybowanych kalendarzy Google.</div>
      </div>
    </div>

    <div class="tw-text-md tw-mb-4 tw-font-medium">Te uprawnienia pozwolą</div>
    <div
      class="tw-mb-8 tw-flex tw-flex-col tw-gap-4 tw-text-sm tw-text-very-dark-gray"
    >
      <div>wyświetlać nazwy i godziny wydarzeń w kalendarzu</div>
      <div>
        wyświetlać wydarzenia ze wszystkich kalendarzy, nie tylko głównego
      </div>
    </div>

    <div class="tw-flex">
      <!-- <v-spacer /> -->
      <v-btn v-if="cancelLabel != ''" @click="$emit('cancel')" text class="tw-mr-2 tw-flex-1">
        {{ cancelLabel }}
      </v-btn>
      <v-btn @click="$emit('allow')" class="tw-flex-1 tw-bg-green" dark>
        {{ allowLabel }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarPermissionsCard",

  props: {
    cancelLabel: { type: String, default: "Anuluj" },
    allowLabel: { type: String, default: "Zezwól" },
  },
}
</script>
