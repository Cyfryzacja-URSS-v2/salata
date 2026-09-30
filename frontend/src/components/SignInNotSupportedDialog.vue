<template>
  <!-- Google sign in not supported dialog -->
  <v-dialog :value="value" width="400" content-class="tw-m-0">
    <v-card>
      <v-card-title>Logowanie przez Google niedostępne</v-card-title>
      <v-card-text>
        <p>
          Zwykle dzieje się tak, gdy otwierasz link do Sałaty z Instagrama lub
          Messengera.
        </p>
        <p>
          Aby to naprawić, kliknij trzy kropki w prawym górnym rogu, a następnie
          wybierz „Otwórz w przeglądarce systemowej” lub „Otwórz w Chrome”.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text class="tw-text-green" @click="$emit('input', false)">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "SignInNotSupportedDialog",

  props: {
    value: { type: Boolean, required: true },
  },
}
</script>
