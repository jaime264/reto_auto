pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
        REPORT_DIR = 'playwright-report'
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
                        sh 'npx playwright test'
                    } catch (err) {
                        currentBuild.result = 'UNSTABLE' // o FAILURE si prefieres
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
                    cleanWs() // Asegúrate de que el plugin "Workspace Cleanup" esté instalado
                } catch (e) {
                    echo '⚠️ No se pudo limpiar workspace: cleanWs() no disponible.'
                }
            }
        }
    }
}
