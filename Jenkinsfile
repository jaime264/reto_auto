pipeline {
    agent any

    tools {
        nodejs 'node22' 
    }

    environment {
        REPORT_DIR = "playwright-report"
    }

    stages {
        stage('Instalar dependencias') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Ejecutar Pruebas') {
            steps {
                sh 'npx playwright install'
                sh 'npx playwright test --reporter=html'
            }
        }

        stage('Publicar Reporte') {
            steps {
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: "${REPORT_DIR}",
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
            }
        }

        stage('Limpiar') {
            steps {
                cleanWs()
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*.html, reports/**/*.mp4, reports/**/*.png', allowEmptyArchive: true
        }
    }
}
