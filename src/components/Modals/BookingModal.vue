<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
        <div class="modal bg-blueGray-200" @click.stop>
            <div class="flex justify-between modalHeader rounded-md text-black font-bold text-2xl uppercase px-4 py-2">
                <h2 class="modal-title">Book Your Slot</h2>
                <span class="close-button" @click="closeModal">&times;</span>
                <!-- <span>{{ time }}</span>
                <span>{{ corutId }}</span> -->
                <!-- <span>{{ facilityId }}</span> -->
            </div>
            <form @submit.prevent="proceedToPayment">
                <div class="modal-body">
                    <div class="input-group">
                        <label class="input-label font-bold">Date</label>
                        <input type="date" v-model="selectedDate" class="input-field" :min="minDateTime" required />
                    </div>

                    <div class="input-group time-selection">
                        <div>
                            <label class="input-label font-bold">Start Time</label>
                            <select v-model="selectedStartTime" class="input-field" required>
                                <option v-for="times in timeOptions" :key="times.timeOptions">{{ times }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="text-red-500 font-bold text-lg uppercase p-1">
                        <span>* Kindly Check The Availability Before ProCEED.</span>
                    </div>

                    <div class="input-group">
                        <div class="flex justify-center">
                            <ButtonPress @click="CheckAvailableCourt(corutId)">Check Available Courts</ButtonPress>
                        </div>
                    </div>
                    <div class="text-red-500 font-bold text-sm uppercase p-1">
                        <span>* Please double-check your booking details.</span>
                        <p>* No refund or cancellation allowed after booking is made.</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <ButtonPress type="submit" class="w-full">Proceed</ButtonPress>
                </div>
            </form>
        </div>
        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
        </div>

    </div>
</template>

<script>
import ButtonPress from "@/components/ButtonPress.vue";
import axios from 'axios';

export default {
    mounted() {
        // Set the default value for selectedStartTime, e.g., first time slot

        this.minDateTime = new Date().toISOString().substr(0, 10); // Set min date to today

    },
    data() {
        return {
            minDateTime: '', // Minimum date and time allowed for booking

            loading: false,

            selectedDate: new Date().toISOString().substr(0, 10),  // Default to current date
            selectedStartTime: '',  // Time slot selected by the user
            timeOptions:
                [
                    '10:00-11:00',
                    '11:00-12:00',
                    '12:00-13:00',
                    '13:00-14:00',
                    '14:00-15:00',
                    '15:00-16:00',
                ],

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
        time: String, // Name passed from the parent component
        corutId: Number,
        facilityId: Number,


    },
    methods: {
        bookCourt(courtId) {
            if (!this.booking.date || !this.booking.timeSlot) {
                alert("Please select a date and time slot.");
                return;
            }

            // Check availability
            axios.post('api/v1/member/bookings/check', {
                courtId,
                date: this.booking.date,
                timeSlot: this.booking.timeSlot
            })
                .then(response => {
                    if (response.data) {
                        console.log(courtId)
                        console.log(this.booking.memberId)
                        console.log(this.booking.date)
                        console.log(this.booking.timeSlot)
                        // Proceed with booking if available
                        axios.post('api/v1/member/bookings/create', {
                            courtId,
                            memberId: this.booking.memberId,
                            date: this.booking.date,
                            timeSlot: this.booking.timeSlot
                        })
                            .then(() => {
                                alert("Court booked successfully!");
                            })
                            .catch(() => {
                                alert("Failed to book the court.");
                            });
                    } else {
                        alert("The slot is not available.");
                    }
                })
                .catch(error => {
                    console.error("Error checking availability:", error);
                });
        },

        closeModal() {
            this.$emit("close");
        },

        proceedToPayment() {
            alert('Proceeding to Payment!' + this.selectedStartTime);

            const routeData = this.$router.resolve({
                name: "Booking",
                query: {
                    date: this.selectedDate,
                    time: this.selectedStartTime,
                    courtID: this.corutId,
                    facilityID: this.facilityId,
                }
            });
            window.location.href = routeData.href;
        },
        async CheckAvailableCourt(courtId) {
            if (!this.selectedStartTime) {
                alert('Please select a valid time slot before checking available courts.');
                return;
            }

            // alert('Checking Court!');
            console.log("Checking" + this.selectedStartTime)
            console.log(this.selectedDate)
            console.log(this.time)
            console.log(courtId)
            console.log(this.selectedStartTime);
            // Check availability
            const result = await axios.post('api/v1/member/bookings/check', {
                courtId,
                date: this.selectedDate,
                timeSlot: this.selectedStartTime
            });
            console.table(result.data)
            if (result.data.data === true) {
                alert("Court: " + courtId + " at " + this.selectedStartTime + ". Still Available");
            } else {
                alert("Court: " + courtId + " at " + this.selectedStartTime + ". Slot Not Available, Pls Select Other Slots");

            }



        }

    },

};
</script>

<style scoped>
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

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-title {
    font-size: 1.5rem;
}

.close-button {
    cursor: pointer;
    font-size: 1.5rem;
}

.input-group {
    margin-bottom: 1rem;
}

.input-label {
    display: block;
    margin-bottom: 0.5rem;
}

.input-field {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.time-selection {
    display: flex;
    justify-content: space-between;
}

.check-courts-button {
    background-color: orange;
    color: white;
    padding: 0.5rem;
    width: 100%;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}






.modal-footer {
    margin-top: 1rem;
}
</style>