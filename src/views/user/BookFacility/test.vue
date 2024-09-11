<template>
    <div class="border-2 border-red-500">
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>

        <div class="container mx-auto px-4 py-8">
            <div class="flex items-center justify-between mb-6">
                <select v-model="selectedFacility" @change="onFacilityChange">
                    <option v-for="facility in facilities" :key="facility.id" :value="facility.id">
                        {{ facility.name }}
                    </option>
                </select>


                <input type="date" v-model="selectedDate" class="px-3 py-2 border rounded-md" />

                <ButtonPress @click="toPaymentModal" class="uppercase font-semibold px-4 py-2">+ Make Booking
                </ButtonPress>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            <th class="border p-2">Court No.</th>
                            <th v-for="court in filteredCourts" :key="court.id" class="border p-2">{{ court.name }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(slot, index) in timeSlots" :key="index">
                            <td class="border p-2">{{ slot }}</td>
                            <td v-for="court in filteredCourts" :key="court.id" class="border p-2 text-center">
                                <div :class="{
                                    'bg-green-500': isBooked(court.id, slot),
                                    'bg-white': !isBooked(court.id, slot),
                                    'cursor-pointer': !isBooked(court.id, slot),
                                }" class="h-8  w-full" @click="bookSlot(court.id, slot)"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <BookingModal :isVisible="isModalVisible" :name="name" :email="email" :password="password"
            @close="isModalVisible = false" />

        <FooterComp class="mt-12"></FooterComp>

    </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'
import FooterComp from "@/components/Footers/Footer.vue";
import ButtonPress from "@/components/ButtonPress.vue";

import BookingModal from "@/components/Modals/BookingModal.vue";

export default {

    data() {
        return {

            name: '', // Bind to the name input
            email: '', // Bind to the email input
            password: '', // Bind to the password input
            isModalVisible: false, // Control modal visibility

            selectedSlots: [],

            selectedFacility: 1,
            selectedDate: new Date().toISOString().substr(0, 10),
            facilities: [
                {
                    id: 1,
                    name: 'Badminton',
                    totalCourts: 6
                },

                {
                    id: 2,
                    name: 'Ping Pong',
                    totalCourts: 2
                },

                {
                    id: 3,
                    name: 'Basketball',
                    totalCourts: 1
                }
            ],
            courts: [
                {
                    id: 1,
                    facilityId: 1,
                    name: 'Court 1'
                },

                {
                    id: 2,
                    facilityId: 1,
                    name: 'Court 2'
                },

                {
                    id: 3,
                    facilityId: 1,
                    name: 'Court 3'
                },

                {
                    id: 4,
                    facilityId: 1,
                    name: 'Court 4'
                },

                {
                    id: 5,
                    facilityId: 1,
                    name: 'Court 5'
                },

                {
                    id: 6,
                    facilityId: 1,
                    name: 'Court 6'
                },

                {
                    id: 7,
                    facilityId: 2,
                    name: 'Table 1'
                },

                {
                    id: 8,
                    facilityId: 2,
                    name: 'Table 2'
                },

                {
                    id: 9,
                    facilityId: 3,
                    name: 'Basketball Court'
                }
            ],
            timeSlots: [
                '10:00-11:00',
                '11:00-12:00',
                '12:00-13:00',
                '13:00-14:00',
                '14:00-15:00',
                '15:00-16:00',
                // Add more time slots here
            ],
            bookings: [
                { courtId: 1, slot: '10:00-11:00', date: '2024-09-08' },
                { courtId: 7, slot: '11:00-12:00', date: '2024-09-08' },
                { courtId: 9, slot: '14:00-15:00', date: '2024-09-08' }

                // Add more existing bookings here
            ],
        };
    },
    computed: {
        filteredCourts() {
            return this.courts.filter(court => court.facilityId === this.selectedFacility);
        }
    },
    methods: {
        //HI
        onFacilityChange() {
            this.selectedSlots = []; // Reset selected slots when facility changes
        },

        // Check if a specific time slot and court are booked
        isBooked(courtId, slot) {
            return this.bookings.some(
                booking => booking.courtId === courtId && booking.slot === slot && booking.date === this.selectedDate
            );
        },
        // Book a time slot if available
        bookSlot(courtId, slot) {
            if (!this.isBooked(courtId, slot)) {
                this.selectedSlots.push({ courtId, slot });
            }
        },
        makeBooking() {
            if (this.selectedDate && this.selectedSlots.length > 0) {
                // Make bookings for the selected slots
                this.selectedSlots.forEach(slot => {
                    this.bookings.push({
                        courtId: slot.courtId,
                        slot: slot.slot,
                        date: this.selectedDate
                    });
                });

                // Reset selected slots
                this.selectedSlots = [];
                alert('Booking successful!');
            } else {
                alert('Please select a date and at least one available slot.');
            }
        },

        toPaymentModal() {

            console.log("Show Modal ");

            this.isModalVisible = true; // Show modal




        },



    },
    components: {
        Navnavbars,
        UserNavbar,
        FooterComp,
        BookingModal,
        ButtonPress,
    }
};
</script>

<style scoped>
table {
    width: 100%;
}

th,
td {
    text-align: center;
}
</style>
<!-- <template>
    <div class="booking-container">
        <div class="facility-selection">
            <label for="facility">Select Facility: </label>
            <select v-model="selectedFacility" @change="onFacilityChange">
                <option v-for="facility in facilities" :key="facility.id" :value="facility.id">
                    {{ facility.name }}
                </option>
            </select>
        </div>

        <div class="date-selection">
            <label for="date">Select Date: </label>
            <input type="date" v-model="selectedDate" />
        </div>

        <div class="slot-table">
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th v-for="court in filteredCourts" :key="court.id">{{ court.name }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(slot, index) in timeSlots" :key="index">
                        <td>{{ slot }}</td>
                        <td v-for="court in filteredCourts" :key="court.id">
                            <div :class="{
                                'booked': isBooked(court.id, slot),
                            }" class="time-slot" @click="bookSlot(court.id, slot)">
                                {{ isBooked(court.id, slot) ? 'Booked' : 'Available' }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <button class="make-booking" @click="makeBooking">+ Make Booking</button>
    </div>
</template>


<script>
export default {
    data() {
        return {
            facilities: [
                {
                    id: 1,
                    name: 'Badminton',
                    totalCourts: 6
                },

                {
                    id: 2,
                    name: 'Ping Pong',
                    totalCourts: 2
                },

                {
                    id: 3,
                    name: 'Basketball',
                    totalCourts: 1
                }
            ],
            courts: [
                {
                    id: 1,
                    facilityId: 1,
                    name: 'Court 1'
                },

                {
                    id: 2,
                    facilityId: 1,
                    name: 'Court 2'
                },

                {
                    id: 3,
                    facilityId: 1,
                    name: 'Court 3'
                },

                {
                    id: 4,
                    facilityId: 1,
                    name: 'Court 4'
                },

                {
                    id: 5,
                    facilityId: 1,
                    name: 'Court 5'
                },

                {
                    id: 6,
                    facilityId: 1,
                    name: 'Court 6'
                },

                {
                    id: 7,
                    facilityId: 2,
                    name: 'Table 1'
                },

                {
                    id: 8,
                    facilityId: 2,
                    name: 'Table 2'
                },

                {
                    id: 9,
                    facilityId: 3,
                    name: 'Basketball Court'
                }
            ],
            bookings: [
                { courtId: 1, slot: '10:00-11:00', date: '2024-09-10' },
                { courtId: 7, slot: '11:00-12:00', date: '2024-09-10' },
                { courtId: 9, slot: '14:00-15:00', date: '2024-09-10' }

            ],
            selectedFacility: 1,
            selectedDate: null,
            selectedSlots: [],

            timeSlots:
                [
                    '10:00-11:00',
                    '11:00-12:00',
                    '12:00-13:00',
                    '13:00-14:00',
                    '14:00-15:00',
                    '15:00-16:00'
                ]
        };
    },
    computed: {
        filteredCourts() {
            return this.courts.filter(court => court.facilityId === this.selectedFacility);
        }
    },
    methods: {
        onFacilityChange() {
            this.selectedSlots = []; // Reset selected slots when facility changes
        },
        isBooked(courtId, slot) {
            return this.bookings.some(
                booking => booking.courtId === courtId && booking.slot === slot && booking.date === this.selectedDate
            );
        },
        bookSlot(courtId, slot) {
            if (!this.isBooked(courtId, slot)) {
                this.selectedSlots.push({ courtId, slot });
            }
        },
        makeBooking() {
            if (this.selectedDate && this.selectedSlots.length > 0) {
                // Make bookings for the selected slots
                this.selectedSlots.forEach(slot => {
                    this.bookings.push({
                        courtId: slot.courtId,
                        slot: slot.slot,
                        date: this.selectedDate
                    });
                });

                // Reset selected slots
                this.selectedSlots = [];
                alert('Booking successful!');
            } else {
                alert('Please select a date and at least one available slot.');
            }
        }
    }
};
</script>

<style scoped>
.booking-container {
    padding: 20px;
}

.facility-selection,
.date-selection {
    margin-bottom: 20px;
}

.slot-table {
    margin-bottom: 20px;
}

.slot-table table {
    width: 100%;
    border-collapse: collapse;
}

.slot-table th,
.slot-table td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ccc;
}

.time-slot {
    padding: 10px;
    cursor: pointer;
}

.booked {
    background-color: #4caf50;
    color: white;
}

.time-slot:hover {
    background-color: #ddd;
}

.make-booking {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.make-booking:hover {
    background-color: #218838;
}
</style> -->
