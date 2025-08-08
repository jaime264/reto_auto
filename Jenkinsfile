pipeline {
    agent any

    tools {
        nodejs 'node22' // 👈 Este nombre debe coincidir con lo que tienes en "Global Tool Configuration"
    }

    environment {
        REPORT_DIR = "playwright-report"
    }

    stages {
        stage('Instalar dependencias') {
            steps {
                echo '📦 Instalando dependencias...'
                sh 'npm ci'
            }
        }

        stage('Ejecutar Pruebas') {
            steps {
                echo '🧪 Ejecutando pruebas...'
                script {
                    try {
                        sh 'npx playwright test --reporter=html'
                    } catch (err) {
                        currentBuild.result = 'UNSTABLE' // o 'FAILURE'
                        echo "⚠️ Pruebas fallidas, pero continuamos con el pipeline."
                    }
                }
            }
        }

        stage('Publicar Reporte') {
            steps {
                echo '📊 Publicando reporte...'
                publishHTML([
                    reportDir: "${REPORT_DIR}",
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report',
                    keepAll: true,
                    allowMissing: true,
                    alwaysLinkToLastBuild: true
                ])
            }
        }
    }

    post {
        always {
            echo '🧹 Limpiando workspace...'
            script {
                try {
                    cleanWs() // Requiere plugin Workspace Cleanup
                } catch (e) {
                    echo '⚠️ No se pudo limpiar workspace: cleanWs() no disponible.'
                }
            }
        }
    }
}
