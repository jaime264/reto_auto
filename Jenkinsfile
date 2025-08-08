pipeline {
    agent any

    tools {
        nodejs 'node22'
    }

    environment {
        REPORT_DIR = "playwright-report"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/jaime264/reto_auto.git'
            }
        }

        stage('Instalar dependencias') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Ejecutar Pruebas') {
            steps {
                // Asegura que se instalen los navegadores
                sh 'npx playwright install'

                // Ejecuta las pruebas y no falla el pipeline automáticamente
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    sh 'npx playwright test --reporter=html'
                }
            }
        }
    }

    post {
        always {
            echo "🔁 Ejecutando acciones post pipeline..."

            // Publicar el HTML generado por Playwright
            publishHTML([
                reportDir: "${REPORT_DIR}",
                reportFiles: 'index.html',
                reportName: 'Playwright Report',
                keepAll: true,
                allowMissing: true,
                alwaysLinkToLastBuild: true
            ])

            // Limpia el workspace sin importar si falló o no
            cleanWs()
        }
    }
}
