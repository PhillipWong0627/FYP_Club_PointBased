<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>
        <div style="height: 600px;"
            class="flex flex-col justify-between container mx-auto my-5 p-5 max-w-2xl bg-white rounded-lg shadow-md ">
            <!-- Back Button -->
            <div class="mb-5 flex">
                <button @click="goBack" class="text-gray-500 hover:text-black">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <span class="uppercase text-2xl font-bold pl-5">Payment Details</span>
            </div>



            <!-- Order Details -->
            <h2 class="uppercase text-2xl font-bold pb-2">Order Details</h2>
            <div class="mb-5 text-sm flex flex-col  bg-blueGray-200 rounded-md rounded-md">
                <div class="flex justify-between pb-3 p-2">
                    <span>Order ID</span>
                    <span>ORDER 1</span>
                </div>
                <div class="flex justify-between pb-3 p-2">
                    <span>Payment Description</span>
                    <span>Timing:2024-09-09 18:00:00-2024-09-09 20:00:00 Court:C4 </span>
                </div>
                <div class="flex justify-between pb-3 p-2">
                    <span>Total Due</span>
                    <span class="text-2xl font-bold">RM {{ totalAmount }}</span>
                </div>
            </div>

            <!-- Payer Details -->
            <h2 class="uppercase text-2xl font-bold pb-2 ">Payer Details</h2>
            <div class="mb-5 text-sm flex flex-col  bg-blueGray-200 rounded-md">
                <div class="flex justify-between pb-3 p-2">
                    <span>Email</span>
                    <span>{{ email }}</span>
                </div>
                <div class="flex justify-between pb-3 p-2">
                    <span>Username</span>
                    <span> {{ userName }}</span>
                </div>

                <div class="flex justify-between pb-3 p-2">
                    <span>Mobile No</span>
                    <span>{{ phoneNumber }} </span>

                </div>

            </div>

            <ButtonPress @click="payNow" type="submit" class="mt-5 w-full pt-3 pb-3 uppercase font-bold text-base">
                Pay Now
            </ButtonPress>
        </div>
        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
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
    data() {
        return {
            userName: this.$route.query.Username,
            phoneNumber: '+60' + this.$route.query.PhoneNumber,
            email: this.$route.query.Email,
            totalAmount: this.$route.query.TotalAmount,

            loading: false,
            payment: true,

        }
    },
    methods: {
        goBack() {
            // Logic to go back to previous page
            window.history.back();
        },
        payNow() {
            this.loading = true; // Show loading indicator

            if (this.payment) {
                setTimeout(() => {
                    this.loading = false;
                }, 3000)
                // Payment logic
                alert("Payment process initiated.");
                //Create OrderID... PaymentID?, History (For User)

            } else {
                alert("Payment Failed.");
            }



        },
    },

}


</script>

<style scoped>
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
