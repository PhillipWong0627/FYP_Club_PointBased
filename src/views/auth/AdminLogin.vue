<template>
  <div>
    <Navnavbars />
    <UserNavbar />
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div class="absolute top-0 w-full h-full bg-blueGray-800  bg-full"
          :style="`background-image: url('${registerBg2}');`"></div>
        <!-- <div class="login-container absolute top-0 left-0 right-0">

          <div class="login-card">
            <h2>Admin Login</h2>
            <form @submit.prevent="adminLogin">
              <div class="input-group">
                <label for="username">Username</label>
                <input v-model="username" type="text" id="username" placeholder="Enter Username" required />
              </div>
              <div class="input-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" id="password" placeholder="Enter Password" required />
              </div>
              <button type="submit" class="login-button">Login</button>
            </form>
          </div>
        </div> -->
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-6/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 py-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div class="text-blueGray-900 text-center mb-3 font-bold">
                  <p class="flex justify-center font-semibold text-3xl uppercase mt-6">Admin Login</p>
                </div>

                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">

                  <form @submit.prevent="adminLogin">
                    <div class="relative w-full mb-3">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="username">
                        Name
                      </label>
                      <input type="text" v-model="username" required
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Enter Username" />
                    </div>

                    <div class="relative w-full mb-3 ">
                      <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="password">
                        Password
                      </label>
                      <input type="password" v-model="password" required
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Enter Password" />

                    </div>

                    <div class="text-center mt-6">
                      <button
                        class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit">
                        Login
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>


  </div>

</template>

<script>
import axios from 'axios';
import UserNavbar from "@/components/Navbars/UserNavbar.vue";
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import registerBg2 from "@/assets/img/register_bg_2.png";

export default {
  data() {
    return {
      username: '',
      password: '',
      registerBg2
    };
  },
  components: {
    UserNavbar,
    Navnavbars
  },
  methods: {
    async adminLogin() {
      try {
        const response = await axios.post('/api/v1/admin/login', {
          username: this.username,
          password: this.password,
        });

        if (response.data.code === 0) {
          // Store admin info in local storage or use session management
          localStorage.setItem('adminId', response.data.data.adminId);
          localStorage.setItem('adminUsername', response.data.data.username);
          this.$router.push({ name: 'adminDashboard' }); // Navigate to Admin Dashboard
        } else {
          alert(response.data.msg); // Handle error
        }
      } catch (error) {
        alert('Login failed. Please check your credentials.');
      }
    },
  },
};
</script>

<style scoped>
/* Basic styles for the login form */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
}

.input-group {
  margin-bottom: 15px;
}

.login-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
</style>