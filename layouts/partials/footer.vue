<template>
	<div>
		<footer class="fixed-bottom">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <div class="footer-links font-12 fw-300;">
                            <a href="#">Privacy</a>
                            <span>/</span>
                            <a href="#">Términos y Condiciones</a>
                        </div>
                    </div>
                    <div class="col-md-4 text-center">
                        <p class="font-14 fw-300">
                            © {{ fecha }} Todos los derechos reservados.
                        </p>
                    </div>
                    <div class="col-md-4 text-right">
                        <div class="footer-social">
                            <p class="font-14 fw-300">
                                <i class="fas fa-code" style="color: #efb810;"></i>
                                Ing. Jorge Peralta
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
	</div>
</template>

<script>
    export default {
        data(){
            return {
                fecha: (new Date()).getFullYear()
            }
        }
    };
</script>


