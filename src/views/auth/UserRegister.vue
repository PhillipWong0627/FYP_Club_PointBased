<template>
    <div class="container mx-auto px-4 h-full">
        <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-6/12 px-4">
                <div
                    class="relative flex flex-col min-w-0 break-words w-full mb-6 py-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                    <div class="text-blueGray-900 text-center mb-3 font-bold">
                        <p class="flex justify-center font-semibold text-3xl uppercase mt-6">Register As Member</p>
                    </div>

                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">

                        <form @submit.prevent="toPaymentModal">
                            <div class="relative w-full mb-3">
                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password">
                                    Name
                                </label>
                                <input type="text" v-model="name" required
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Name" />
                            </div>

                            <div class="relative w-full mb-3">
                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password">
                                    Email
                                </label>
                                <input type="email" v-model="email" required
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Email" />
                            </div>

                            <div class="relative w-full mb-3 ">
                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    htmlFor="grid-password">
                                    Password
                                </label>
                                <input :type="passwordFieldType" v-model="password" required
                                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder="Password" />
                                <div class="button mr-1.5">
                                    <span v-if="passwordVisibility" @click="togglePasswordVisibility"
                                        class="uppercase font-bold text-sm">hide</span>
                                    <span v-else @click="togglePasswordVisibility"
                                        class="uppercase font-bold text-sm">show</span>

                                </div>


                            </div>


                            <div class="text-center mt-6">
                                <button
                                    class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                    type="submit">
                                    Pay To Join Member
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
        <PaymentModal :isVisible="isModalVisible" :name="name" :email="email" :password="password"
            @close="isModalVisible = false" />

    </div>
</template>
<script>
//Import to fetch data
import PaymentModal from "@/components/Modals/PaymentModal.vue";
import axios from "axios";

export default {

    components: {
        PaymentModal,
    },
    data() {
        return {
            name: '', // Bind to the name input
            email: '', // Bind to the email input
            password: '', // Bind to the password input

            passwordVisibility: false,
            isModalVisible: false, // Control modal visibility

            emailExist: null,
        }
    },
    computed: {
        passwordFieldType() {
            return this.passwordVisibility ? "text" : "password";

        }

    },
    methods: {
        async checkEmailExist() {
            try {
                const result = await axios.get(`http://localhost:8080/api/v1/user/check-email?email=${this.email}`)
                console.log(result.data);
                this.emailExist = result.data.data;
            } catch (error) {
                console.error("Error checking email:", error);
                this.emailExist = null; // Reset in case of an error

            }

        },
        togglePasswordVisibility() {
            this.passwordVisibility = !this.passwordVisibility;
        },


        async toPaymentModal() {
            if (this.name == "" || this.email == "" || this.password == "") {
                // console.log("FILL");
                alert("Please fill in all the fields (Name, Email, and Password).");

            } else {
                await this.checkEmailExist(); // Check if the email exists

                if (this.emailExist) {
                    alert("This email is already registered. Please use another email.");
                } else {
                    console.log("Show Modal ");

                    this.isModalVisible = true; // Show modal
                }


            }


        },

    }
}

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