<template>
	<section class="authentication">
        <div class="auth-body color-border">
            <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
                Reenviar correo electrónico de verificación
            </h1>
            <form class="auth-form" @submit.prevent="submit">
            	<alert-error v-if="form.errors.has('message')" :form="form">
            		{{ form.errors.get('message') }}
            	</alert-error>
            	<alert-success :form="form">
            		Hemos reenviado el correo electrónico de verificación
            	</alert-success>
                <div class="form-group">
                    <input
                        type="text"
                        name="email"
                        v-model="form.email"
                        class="form-control form-control-lg font-14 fw-300"
                        :class="{ 'is-invalid': form.errors.has('email') }"
                        placeholder="Ingrese su E-mail"
                    />
                    <has-error :form="form" field="email"></has-error>
                </div>

                <div class="text-right">
                    <button type="submit"
                        :disabled="form.busy"
                        class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase">
                        <span v-if="form.busy">
                            <i class="fas fa-spinner fa-spin"></i>
                        </span>
                        REENVIAR
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
	export default {
        middleware: ['guest'],
		data(){
			return {
				form: this.$vform({
					email: ''
				})
			};
		},
		methods: {
			submit(){
				this.form.post(`/verification/resend`)
					.then(res => {
                        this.form.resent();
                        //this.form.reset();
                    })
					.catch(e => console.log(e));
			}
		}
	};
</script>

