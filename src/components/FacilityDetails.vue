<template>
    <div>
        {{ faID }}
        <h2>Available Courts</h2>
        <div>
            <label>Select Date:</label>
            <input type="date" v-model="booking.date" :min="minDateTime" />
        </div>
        <div>
            <label>Select Time Slot:</label>
            <select v-model="booking.timeSlot">
                <option value="">Select a slot</option>
                <option value="10:00-11:00">10:00-11:00</option>
                <option value="11:00-12:00">11:00-12:00</option>
                <option value="12:00-13:00">12:00-13:00</option>
                <!-- Add more slots as necessary -->
            </select>
        </div>
        <div>
            <div v-for="court in courts" :key="court.courtId" class="court-item">
                <p>{{ court.courtNumber }} - Available: {{ court.available }}</p>
                <button @click="bookCourt(court.courtId)">Book This Court</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            courts: [],
            booking: {
                courtId: null,
                memberId: 1, // Assume logged-in user ID
                date: '',
                timeSlot: ''
            },

            faID: this.$route.query.facilityID,

            //HI
            minDateTime: '', // Minimum date and time allowed for booking

        };
    },
    mounted() {
        const facilityId = this.$route.query.facilityID;
        this.getCourtsByFacility(facilityId);

        this.minDateTime = new Date().toISOString().substr(0, 10); // Set min date to today

    },
    methods: {
        getCourtsByFacility(facilityId) {
            axios.get(`api/v1/admin/facilities/${facilityId}/courts`)
                .then(response => {
                    this.courts = response.data.data;
                })
                .catch(error => {
                    console.error("Error fetching courts:", error);
                });
        },
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
                    if (response.data.code === 0) {
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
        }
    }
};
</script>

<style scoped>
.court-item {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
}
</style>