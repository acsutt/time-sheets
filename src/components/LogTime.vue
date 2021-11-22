l<template>
    <form @submit.prevent="handleSubmitForm">
        <div class="form-group">
            <label class="required">Activity Name</label>
            <input type="text" class="form-control" v-model="activity.name" :class="{ 'is-invalid': submitted && $v.activity.name.$error }">
            <div v-if="submitted && $v.activity.name.$error" class="invalid-feedback">
                <span v-if="!$v.activity.name.required">Activity Name is required</span>
                <span v-if="!$v.activity.name.maxLength">Activity Name must be less than 32 characters</span>
            </div>
        </div>

        <div class="form-group">
            <label>Description</label>
            <textarea type="text" rows="5" maxlength="500" style="resize:vertical" class="form-control" v-model="activity.description"/>
        </div>

        <div class="form-group">
            <label class="required">Duration</label>
            <input id="durationField" type="number" class="form-control" v-model="activity.duration" :class="{ 'is-invalid': submitted && $v.activity.duration.$error }">
            <div v-if="submitted && $v.activity.duration.$error" class="invalid-feedback">
                <span v-if="!$v.activity.duration.required">Duration is required</span>
                <span v-if="!$v.activity.duration.integer">Duration must be an integer</span>
            </div>
        </div>

        <div class="form-group">
            <label>Start Time</label>
            <input type="time" class="form-control" v-model="activity.startTime">
        </div>

        <div class="form-group">
            <label class="required">Date</label>
            <input type="date" class="form-control" v-model="activity.date" :class="{ 'is-invalid': submitted && $v.activity.date.$error }">
            <div v-if="submitted && !$v.activity.date.required" class="invalid-feedback">Date is required</div>
        </div>

        <div class="form-group">
            <label class="required">Color</label>
            <input type="color" class="form-control" v-model="activity.color">
        </div>

        <div class="form-group">
            <button class="btn btn-success btn-block">Save</button>
        </div>
    </form>
</template>

<script>
    import { required, integer, maxLength} from 'vuelidate/lib/validators'

    export default {
        validations: {
            activity: {
                name: { required, maxLength: maxLength(32) },
                duration: { required, integer },
                date: {required},
            },
        },
        props: ['activity'],
        data() {
            return {
                submitted: false
            }
        },
        methods: {
            handleSubmitForm() {
                this.submitted = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                this.$emit('update-activity',this.activity)
            }
        }
    }

</script>
