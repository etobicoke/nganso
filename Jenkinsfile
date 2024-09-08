pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', credentialsId: '5cac09d2-e621-4aba-af30-c5fe50d87587', url: 'git@github.com:etobicoke/nganso.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install only production dependencies using npm ci
                sh 'NODE_ENV=production npm ci'
            }
        }
        stage('Build for Production') {
            steps {
                // Build the project for production
                sh 'npm run build'
            }
        }
        stage('Deploy with PM2') {
            steps {
                // Deploy using PM2
                sh '''
                export PM2_HOME=/var/lib/jenkins/.pm2
                if pm2 describe nganso > /dev/null; then
                  pm2 reload nganso --update-env
                else
                  pm2 start npm --name "nganso" -- start
                fi
                pm2 save
                '''
            }
        }
    }
    post {
        always {
            // cleanWs()
        }
    }
}