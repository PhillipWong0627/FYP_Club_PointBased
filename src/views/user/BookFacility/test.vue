<template>
    <div>
        <h1>Facilities</h1>
        <div class="facility-cards">
            <div v-for="facility in facilities" :key="facility.facilityId" class="facility-card">
                <h2>{{ facility.facilityName }}</h2>
                <p>Total Courts: {{ facility.totalCourts }}</p>
                <p>Location: {{ facility.location }}</p>
                <button @click="goToFacility(facility.facilityID)">Book Now</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            facilities: []
        };
    },
    mounted() {
        this.getFacilities();
    },
    methods: {
        getFacilities() {
            axios.get('api/v1/admin/getFacilities')
                .then(response => {
                    this.facilities = response.data.data;
                    console.log(this.facilities)
                })
                .catch(error => {
                    console.error("Error fetching facilities:", error);
                });
        },
        goToFacility(facilityId) {
            console.log(facilityId);
            const routeData = this.$router.resolve({
                name: "FacilityDetails",
                query: {
                    facilityID: facilityId,
                }
            });
            window.location.href = routeData.href;

        }
    }
};
</script>

<style scoped>
/* Add basic styling */
.facility-card {
    border: 1px solid #ddd;
    padding: 20px;
    margin: 10px;
    text-align: center;
}
</style>