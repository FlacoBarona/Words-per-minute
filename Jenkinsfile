pipeline {
    agent any
    environment {
        CONTENEDOR = "mi-contenedor-${BUILD_NUMBER}"
        IMAGEN = "mi-imagen:${BUILD_NUMBER}"
        PUERTO = '8103'
    }
    stages {
        stage('Preparar Entorno Docker') {
            steps {
                sh "docker stop ${env.CONTENEDOR} || echo 'No existe el contenedor ${env.CONTENEDOR}, continuando...'"
                sh "docker rm ${env.CONTENEDOR} || echo 'No existe el contenedor ${env.CONTENEDOR}, continuando...'"
            }
        }
        stage('Clonar Repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/FlacoBarona/jenkins.git'
            }
        }
        stage('Construir Imagen') {
            steps {
                sh "docker build -t ${env.IMAGEN} ."
            }
        }
        stage('Desplegar Docker') {
            steps {
                sh "docker run -d -p ${env.PUERTO}:80 --name ${env.CONTENEDOR} ${env.IMAGEN}"
            }
        }
    }
    post {
        success {
            echo 'Pipeline ejecutado con éxito.'
        }
        failure {
            echo 'El pipeline falló. Revisar los logs.'
        }
    }
}
