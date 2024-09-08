pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', credentialsId: 'your-ssh-credentials-id', url: 'git@github.com:etobicoke/nganso.git'
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
                // Check if the process exists, start it if not, otherwise reload it
                sh '''
                if pm2 describe nganso > /dev/null; then
                  pm2 reload nganso --update-env
                else
                  pm2 start npm --name "nganso" -- start
                fi
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
