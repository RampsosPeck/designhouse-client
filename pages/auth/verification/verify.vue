<template>
	<section class="authentication">
        <div class="auth-body color-border">
            <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
                verificacion de email
            </h1>
            <form class="auth-form">
                <div class="form-group" v-if="success">
                    <div class="alert alert-success">
                    	<!--{{ status }}-->
                        Correo electrónico verificado con éxito.
                    </div>
                    <nuxt-link to="/login">Continuar para iniciar sesión</nuxt-link>
                </div>
                <div class="form-group" v-else>
                    <div class="alert alert-danger">
                    	<!-- {{ status }} -->
                       Un error fue encontrado.
                    </div>
                    <nuxt-link :to="{ name:'verification.resend'}"> Reenviar email de verificación.</nuxt-link>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
	export default {
        middleware: ['guest'],
		async asyncData({ params, query, app}) {
			const q = await Object.keys(query)
						.map(k => `${k}=${query[k]}`)
						.join('&');
			try {
				const { data } = await app.$axios.post(
						`/verification/verify/${params.id}?${q}`
					);

				return { success: true};
				/*return { success: true, status: data.message};*/
			} catch(e){
				return { success: false};
				/*return { success: false, status:e.response.data.errors.message};*/
			}
		}
	};
</script>

