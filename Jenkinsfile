#!/usr/bin/groovy

pipeline {
  agent any
  stages {
    /* stage('Prepare') {
      steps {
        sh "npm install -g yarn"
        sh "yarn install"
      }
    } */

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