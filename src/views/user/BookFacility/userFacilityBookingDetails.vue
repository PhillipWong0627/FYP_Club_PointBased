<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>
        <Toast ref="toast" />
        <div class="h-[450px] flex items-center justify-center" v-if="loading">
            <span class="font-bold text-2xl text-black"> Loading...</span>
            <img class="pl-5" src="@/assets/pandaLoading.gif" alt="panda loading" style="width: 108px; height: 108px" />
        </div>

        <div class="container mx-auto my-5 p-5 max-w-2xl bg-white rounded-lg shadow-md">
            <!-- Back Button -->
            <div class="mb-5 flex">
                <button @click="goBack" class="text-gray-500 hover:text-black">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <span class="uppercase text-2xl font-bold pl-5">Booking Details</span>
                {{ selectedFacilityID }}
            </div>

            <!-- Court Image -->
            <div class="mb-5 " style="height: 200px;">
                <!-- <img src="@/assets/facility/badmintonCourt.jpg" alt="Court Image"
                    class="w-full h-full object-cover rounded-md" /> -->
                <img :src="facilityData.facilityImage" alt="Court Image"
                    class="w-full h-full object-cover rounded-md" />
            </div>

            <!-- Booking Summary -->
            <h2 class="text-2xl font-bold mb-3"> {{ facilityData.facilityName }} </h2>
            <div class="mb-5 text-sm">
                <p><strong>Date: </strong>{{ selectedDate }}</p>
                <p><strong>Time: </strong> {{ selectedTime }}</p>
                <p><strong>Court: </strong> Court {{ selectedCourt }}</p>
            </div>
            <!-- Cost Summary -->
            <h3 class="text-lg font-semibold mb-2">Booking Cost Breakdown</h3>
            <table class="w-full mb-5 text-sm">
                <tr>
                    <td>Booking Cost</td>
                    <td class="text-right">RM {{ facilityData.pricePerHour }}</td>
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
                    <td class="text-right">RM {{ facilityData.pricePerHour }}</td>
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
                    <!-- <input type="email" v-model="email" placeholder="Email address" required
                        class="w-full px-3 py-2 border rounded-md" /> -->
                    <input type="number" v-model="userAmount" placeholder="Enter Amount" required min="0"
                        class="w-full px-3 py-2 border rounded-md" />
                </div>
                <!-- Payment Summary -->
                <div class="font-bold text-lg flex justify-between items-center">
                    <span>Total Amount</span>
                    <span class="text-red-500">RM {{ facilityData.pricePerHour }}</span>
                </div>

                <!-- Pay Now Button -->
                <!-- <button type="submit"
                    class="mt-5 w-full bg-orange-500 text-white py-3 rounded-md font-bold hover:bg-orange-600">
                    Pay Now
                </button> -->
                <ButtonPress type="submit" class="mt-5 w-full pt-3 pb-3 uppercase font-bold text-base">
                    Pay and Book Now
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
import axios from "axios";
import Toast from '@/components/Toast.vue'; // Make sure the path is correct

export default {
    mounted() {
        this.fetchFacilityData();

    },
    components: {
        Navnavbars,
        FooterComp,
        UserNavbar,
        ButtonPress,
        Toast,
    },
    data() {
        return {
            userName: '',
            phoneCode: '+60',
            phoneNumber: '',
            email: '',

            selectedDate: this.$route.query.date,
            selectedTime: this.$route.query.time,
            selectedCourt: this.$route.query.courtID,
            selectedFacilityID: this.$route.query.facilityID,

            facilityData: [],
            userAmount: null,
            memberId: localStorage.getItem('memberID'),

            pointsJson: [],
            loading: false,

            bookingJson: [],
        }
    },
    methods: {
        //Fetching 
        async fetchFacilityData() {
            const result = await axios.get(`/api/v1/admin/getById/${this.selectedFacilityID}`);
            // console.log(result);
            this.facilityData = result.data.data

            // console.log("DATA");
            // console.table(this.courtByFacilityId);
        },
        goBack() {
            // Logic to go back to previous page
            window.history.back();
        },

        async payNow() {
            if (this.facilityData.pricePerHour > this.userAmount) {
                // console.log("HALO")
                alert("Not Enought Money");
            } else {
                try {
                    console.log(this.selectedCourt);
                    console.log(this.memberId);
                    console.log(this.selectedDate);
                    console.log(this.selectedTime);
                    console.log(this.selectedFacilityID);


                    const result = await axios.post('api/v1/member/bookings/create', {
                        courtId: this.selectedCourt,
                        memberId: this.memberId,
                        date: this.selectedDate,
                        timeSlot: this.selectedTime,
                        facilityID: this.selectedFacilityID,
                    });
                    if (result.data.code === 0) {
                        console.log("THIS IS RESULT")
                        console.table(result)
                        console.table(result.data)

                        this.bookingJson = result.data.data;
                        console.log("FK YOU")
                        const bookingId = this.bookingJson.bookingId;
                        console.log("bookingId")

                        console.log('ID:' + this.memberId)

                        alert("Court booked successfully!");
                        this.$refs.toast.showToast("Court booked successfully!");

                        this.addPoints();
                        this.loading = true

                        if (this.memberId === "" || this.memberId === null) {
                            const routeData = this.$router.resolve({
                                name: "BookingPayment",
                                query: {
                                    Username: this.userName,
                                    PhoneNumber: this.phoneNumber,
                                    TotalAmount: this.facilityData.pricePerHour,
                                    BookingID: bookingId,
                                },
                            });
                            window.location.href = routeData.href;

                        } else {
                            setTimeout(() => {
                                const routeData = this.$router.resolve({
                                    name: "main",
                                });
                                window.location.href = routeData.href;
                            }, 3000);
                        }



                    } else {
                        alert("The Slot Is Not Available.");
                        const routeData = this.$router.resolve({
                            name: "facilities",
                        });
                        window.location.href = routeData.href;


                    }
                    console.log(result);

                } catch (error) {
                    console.error("Error checking availability:", error);

                } finally {
                    this.loading = false;
                }
            }


        },
        async addPoints() {
            const memberId = localStorage.getItem('memberID') // Get the logged-in member's ID from localStorage
            const checkMemberId = (!memberId || memberId.trim() === '') ? 1 : memberId;
            this.pointsJson = this.facilityData.pricePerHour;
            console.log(this.pointsJosn);
            console.log(this.facilityData.pricePerHour);
            try {
                const response = await axios.post(`/api/v1/user/${checkMemberId}/add-points`, {
                    points: this.facilityData.pricePerHour,
                });
                console.log(response);
                if (response.status === 200) {
                    // Assuming you get updated points back from the API
                    // this.userAmount = response.data.points;
                    alert("Points added successfully!");
                }
            } catch (error) {
                console.error("Error adding points:", error);
            }

        },

        // gogogo() {
        //     //             Navigating
        //     // Push to the Live Page
        //     const routeData = this.$router.resolve({
        //         name: "BookingPayment",
        //         query: {
        //             Username: this.userName,
        //             PhoneNumber: this.phoneNumber,
        //             Email: this.email,
        //             TotalAmount: this.totalAmount,
        //         },
        //     });
        //     window.location.href = routeData.href;

        // },
    },

}


</script>

<style scoped>
.booking-details-container {
    max-width: 40rem;
    margin: auto;
}
</style>
