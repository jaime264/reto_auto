pipeline {
    agent any
    environment {
        REPORT_DIR = "reports"
        VIDEO_DIR = "reports/videos"
        SCREENSHOT_DIR = "reports/screenshots"
    }
    stages {
        stage('Checkout') {
            steps {
                // Clonamos el repositorio donde tienes tu proyecto
                git 'https://github.com/jaime264/reto_auto.git'
            }
        }

        stage('Instalar dependencias') {
            steps {
                script {
                    // Instalamos las dependencias necesarias
                    sh 'npm install'
                }
            }
        }

        stage('Ejecutar Pruebas') {
            steps {
                script {
                    // Ejecutamos las pruebas de Playwright
                    sh 'npx playwright test --reporter=html,video,screenshot'
                }
            }
        }

        stage('Generar Artefactos') {
            steps {
                script {
                    // Archivar los artefactos generados (reportes, capturas de pantalla, videos)
                    archiveArtifacts artifacts: 'reports/*', allowEmptyArchive: true
                }
            }
        }

        stage('Limpiar') {
            steps {
                cleanWs()  // Limpiar el workspace si es necesario
            }
        }
    }

    post {
        always {
            // Devolver artefactos (como HTML, imágenes y videos generados)
            archiveArtifacts artifacts: 'reports/**/*.html, reports/**/*.mp4, reports/**/*.png', allowEmptyArchive: true
        }
    }
}
