pipeline {
    agent {
        docker {
            image 'node:20'
            args '--ipc=host'
        }
    }

    environment {
        BASE_URL_TEST = 'https://www.holidayjet.co.uk'
        BASE_URL_PREPROD = 'https://preprod.holidayjet.co.uk'
        CI = 'true'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Test - test env') {
            steps {
                sh 'BASE_URL=$BASE_URL_TEST npx playwright test --project=chromium'
            }
        }

        stage('Test - preprod env') {
            steps {
                sh 'BASE_URL=$BASE_URL_PREPROD npx playwright test --project=chromium'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
        success {
            echo 'Tests passed'
        }
        failure {
            echo 'Tests failed'
        }
    }
}