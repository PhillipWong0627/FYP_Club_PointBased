<template>
  <!-- Header -->
  <div class="relative bg-emerald-600 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <div class="flex flex-wrap">
          <div class=" w-full lg:w-6/12 xl:w-3/12 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h3 class="text-blueGray-400 uppercase font-bold text-xs">Bookings per Facility</h3>
                    <ul>
                      <li class="font-semibold text-lg text-blueGray-700"
                        v-for="(count, facilityName) in bookingsPerFacility" :key="facilityName">
                        {{ facilityName }}: {{ count }} bookings
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class=" w-full lg:w-6/12 xl:w-3/12 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h3 class="text-blueGray-400 uppercase font-bold text-xs">Revenue by Facility</h3>
                    <ul>
                      <li class="font-semibold text-lg text-blueGray-700"
                        v-for="(revenue, facilityName) in revenueByFacility" :key="facilityName">
                        {{ facilityName }}: RM {{ revenue }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class=" w-full lg:w-6/12 xl:w-3/12 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap">
                  <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h3 class="text-blueGray-400 uppercase font-bold text-xs">Peak Hours</h3>
                    <ul>
                      <li class="font-semibold text-lg text-blueGray-700" v-for="(peakHours, facilityName) in peakHoursByFacility" :key="facilityName">
                        {{ facilityName }}: Peak hour: {{ peakHours }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats statSubtitle="TRAFFIC" statTitle="350,897" statArrow="up" statPercent="3.48"
              statPercentColor="text-emerald-500" statDescripiron="Since last month" statIconName="far fa-chart-bar"
              statIconColor="bg-red-500" />
          </div> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import CardStats from "@/components/Cards/CardStats.vue";
import axios from 'axios';

export default {
  data() {
    return {
      bookingsPerFacility: {},
      revenueByFacility: {},
      peakHoursByFacility: {},
    };
  },
  mounted() {
    this.fetchBookingData();
  },

  components: {
    // CardStats,
  },
  methods: {
    async fetchBookingData() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/member/bookings/getBooking-List');
        const bookings = response.data.data;

        // Initialize temporary storage for calculations
        const facilityBookingCounts = {};
        const facilityRevenue = {};
        const facilityPeakHours = {};

        bookings.forEach((booking) => {
          const facilityId = booking.facilityId;
          const timeSlot = booking.timeSlot;
          const court = booking.court;
          console.log(court);
          const facilityName = `Facility ${facilityId}`;

          // Booking count per facility
          if (!facilityBookingCounts[facilityName]) {
            facilityBookingCounts[facilityName] = 0;
          }
          facilityBookingCounts[facilityName]++;

          // Revenue calculation (Assuming price per hour is stored in the court or fetched from somewhere else)
          const pricePerHour = this.getPricePerHour(facilityId); // Placeholder function
          if (!facilityRevenue[facilityName]) {
            facilityRevenue[facilityName] = 0;
          }
          facilityRevenue[facilityName] += pricePerHour;

          // Peak hour analysis
          const hour = this.extractHourFromTimeSlot(timeSlot);
          if (!facilityPeakHours[facilityName]) {
            facilityPeakHours[facilityName] = {};
          }
          if (!facilityPeakHours[facilityName][hour]) {
            facilityPeakHours[facilityName][hour] = 0;
          }
          facilityPeakHours[facilityName][hour]++;
        });

        // Set the computed data for display
        this.bookingsPerFacility = facilityBookingCounts;
        this.revenueByFacility = facilityRevenue;

        // Compute peak hours for each facility
        for (const facilityName in facilityPeakHours) {
          const peakHour = this.getPeakHour(facilityPeakHours[facilityName]);
          this.peakHoursByFacility[facilityName] = peakHour;
        }
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    },

    // Placeholder to get price per hour of each facility
    getPricePerHour(facilityId) {
      // You can replace this with the actual logic to fetch facility prices
      const priceMap = {
        1: 100, // Basketball court
        2: 150, // Tennis court
        3: 120, // Another court
      };
      return priceMap[facilityId] || 100; // Default price if unknown
    },

    // Extract hour from time slot (e.g., "10:00-11:00")
    extractHourFromTimeSlot(timeSlot) {
      return timeSlot.split('-')[0]; // Get starting hour
    },

    // Find the peak hour by checking the highest bookings
    getPeakHour(hourCounts) {
      let maxHour = null;
      let maxCount = 0;

      for (const hour in hourCounts) {
        if (hourCounts[hour] > maxCount) {
          maxHour = hour;
          maxCount = hourCounts[hour];
        }
      }

      return maxHour;
    },
  }
};
</script>
