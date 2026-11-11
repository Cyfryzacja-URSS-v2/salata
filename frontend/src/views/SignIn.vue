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
<<<<<<< HEAD
import { authTypes, calendarTypes } from "@/constants"
import { signInGoogle } from "@/utils"
=======
import { calendarTypes } from "@/constants"
import { post, signInGoogle, signInOutlook } from "@/utils"
import { mapMutations } from "vuex"
import Logo from "@/components/Logo.vue"
>>>>>>> upstream/main

export default {
  name: "SignIn",

  metaInfo() {
    return {
      title: "Logowanie - Sałata URSS",
    }
  },

<<<<<<< HEAD
  computed: {
    upgradeRedirect() {
      return this.$route.query.redirect === "upgrade"
    },
=======
  components: {
    Logo,
>>>>>>> upstream/main
  },

  data() {
    return {
      calendarTypes,
    }
  },

  methods: {
    signIn(provider) {
      if (provider === calendarTypes.GOOGLE) {
<<<<<<< HEAD
        signInGoogle({ state, selectAccount: true })
      }
    },
=======
        signInGoogle({ state: null, selectAccount: true })
      } else if (provider === calendarTypes.OUTLOOK) {
        signInOutlook({ state: null, selectAccount: true })
      }
    },
    validateEmail() {
      const email = this.email.trim()
      if (!email) {
        this.emailError = "Please enter an email address."
        return false
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        this.emailError = "Please enter a valid email address."
        return false
      }
      if (email.includes("+")) {
        this.emailError = "Email aliases with '+' are not allowed."
        return false
      }
      return true
    },
    async submitEmail() {
      if (this.sending) return
      this.emailError = ""
      if (!this.validateEmail()) return
      this.sending = true
      try {
        const res = await post("/auth/otp/check-email", { email: this.email })
        this.isNewUser = res.isNewUser
        if (this.isNewUser) {
          this.step = "onboarding"
        } else {
          await this.sendOtpEmail()
          this.step = "otp"
          this.otpCode = ""
          this.otpError = ""
        }
      } catch (err) {
        this.emailError = "Something went wrong. Please try again."
      } finally {
        this.sending = false
      }
    },
    async submitOnboarding() {
      if (!this.firstName.trim() || this.sending) return
      this.sending = true
      try {
        await this.sendOtpEmail()
        this.step = "otp"
        this.otpCode = ""
        this.otpError = ""
      } catch (err) {
        this.otpError = "Failed to send code. Please try again."
      } finally {
        this.sending = false
      }
    },
    async sendOtpEmail() {
      await post("/auth/otp/send", { email: this.email })
      this.startResendCooldown()
    },
    async resendOtp() {
      if (this.sending || this.resendCooldown > 0) return
      this.sending = true
      try {
        await this.sendOtpEmail()
        this.otpCode = ""
        this.otpError = ""
      } catch (err) {
        this.otpError = "Failed to resend code. Please try again."
      } finally {
        this.sending = false
      }
    },
    async verifyOtp() {
      if (this.otpCode.length !== 6 || this.verifying) return
      this.otpError = ""
      this.verifying = true
      try {
        const body = {
          email: this.email,
          code: this.otpCode,
          timezoneOffset: new Date().getTimezoneOffset(),
        }
        if (this.isNewUser) {
          body.firstName = this.firstName.trim()
          body.lastName = this.lastName.trim()
        }
        const user = await post("/auth/otp/verify", body)
        this.setAuthUser(user)
        this.$posthog?.identify(user._id, {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        })
        this.$router.replace({ name: "home" })
      } catch (err) {
        const errorCode = err?.parsed?.error
        if (errorCode === "otp-expired") {
          this.otpError = "Code has expired. Please request a new one."
        } else if (errorCode === "otp-too-many-attempts") {
          this.otpError = "Too many attempts. Please request a new code."
        } else {
          this.otpError = "Invalid code. Please try again."
        }
      } finally {
        this.verifying = false
      }
    },
    startResendCooldown() {
      this.resendCooldown = 30
      if (this.resendTimer) clearInterval(this.resendTimer)
      this.resendTimer = setInterval(() => {
        this.resendCooldown--
        if (this.resendCooldown <= 0) {
          clearInterval(this.resendTimer)
          this.resendTimer = null
        }
      }, 1000)
    },
  },

  beforeDestroy() {
    if (this.resendTimer) clearInterval(this.resendTimer)
>>>>>>> upstream/main
  },
}
</script>
