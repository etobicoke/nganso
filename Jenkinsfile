pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', credentialsId: 'jenkins', url: 'git@github.com:etobicoke/nganso.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                // PM2 command to reload the app without downtime
                sh '''
                pm2 reload nganso --update-env
                '''
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
