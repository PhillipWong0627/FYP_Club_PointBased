<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full pb-4 py-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div class="text-blueGray-900 text-center mb-3 font-bold">
            <p class="flex justify-center font-semibold text-3xl uppercase mt-6">Member Login</p>
          </div>


          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form @submit.prevent="login">
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                  Email
                </label>
                <input type="email" required v-model="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email" />
              </div>

              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                  Password
                </label>
                <input :type="passwordFieldType" required v-model="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password" />
                <div class="button mr-1.5">
                  <span v-if="passwordVisibility" @click="togglePasswordVisibility"
                    class="uppercase font-bold text-sm">hide</span>
                  <span v-else @click="togglePasswordVisibility" class="uppercase font-bold text-sm">show</span>

                </div>

              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex flex-wrap relative ">
          <div class="w-1/2 ">
            <router-link to="/auth/register" class="text-blueGray-200">
              <small>Create new account</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from '@/service/apiProvider';

export default {
  data() {
    return {
      email: "",
      password: "",
      passwordVisibility: false,

    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisibility = !this.passwordVisibility;
    },

    async login() {
      const result = await login(this.email, this.password);
      // console.log(result);
      const code = result.code
      // console.log(code);
      // console.log(this.password);

      if (code === 0) {
        const routeData = this.$router.resolve({
          name: "main",

        });
        window.location.href = routeData.href;

        alert("Login Succesful, Please Proceed")
      } else if (code === 500214) {
        alert("Email is not exist~")
      } else if (code === 500213) {
        alert("password is not correct, please try again~")
      }
    }
  },
  computed: {
    passwordFieldType() {
      return this.passwordVisibility ? "text" : "password";

    }

  },
};
</script>
<style scoped>
.button {
  position: absolute;
  right: 10px;
  top: 33px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>