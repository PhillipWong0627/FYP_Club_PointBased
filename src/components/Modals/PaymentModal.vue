<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">


        <div class="modal bg-blueGray-200" @click.stop>
            <div class="h-[450px] flex items-center justify-center" v-if="loading">
                <span class="font-bold text-2xl text-black"> Loading...</span>
                <img class="pl-5" src="@/assets/pandaLoading.gif" alt="panda loading"
                    style="width: 108px; height: 108px" />
            </div>
            <div class="flex justify-between  rounded-md text-black font-bold text-2xl uppercase py-2">
                <h2>Complete Your Purchase</h2>
                <span class="close cursor-pointer" @click="closeModal">&times;</span>
            </div>
            <form @submit.prevent="registerUser">
                <div class="flex flex-col">
                    <!-- Mobile Number Input -->
                    <div class="mb-4">
                        <label class="block text-black text-2xl uppercase mb-2">Mobile Number</label>
                        <div class="flex">
                            <select class="border rounded-l-lg p-2 bg-gray-100 text-gray-600">
                                <option value="+60">MY +60</option>
                            </select>
                            <input v-model="mobileNumber" type="tel" placeholder="Mobile Number" required
                                pattern="[0-9]{9}" class="border rounded-r-lg p-2 w-full" />

                        </div>
                        <small>Format: 122504088</small>

                    </div>

                    <!-- 6-Digit PIN Input -->
                    <div class="mb-6">
                        <label class="block text-black text-2xl uppercase mb-2">Enter Your PIN</label>
                        <div class="flex justify-between">
                            <input type="password" required class="border" maxlength="6" pattern="\d{6}"
                                placeholder="Your Pin">
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <ButtonPress type="submit" class="">Pay</ButtonPress>


                    <!-- Information Message -->
                    <p class="text-sm text-gray-500 mt-4 text-center">
                        Don't worry, rest assured that your data are kept secure and confidential.
                    </p>

                </div>
            </form>

            <div class="flex justify-between border-2 rounded-md p-2 text-sm text-gray-500">
                <div class="flex flex-col">
                    <span class="text-sm text-gray-500">Monthly Charge</span>
                    <span>Billing strats: {{ formattedDate }}</span>
                </div>
                <div>
                    RM 30/mo
                </div>


            </div>
            <!-- Display the name and email -->
            <div class="mb-4">
                <label class="block text-black text-xl uppercase mb-2">Name</label>
                <div class="border rounded-md">
                    <span class="text-sm text-gray-500 ">{{ name }}</span>
                </div>
                <label class="block text-black text-xl uppercase mb-2">Email</label>
                <div class="border rounded-md">
                    <span class="text-sm text-gray-500 ">{{ email }}</span>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
import ButtonPress from "@/components/ButtonPress.vue";
import { addMember } from '@/service/apiProvider.js';


export default {
    data() {
        return {
            mobileNumber: '', // To store the mobile number
            pin: ['', '', '', '', '', ''], // To store the 6-digit pin
            contactWithCountry: "",
            loading: false,
            today: new Date(),



        };
    },
    components: {
        ButtonPress
    },
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
        name: String, // Name passed from the parent component
        email: String, // Email passed from the parent component
        password: String // Email passed from the parent component



    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        async registerUser() {
            this.loading = true; // Show loading indicator

            this.contactWithCountry = "60" + this.mobileNumber
            console.log(this.contactWithCountry);
            try {

                const paymentAmount = 30;  // Example payment amount
                // console.log("Processing payment of RM", paymentAmount);

                const result = await addMember(
                    this.email,
                    this.name,
                    this.password,
                    this.contactWithCountry,
                    paymentAmount,
                );

                console.log(result)
                if (result) {
                    setTimeout(() => {
                        this.loading = false;
                    }, 3000)

                    alert("Registration successful! You earned " + paymentAmount + " points.");


                    const routeData = this.$router.resolve({
                        name: "Login",

                    });
                    window.location.href = routeData.href;


                } else {
                    alert("Email Exist Please Try Another Email~")
                }
            } catch (error) {
                console.error(error);
                // Handle error here
            } finally {
                this.loading = false; // Hide loading indicator
            }
        },
    },
    computed: {
        isPinFilled() {
            return this.pin.every(digit => digit !== '');
        },
        formattedDate() {
            // Format the date as "Oct 5, 2024"
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return this.today.toLocaleDateString('en-US', options);
        }

    }
};
</script>

<style scoped>
.modalHeader {
    background-color: rgba(0, 0, 0, 0.7);
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    /* background: white; */
    /* background-color: #191919; */
    height: 90vh;
    padding: 20px;
    border-radius: 8px;
    width: 600px;
    max-width: 100%;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.spinner {
    border: 16px solid #f3f3f3;
    /* Light grey */
    border-top: 16px solid #3498db;
    /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>