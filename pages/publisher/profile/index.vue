<template>
  <div class="container-fluid">
    <div class="fs-24 font-weight-bold mb-3">Account</div>
    <!-- <BackwardNavigation /> -->
    <div class="card">
      <UtilsBaseCardTab @tab-selected="handleOnSelectTab($event)">
        <template v-for="(tab, index) in ['My Profile', 'Payment Info']">
          <UtilsCardTab :key="index" :title="tab">
            <div class="card-body py-xl-2 px-xl-5">
              <div class="" v-if="showProfile">
                <div class="card card-bordered">
                  <div class="card-body">
                    <div class="text-dark fs-20 line-height-100p mb-4">
                      Publisher Information
                    </div>

                    <div class="fs-14 line-height-100p">
                      <div
                        class="d-flex flex-wrap align-items-center no-gutters border-bottom py-3"
                      >
                        <div class="col-4 mb-2 mb-md-0">
                          <div class="text-light">Photo</div>
                        </div>
                        <div class="col-8 text-right">
                          <div class="position-relative">
                            <img
                              class="object-fit-cover rounded-circle"
                              width="72"
                              height="72"
                              :src="image"
                            />
                            <button
                            v-if="toInput"
                              class="bg-transparent border-0 p-0 position-absolute bottom-0 right-0"
                              type="button"
                              @click.prevent="$refs.fileInput.click()"
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="12" cy="12" r="12" fill="#1070B7" />
                                <path
                                  d="M12 16.6665H17.25"
                                  stroke="white"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M14.625 7.04164C14.8571 6.80957 15.1718 6.6792 15.5 6.6792C15.6625 6.6792 15.8234 6.71121 15.9735 6.77339C16.1237 6.83558 16.2601 6.92673 16.375 7.04164C16.4899 7.15654 16.5811 7.29296 16.6432 7.44309C16.7054 7.59322 16.7374 7.75413 16.7374 7.91664C16.7374 8.07914 16.7054 8.24005 16.6432 8.39018C16.5811 8.54032 16.4899 8.67673 16.375 8.79164L9.08333 16.0833L6.75 16.6666L7.33333 14.3333L14.625 7.04164Z"
                                  stroke="white"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      <PageProfileARow
                        :obj-key="['individual', 'corporation']"
                        :label="'Type of Business'"
                      >
                        <div class="d-flex no-gutters" style="column-gap: 8px">
                          <div class="col-12 d-flex align-items-center">
                            <div v-if="toInput">
                              <input
                                type="radio"
                                v-model="user.check"
                                value="Individual"
                              />
                              <span class="ml-2">Individual</span>
                              <input
                                type="radio"
                                v-model="user.check"
                                value="Corporation"
                                class="ml-5"
                              />
                              <span class="ml-2">Corporation</span>
                            </div>
                            <span v-else>{{ user.check }}</span>
                          </div>
                          <!-- </div> -->
                        </div>
                      </PageProfileARow>
                      <div v-if="user.check === 'Individual'">
                        <PageProfileARow
                          :obj-key="'date_of_birth'"
                          :label="'Date of Birth'"
                        >
                          <div
                            class="d-flex no-gutters"
                            style="column-gap: 8px"
                          >
                            <div v-if="toInput" class="date col-xl-6">
                              <v-date-picker
                                v-model="user.date_of_birth"
                                mode="date"
                              >
                                <template #default="{ togglePopover }">
                                  <span @click="togglePopover()">
                                    <input
                                      class="form-control"
                                      placeholder="Date of Birth"
                                      :value="user.date_of_birth | date"
                                    />
                                  </span>
                                </template>
                              </v-date-picker>
                              <b-icon-calendar4 class="fs-12 calendar-icon" />
                            </div>
                            <span v-else>{{
                              user.date_of_birth
                                ? formatDate(user.date_of_birth)
                                : formatDate(user.date_of_birth)
                            }}</span>
                          </div>
                        </PageProfileARow>
                        <PageProfileARow
                          :obj-key="['name']"
                          :label="'Legal Name'"
                        >
                          <PageProfileAnInput
                            v-model="user.name"
                            :label="'Name'"
                            :to-input="toInput"
                          />
                        </PageProfileARow>
                      </div>
                      <div v-else>
                        <PageProfileARow
                          :obj-key="'date_of_incoporation'"
                          :label="'Date of Incorporation'"
                        >
                          <div
                            class="d-flex no-gutters"
                            style="column-gap: 8px"
                          >
                            <div class="date col-xl-6" v-if="toInput">
                              <v-date-picker
                                v-model="user.date_of_incoporation"
                                mode="date"
                              >
                                <template #default="{ togglePopover }">
                                  <span @click="togglePopover()">
                                    <input
                                      class="form-control"
                                      placeholder="Date of Incoporation"
                                      :value="user.date_of_incoporation | date"
                                    />
                                  </span>
                                </template>
                              </v-date-picker>
                              <b-icon-calendar4 class="fs-12 calendar-icon" />
                            </div>
                            <span v-else>{{ user.date_of_incoporation }}</span>
                          </div>
                        </PageProfileARow>
                        <PageProfileARow
                          :obj-key="['name']"
                          :label="'Company Name'"
                        >
                          <PageProfileAnInput
                            v-model="user.company_name"
                            :label="'Company Name'"
                            :to-input="toInput"
                          />
                        </PageProfileARow>
                      </div>
                      <PageProfileARow :obj-key="'country'" :label="'Country'">
                        <div class="d-flex no-gutters" style="column-gap: 8px">
                          <div v-if="toInput" class="col-xl-6">
                            <v-select
                              v-model="user.country"
                              class="style-chooser"
                              placeholder="Country"
                              :options="countries"
                              label="name"
                              :reduce="(option) => option.name"
                            >
                            </v-select>
                          </div>
                          <span v-else>{{ user.country }}</span>
                        </div>
                      </PageProfileARow>

                      <PageProfileARow :obj-key="'state'" :label="'State'">
                        <div class="d-flex no-gutters" style="column-gap: 8px">
                          <div v-if="toInput" class="col-xl-6">
                            <v-select
                              v-model="user.state"
                              class="style-chooser"
                              placeholder="State"
                              label="name"
                              :options="states"
                              :reduce="(option) => option.name"
                            >
                            </v-select>
                          </div>
                          <span v-else>{{ user.state }}</span>
                        </div>
                      </PageProfileARow>

                      <PageProfileARow :obj-key="'city'" :label="'City'">
                        <PageProfileAnInput
                          v-model="user.city"
                          :label="'City'"
                          :to-input="toInput"
                        />
                      </PageProfileARow>
                      <div v-if="user.check === 'Individual'">
                        <PageProfileARow
                          :obj-key="'address1'"
                          :label="'Address Line 1'"
                        >
                          <PageProfileAnInput
                            v-model="user.address1"
                            class="text-capitalize"
                            :label="'Address Line 1'"
                            :to-input="toInput"
                          />
                        </PageProfileARow>
                        <PageProfileARow
                          :obj-key="'address2'"
                          :label="'Address Line 2'"
                        >
                          <PageProfileAnInput
                            v-model="user.address2"
                            class="text-capitalize"
                            :label="'Address Line 2'"
                            :to-input="toInput"
                          />
                        </PageProfileARow>
                      </div>
                      <div v-else>
                        <PageProfileARow
                          :obj-key="'address1'"
                          :label="'House Address'"
                        >
                          <PageProfileAnInput
                            v-model="user.address1"
                            class="text-capitalize"
                            :label="'House Address'"
                            :to-input="toInput"
                          />
                        </PageProfileARow>
                      </div>
                      <PageProfileARow
                        :obj-key="'phone_number'"
                        :label="'Phone'"
                      >
                        <PageProfileAnInput
                          v-model="user.phone_number"
                          :to-input="toInput"
                          class="text-capitalize"
                          :label="'Phone'"
                        />
                      </PageProfileARow>
                      <div class="d-flex justify-content-end mt-5">
                        <button
                          v-if="!toInput"
                          class="btn btn-primary py-2 px-3"
                          @click="UpdateProfile()"
                        >
                          Edit Profile Info
                        </button>
                        <button
                          v-else
                          class="btn btn-primary py-2 px-3"
                          @click="saveProfile()"
                        >
                          Save Profile Info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="card card-bordered">
                  <div class="card-body">
                    <div class="text-dark fs-20 line-height-100p mb-4">
                      Bank Details
                    </div>
                    <div class="fs-14 line-height-100p border-top">
                      <PageProfileARow :obj-key="'bank'" :label="'Bank'">
                        <div class="d-flex no-gutters" style="column-gap: 8px">
                          <div v-if="toInput" class="col-xl-6">
                            <v-select
                              v-model="payment.bank"
                              class="style-chooser"
                              placeholder="Select Bank"
                              :options="banks"
                              label="name"
                              :reduce="(option) => option.name"
                            >
                            </v-select>
                          </div>
                          <span v-else>{{ payment.bank }}</span>
                        </div>
                      </PageProfileARow>
                    </div>
                    <PageProfileARow
                      :obj-key="['account_number']"
                      :label="'Account Number'"
                    >
                      <PageProfileAnInput
                        v-model="payment.account_number"
                        :label="'Account Number'"
                        :to-input="toInput"
                      />
                    </PageProfileARow>
                    <PageProfileARow
                      :obj-key="['account_name']"
                      :label="'Account Holder Name'"
                    >
                      <PageProfileAnInput
                        v-model="payment.account_name"
                        :label="'Account Holder Name'"
                        :to-input="toInput"
                      />
                    </PageProfileARow>
                    <div class="d-flex justify-content-end mt-5">
                      <button
                        v-if="!toInput"
                        class="btn btn-primary py-2 px-3"
                        @click="UpdatePayment()"
                      >
                        Edit Payment Info
                      </button>
                      <button
                        v-else
                        class="btn btn-primary py-2 px-3"
                        @click="savePayment()"
                      >
                        Save Payment Info
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UtilsCardTab>
        </template>
      </UtilsBaseCardTab>
    </div>
    <input ref="fileInput" class="invisible" type="file" @change.prevent="onChange" />
  </div>
</template>

<script>
import Vue from "vue";
import countries from "@/assets/countries.json";
import banks from "@/assets/banks.json";
import { DateTime } from "luxon";
import { mapActions, mapGetters } from "vuex";
export default Vue.extend({
  layout: "authWithoutTopbar",

  data() {
    return {
      dummyAvatar:
        "https://546458-1766807-raikfcquaxqncofqfm.stackpathdns.com/pub/media/wordpress/d5f1425700d7460bb2aa1e1e8e1b7e49.jpg",
      image: "",
      user: {
        phone_number: "",
        address2: "",
        address1: "",
        date_of_birth: "",
        name: "",
        country: "",
        city: "",
        avatar: "",
        date_of_incoporation: "",
        company_name: "",
        state: "",
        check: "Individual",
      },
      payment: {
        bank: "",
        account_name: "",
        account_number: "",
      },
      date: new Date(),
      showProfile: true,
      toInput: true,
      countries: countries,
      banks: banks,
      states: [],
    };
  },
  watch: {
    "user.country": {
      handler(newval, oldval) {
        const country = this.countries.find((el) => el.name === newval);
        this.states = country.states;
        if (oldval !== "") {
          this.user.state = "";
        }
      },
      immediate: false,
    },
  },
  computed: {
    ...mapGetters("publisher", ["getPublisher"]),
  },
  async created() {
    // if (this.$route.query.token) {
    //   this.$cookies.set('slate-token', this.$route.query.token)
    // }
    // await this.getPublisherToken()
    await this.getPublisherDetails();
  },
  methods: {
    ...mapActions("publisher", ["GET_PUBLISHER"]),
    async UpdateProfile() {
      this.toInput = true;
      this.$children.forEach((child) => {
        child.toInput = !child.toInput;
      });
      // console.log(event)
      // const user = this.user
      // let object = {}

      // if (typeof event === 'string') {
      //   object = { [event]: user[event] }
      // } else if (Array.isArray(event))  {
      //   event.forEach((key) => {
      //     object[key] = user[key]
      //   })
      // } else {
      //   object = user
      // }
      // this.read = true

      // await this.$axios.$put('/util/v2/profile/update/', object)
      // await this.$nuxt.refresh()
      // this.$store.commit('auth/SET_USER', user)
    },
    toggleField() {
      // this.edit = !this.edit
      this.$children.forEach((child) => {
        child.toInput = !child.toInput;
      });
    },
    // async getPublisherToken() {
    //   try {
    //     const response = await this.$axios.post('/app/publisher/login/', {
    //       slate_token: 'LWnNsJUWO4kl_UWCcH9--3h-bQyeJsQi6xZmrUvs'
    //     }).then((res) =>
    //     this.$cookies.set('publisher-token', res.data.data.token)
    //     )
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    async saveProfile() {
      const token = this.$cookies.get("slate-token");
      try {
        const data = {
          publisher_type: this.user.check,
          name: this.user.name,
          company_name: this.user.company_name,
          date_of_birth: this.user.date_of_birth
            ? this.formatDate(this.user.date_of_birth)
            : "",
          date_of_incoporation: this.user.date_of_incoporation
            ? this.formatDate(this.user.date_of_incoporation)
            : "",
          country: this.user.country,
          state: this.user.state,
          city: this.user.city,
          address_line_one: this.user.address1,
          address_line_two: this.user.address2,
          slate_token: token,
          phone: this.user.phone_number,
          ...(this.image ? { publisher_photo: this.image } : {}),
        };
        if (this.getPublisher.length > 0) {
          const response = await this.$axios.put(
            `/app/publisher/${this.getPublisher[0].id}/update/`,
            data
          );
          if (response.status === 200) {
            this.toInput = false;
            this.$toast({
              type: "success",
              text: "Publisher Updated Successfully",
            });
          }
        } else {
          const response = await this.$axios.post(
            "/app/publisher/create/",
            data
          );
          if (response.status === 200) {
            this.toInput = false;
            this.$toast({
              type: "success",
              text: "Publisher Created Successfully",
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getPublisherDetails() {
      try {
        await this.GET_PUBLISHER();
        if (this.getPublisher.length > 0) {
          this.toInput = false;
          const data = this.getPublisher[0];
          this.user.check = data.publisher_type;
          this.user.name = data.name;
          this.user.date_of_birth = data.date_of_birth;
          this.user.country = data.country;
          this.user.phone_number = data.phone;
          this.user.state = data.state;
          this.user.city = data.city;
          this.user.address1 = data.address_line_one;
          this.user.address2 = data.address_line_two;
          this.image = data.publisher_photo
        }
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      if (date instanceof Date) {
        const oldDate = date.toISOString();
        const newDate = DateTime.fromISO(oldDate).toISODate();
        return newDate;
      } else {
        return this.user.date_of_birth;
      }
    },
    onChange() {
      const input = this.$refs.fileInput;
      const file = input.files[0]
      const reader = new FileReader()
        reader.addEventListener('load', () => {
          this.image = reader.result
        })
        reader.readAsDataURL(file)
    },
    handleOnSelectTab(e) {
      if (e === "My Profile") {
        // mine
        this.showProfile = true;
      }
      if (e === "Payment Info") {
        // class
        this.showProfile = false;
      }
    },
  },
});
</script>

<style scoped>
.date {
  position: relative;
}
.calendar-icon {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #8f9aa3;
}
</style>
