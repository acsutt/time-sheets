<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="activity in Activities" :key="activity._id">
                        <td>{{ activity.name }}</td>
                        <td>{{ activity.duration }}</td>
                        <td>{{ activity.date }}</td>
                        <td>
                            <router-link :to="{name: 'edit', params: { id: activity._id }}" class="btn btn-success">Edit
                            </router-link>
                            <button @click.prevent="deleteActivity(activity._id)" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                Activities: []
            }
        },
        created() {
            let apiURL = 'http://localhost:4000/activity-api';
            axios.get(apiURL).then(res => {
                this.Activities = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteActivity(id){
                let apiURL = `http://localhost:4000/activity-api/delete-activity/${id}`;
                let indexOfArrayItem = this.Activities.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                        axios.delete(apiURL).then(() => {
                        this.Activities.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
                }
            }
        }
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>