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
                // Ensure the correct PM2 environment is loaded
                sh '''
                export PM2_HOME=/var/lib/jenkins/.pm2
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
