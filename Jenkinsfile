pipeline {
    agent any

    tools {
        nodejs 'node22' 
    }

    environment {
        REPORT_DIR = "reports"
        VIDEO_DIR = "reports/videos"
        SCREENSHOT_DIR = "reports/screenshots"
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

        stage('Generar Artefactos') {
            steps {
                archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
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
            archiveArtifacts artifacts: 'reports/**/*.html, reports/**/*.mp4, reports/**/*.png', allowEmptyArchive: true
        }
    }
}
