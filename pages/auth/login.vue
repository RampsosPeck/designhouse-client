<template>
	<section class="authentication">
        <div class="auth-body color-border">
            <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
                INICIA SISIÓN
            </h1>
            <form class="auth-form" @submit.prevent="submit">
                <alert-error v-if="form.errors.has('message')" :form="form">
                    {{ form.errors.get('message') }} <br>
                    <nuxt-link :to="{ name:'verification.resend'}"> Reenviar email de verificación.</nuxt-link>
                </alert-error>
                <div class="form-group">
                    <base-input
                        :form="form"
                        field="email"
                        v-model="form.email"
                        placeholder="Ingrese su e-mail"></base-input>
                    <!--<input
                        type="text"
                        name="email"
                        v-model="form.email"
                        class="form-control form-control-lg font-14 fw-300"
                        :class="{ 'is-invalid': form.errors.has('email') }"
                        placeholder="Ingrese su e-mail"
                    />
                    <has-error :form="form" field="email"></has-error> -->
                </div>
                <div class="form-group">
                    <base-input
                        :form="form"
                        field="password"
                        inputType="password"
                        v-model="form.password"
                        placeholder="Ingrese su contraseña"></base-input>
                    <!--<input
                        type="password"
                        name="password"
                        v-model="form.password"
                        class="form-control form-control-lg font-14 fw-300"
                        :class="{ 'is-invalid': form.errors.has('password') }"
                        placeholder="Ingrese su contraseña"
                    />
                    <has-error :form="form" field="password"></has-error>-->
                </div>
                <div class="mt-4 mb-4 clearfix">
                    <nuxt-link class="forgot-pass color-blue font-14 fw-400" to="/password/email"> ¿Se te olvidó tu contraseña? </nuxt-link>
                </div>
                <div class="text-right">
                    <base-button :loading="form.busy"> Ingresar </base-button>
                   <!-- <button type="submit"
                        :disabled="form.busy"
                        class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase">
                        <span v-if="form.busy">
                            <i class="fas fa-spinner fa-spin"></i>
                        </span>
                        INGRESAR
                    </button>  -->
                </div>
                <p class="font-14 fw-400 text-center mt-4">
                    ¿Aún no tienes una cuenta?
                    <nuxt-link class="color-blue" :to="{ name: 'register' }"> CREA UNA CUENTA </nuxt-link>
                </p>
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
                    email: '',
                    password: ''
                })
            }
        },
        methods: {
            submit(){
                this.$auth.loginWith('local', {
                    data: this.form
                })
                .then(res => {
                    //console.log(res);
                }).catch(e => {
                    this.form.errors.set(e.response.data.errors);
                });
            }
        }
    };

</script>



