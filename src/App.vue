<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
      <div class="container">
        <a class="navbar-brand float-left">Time Sheets</a>
          <ul class="nav navbar-nav flex-row float-right" v-if="signedIn">
            <li class="nav-item">
              <router-link class="nav-link pr-3" to="/log-activity">Log Activity</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link pr-3" to="/calendar">Calendar</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link pr-3" to="/view">View</router-link>
            </li>
            <li class="nav-item">
              <button class="nav-link" @click="logOut">Logout</button>
            </li>
          </ul>
      </div>
    </nav>


    <div class="mt-5">
      <router-view fluid></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";


export default {
    data() {
        return {
            signedIn: false
        }
    },
    name: 'App',

    created() {
        let apiURL = 'http://localhost:4000/user-api';
        axios.get(apiURL).then(res => {
            this.Users = res.data;
        }).catch(error => {
            console.log(error)
        });
    },
    methods: {
        logOut() {
            this.signedIn = false
            localStorage.clear();
            this.$router.push("/login");
      },
    }
    
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>