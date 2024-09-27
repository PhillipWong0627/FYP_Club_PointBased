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

            <div class="text-xl font-bold mb-5">
                <p class="text-red-500">• This is your order details please save a copy.</p>
            </div>


            <!-- Order Details -->
            <h2 class="uppercase text-2xl font-bold pb-2">Order Details</h2>
            <div class="mb-5 text-sm flex flex-col  bg-blueGray-200 rounded-md ">
                <div class="flex justify-between pb-3 p-2">
                    <span>Booking ID</span>
                    <span>Booking {{ orderId }}</span>
                </div>
                <div class="flex justify-between pb-3 p-2">
                    <span>Payment Description</span>
                    <span>Timing:{{ bookingData.date }} {{ bookingData.timeSlot }} Court: {{ courtId }} </span>
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
                    <span>Username</span>
                    <span> {{ userName }}</span>
                </div>

                <div class="flex justify-between pb-3 p-2">
                    <span>Mobile No</span>
                    <span>{{ phoneNumber }} </span>

                </div>

            </div>

            <ButtonPress @click="printReceipt()" type="submit"
                class="mt-5 w-full pt-3 pb-3 uppercase font-bold text-base">
                Print Receipts
            </ButtonPress>
            <ButtonPress @click="backTomain()" class="mt-5 w-full pt-3 pb-3 uppercase font-bold text-base">
                Home Page
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
import axios from "axios";

export default {
    mounted() {
        this.fetchBookingInfo();
    },
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
            totalAmount: this.$route.query.TotalAmount,

            loading: false,
            payment: true,

            orderId: this.$route.query.BookingID,
            bookingData: [],
            courtId: '',

        }
    },
    methods: {
        async fetchBookingInfo() {
            try {
                const result = await axios.get(`/api/v1/member/bookings/findBookingById/${this.orderId}`)
                console.table(result);
                this.bookingData = result.data.data
                this.courtId = result.data.data.court.courtId; // Assign courtId from booking data

            } catch (error) {
                alert("Error Fetching")
            }
        },
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
        printReceipt() {
            const receiptContent = `
                <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                        }
                        .receipt-container {
                            max-width: 600px;
                            margin: auto;
                            padding: 20px;
                            border: 1px solid #ddd;
                            border-radius: 5px;
                        }
                        h2 {
                            text-align: center;
                        }
                        .receipt-details {
                            margin-top: 20px;
                        }
                        .receipt-details div {
                            margin-bottom: 10px;
                        }
                    </style>
                </head>
                <body>
                    <div class="receipt-container">
                        <h2>Receipt</h2>
                        <div class="receipt-details">
                            <div><strong>Order ID:</strong> ORDER ${this.orderId}</div>
                            <div><strong>Username:</strong> ${this.userName}</div>
                            <div><strong>Mobile No:</strong> ${this.phoneNumber}</div>
                            <div><strong>Payment Description:</strong> Timing: ${this.bookingData.date} ${this.bookingData.timeSlot}, Court: ${this.courtId}</div>
                            <div><strong>Total Due:</strong> RM ${this.totalAmount}</div>
                        </div>
                    </div>
                </body>
                </html>
            `;

            // Open a new window
            const printWindow = window.open('', '', 'width=800,height=600');
            printWindow.document.write(receiptContent);
            printWindow.document.close(); // Close the document for writing

            // Trigger the print dialog
            printWindow.focus();
            printWindow.print();

            // Close the window after printing
            printWindow.onafterprint = () => {
                printWindow.close();

                // Navigate to the main page
                this.$router.push('/');
            };

        },
        backTomain() {
            this.$router.push('/');

        }
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
