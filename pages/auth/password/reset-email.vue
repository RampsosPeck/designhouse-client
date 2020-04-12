<template>
	<section class="authentication">
        <div class="auth-body">
            <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
                RESTABLECER LA CONTRASEÑA
            </h1>
            <form class="auth-form" @submit.prevent="submit">
				<alert-success :form="form">{{ status }}</alert-success>
                <div class="form-group">
                    <input
                        type="text"
                        name="email"
                        v-model="form.email"
                        class="form-control form-control-lg font-14 fw-300"
                        :class="{ 'is-invalid': form.errors.has('email') }"
                        placeholder="Ingrese su e-mail"
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
                        enviar enlace de restablecimiento de contraseña
                    </button>
                </div>
                <p class="font-14 fw-400 text-center mt-4">
                    <nuxt-link class="color-blue" :to="{ name: 'login' }"> atrás para iniciar sesión </nuxt-link>
                </p>
            </form>
        </div>
    </section>
</template>

<script>

    export default {
        data(){
            return {
            	status: '',
                form: this.$vform({
                    email: ''
                })
            }
        },
        methods: {
            submit(){
            	this.form.post('/password/email')
            		.then(res => {
            			this.status = res.data.status;
            			this.form.reset();
            		}).catch(e=> {
            			console.log(e);
            		})
            }
        }
    };

</script>


