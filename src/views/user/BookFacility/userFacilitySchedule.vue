<template>
  <div class="">
    <Navnavbars></Navnavbars>
    <UserNavbar></UserNavbar>

    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-6">
        <button class="make-booking" @click="makeBooking">+ Make Booking</button>


        <input type="date" v-model="selectedDate" class="px-3 py-2 border rounded-md" />

        <ButtonPress @click="toPaymentModal" class="uppercase font-semibold px-4 py-2">+ Make Booking</ButtonPress>
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
              <td class="borde-2 p-2">{{ slot }}</td>
              <td v-for="court in filteredCourts" :key="court.id" class="border p-2 text-center">
                <div :class="{
                  'bg-green-500': isBooked(court.id, slot),
                  'bg-white': !isBooked(court.id, slot),
                  'cursor-pointer': !isBooked(court.id, slot),
                }" class="h-8  w-full S" @click="toPaymentModal(court.id, slot)">
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
    <FacilityList></FacilityList>

    <BookingModal :isVisible="isModalVisible" :time="time" @close="isModalVisible = false" />

    <FooterComp class="mt-12"></FooterComp>

  </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'
import FooterComp from "@/components/Footers/Footer.vue";
import ButtonPress from "@/components/ButtonPress.vue";

import BookingModal from "@/components/Modals/BookingModal.vue";
import FacilityList from "@/components/UserMainPage/FacilityList.vue";

export default {

  data() {
    return {

      time: '', // Bind to the name input
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

    toPaymentModal(courtId, slot) {

      console.log("Show Modal ");
      console.log(courtId);
      console.log(slot);

      this.time = slot; // Pass the time slot as a prop to the modal

      this.isModalVisible = true; // Show modal




    },



  },
  components: {
    Navnavbars,
    UserNavbar,
    FooterComp,
    BookingModal,
    ButtonPress,
    FacilityList,
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