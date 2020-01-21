pipeline {
  agent any
  stages {
    stage('Bygg') {
      steps {
        echo 'Bygger'
      }
    }

    stage('Test') {
      steps {
        echo 'Testar'
      }
    }

    stage('Publicerar docker image') {
      steps {
        echo 'Publicerar docker image'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploy'
      }
    }

  }
}