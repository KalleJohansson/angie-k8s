#!/usr/bin/groovy

pipeline {
  agent any
  stages {
    stage('Prepare') {
      agent {
        docker 'node:alpine'
      }
      steps {
        sh 'node --version'
        //sh "npm install -g yarn"
        //sh "yarn install"
      }
    }

    /* stage('Bygg') {
      steps {
        echo 'Bygger'
      }
    } */

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