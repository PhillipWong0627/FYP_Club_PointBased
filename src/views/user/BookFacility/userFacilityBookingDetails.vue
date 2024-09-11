<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>
        <div class="container mx-auto my-5 p-5 max-w-2xl bg-white rounded-lg shadow-md">
            <!-- Back Button -->
            <div class="mb-5 flex">
                <button @click="goBack" class="text-gray-500 hover:text-black">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <span class="uppercase text-2xl font-bold pl-5">Booking Details</span>
            </div>

            <!-- Court Image -->
            <div class="mb-5 " style="height: 200px;">
                <img src="@/assets/facility/badmintonCourt.jpg" alt="Court Image"
                    class="w-full h-full object-cover rounded-md" />
            </div>

            <!-- Booking Summary -->
            <h2 class="text-2xl font-bold mb-3">Badminton Rubber Flooring</h2>
            <div class="mb-5 text-sm">
                <p><strong>Date: </strong>8th Sep 2024</p>
                <p><strong>Start Time: </strong>10:00 PM</p>
                <p><strong>End Time: </strong>11:00 PM</p>
                <p><strong>Court: </strong>Court 9</p>
            </div>

            <!-- Cost Summary -->
            <h3 class="text-lg font-semibold mb-2">Booking Cost Breakdown</h3>
            <table class="w-full mb-5 text-sm">
                <tr>
                    <td>Booking Cost</td>
                    <td class="text-right">RM24.00</td>
                </tr>
                <tr>
                    <td>Merchant Fee (0%)</td>
                    <td class="text-right">RM0.00</td>
                </tr>
                <tr>
                    <td>GST (0%)</td>
                    <td class="text-right">RM0.00</td>
                </tr>
                <tr class="font-bold">
                    <td>Total Amount</td>
                    <td class="text-right">RM {{ totalAmount }}</td>
                </tr>
            </table>

            <!-- Important Notes -->
            <div class="text-sm mb-5">
                <p class="text-red-500">• Please double check your booking details.</p>
                <p class="text-red-500">• No refund or cancellation allowed after booking is made.</p>
            </div>

            <!-- User Details -->
            <h3 class="text-lg font-semibold mb-2">User Details</h3>
            <form @submit.prevent="payNow">
                <div class="mb-5 space-y-3">
                    <input type="text" v-model="userName" placeholder="Enter name" required
                        class="w-full px-3 py-2 border rounded-md" />
                    <div class="flex space-x-2">
                        <select v-model="phoneCode" class="px-3 py-2 border rounded-md">
                            <option value="+60">+60</option>
                            <!-- Add other country codes if needed -->
                        </select>
                        <input type="text" v-model="phoneNumber" placeholder="Phone number" required
                            class="w-full px-3 py-2 border rounded-md" />
                    </div>
                    <input type="email" v-model="email" placeholder="Email address" required
                        class="w-full px-3 py-2 border rounded-md" />
                </div>
                <!-- Payment Summary -->
                <div class="font-bold text-lg flex justify-between items-center">
                    <span>Total Amount</span>
                    <span class="text-red-500">RM {{ totalAmount }}</span>
                </div>

                <!-- Pay Now Button -->
                <!-- <button type="submit"
                    class="mt-5 w-full bg-orange-500 text-white py-3 rounded-md font-bold hover:bg-orange-600">
                    Pay Now
                </button> -->
                <ButtonPress type="submit" class="mt-5 w-full pt-3 pb-3 uppercase font-bold text-base">Pay Now
                </ButtonPress>
            </form>
        </div>
        <FooterComp class="mt-12"></FooterComp>
    </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import FooterComp from "@/components/Footers/Footer.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'
import ButtonPress from "@/components/ButtonPress.vue";

export default {
    components: {
        Navnavbars,
        FooterComp,
        UserNavbar,
        ButtonPress
    },
    methods: {
        goBack() {
            // Logic to go back to previous page
            window.history.back();
        },

        payNow() {
            // Navigating
            // Push to the Live Page
            const routeData = this.$router.resolve({
                name: "BookingPayment",
                query: {
                    Username: this.userName,
                    PhoneNumber: this.phoneNumber,
                    Email: this.email,
                    TotalAmount: this.totalAmount,
                },
            });
            window.location.href = routeData.href;
        },
    },
    data() {
        return {
            userName: '',
            phoneCode: '+60',
            phoneNumber: '',
            email: '',
            totalAmount: "24.00"


        }
    },
}


</script>

<style scoped>
.booking-details-container {
    max-width: 40rem;
    margin: auto;
}
</style>
