<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
        <div class="modal bg-blueGray-200" @click.stop>
            <div class="flex justify-between modalHeader rounded-md text-black font-bold text-2xl uppercase px-4 py-2">
                <h2 class="modal-title">Book Your Slot</h2>
                <span class="close-button" @click="closeModal">&times;</span>
                <span>{{ name }}</span>
            </div>
            <form @submit.prevent="proceedToPayment">
                <div class="modal-body">
                    <!-- Date Selection -->
                    <div class="input-group">
                        <label class="input-label">Date</label>
                        <input type="date" v-model="selectedDate" class="input-field" required />
                    </div>

                    <!-- Start Time and AM/PM Selection -->
                    <div class="input-group time-selection">
                        <div>
                            <label class="input-label">Start Time</label>
                            <select v-model="selectedStartTime" class="input-field" required>
                                <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
                            </select>
                        </div>
                    </div>
                    <!-- Fetching Available Court -->
                    <div class="input-group">
                        <div class="flex justify-center">
                            <ButtonPress @click="CheckAvailableCourt()">Check Available Courts</ButtonPress>
                        </div>
                    </div>


                    <!-- Warnings -->
                    <div class="text-red-500 font-bold uppercase p-1">
                        <span>* Please double-check your booking details.</span>
                        <span>* No refund or cancellation allowed after booking is made.</span>
                    </div>
                </div>

                <!-- Proceed Button -->
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

export default {
    data() {
        return {
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
                ],  // Time options


        };
    },
    mounted() {
        // Set the default value for selectedStartTime, e.g., first time slot
        this.selectedStartTime = this.timeOptions[0]; // Set the first option as default
    },

    watch: {
        isVisible(newValue) {
            if (newValue) {
                this.setDefaultStartTime(); // Set the default value when modal opens
            }
        }
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
        password: String, // Email passed from the parent component



    },
    methods: {
        closeModal() {
            this.$emit("close");
        },

        setDefaultStartTime() {
            if (this.name && this.timeOptions.includes(this.name)) {
                this.selectedStartTime = this.name; // Set the start time to the passed name value
            } else {
                this.selectedStartTime = this.timeOptions[0]; // Fallback to first time slot if no match
            }
        },


        proceedToPayment() {
            alert('Proceeding to Payment!' + this.selectedStartTime);

            const routeData = this.$router.resolve({
                name: "Booking",
            });
            window.location.href = routeData.href;
        },
        CheckAvailableCourt() {
            alert('Checking Court!');

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