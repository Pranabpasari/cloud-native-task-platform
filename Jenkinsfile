pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Pranabpasari/cloud-native-task-platform.git'
            }
        }

        stage('Build Containers') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Start Containers') {
            steps {
                bat 'docker compose up -d'
            }
        }

        stage('Show Running Containers') {
            steps {
                bat 'docker ps'
            }
        }
    }
}