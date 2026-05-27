pipeline {
    agent any

    environment {
        KUBECONFIG = 'C:\\Users\\prana\\.kube\\config'
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Pranabpasari/cloud-native-task-platform.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                bat 'docker build --no-cache -t pranab4/cloud-native-task-platform-backend:latest ./backend'
                bat 'docker push pranab4/cloud-native-task-platform-backend:latest'
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat 'docker build --no-cache -t pranab4/cloud-native-task-platform-frontend:latest ./frontend'
                bat 'docker push pranab4/cloud-native-task-platform-frontend:latest'
            }
        }

        stage('Deploy To Kubernetes') {
            steps {

                bat 'kubectl apply --validate=false -f k8s/mongodb-pvc.yaml'

                bat 'kubectl apply --validate=false -f k8s/mongodb-deployment.yaml'
                bat 'kubectl apply --validate=false -f k8s/mongodb-service.yaml'

                bat 'kubectl apply --validate=false -f k8s/backend-configmap.yaml'

                bat 'kubectl apply --validate=false -f k8s/backend-deployment.yaml'
                bat 'kubectl apply --validate=false -f k8s/backend-service.yaml'

                bat 'kubectl apply --validate=false -f k8s/frontend-deployment.yaml'
                bat 'kubectl apply --validate=false -f k8s/frontend-service.yaml'
            }
        }

        stage('Restart Deployments') {
            steps {
                bat 'kubectl rollout restart deployment backend-deployment'
                bat 'kubectl rollout restart deployment frontend-deployment'
            }
        }

        stage('Show Kubernetes Resources') {
            steps {
                bat 'kubectl get pods'
                bat 'kubectl get services'
            }
        }
    }
}