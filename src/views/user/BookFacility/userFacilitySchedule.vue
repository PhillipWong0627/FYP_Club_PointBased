<template>
    <div class="border-2 border-red-500">
      <h1 class="text-green-500">Member List</h1>
      <ul>
        <li v-for="member in members" :key="member.id">
          {{ member.memberName }} (Password: {{ member.password }})
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  //Import to fetch data
  import {getMemberInfo} from '@/service/apiProvider.js';

  export default {
    data() {
      return {
        members: []
      };
    },
    created() {
      this.fetchMembers();
    },
    methods: {
      async fetchMembers() {
        const result = await getMemberInfo();
        console.log(result);
        this.members = result;
      }
    }
  };
  </script>
  