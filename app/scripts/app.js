/* ---------------------------------------------------------
Author: Marta García
Module name: app.js
Date: 29/05/2016

Modules used:
   ne.swapi used as swapi service:
   
   Source from http://swapi.co/documentation#angular
      https://github.com/nickescallon/ne-swapi
--------------------------------------------------------- */
'use strict';

angular.module('StarWars-test', ['ne.swapi'])
    
    .controller('PeopleCtrl', ['$scope', '$filter', 'swapi', 
    function($scope, $filter, swapi) {

        $scope.people = [];
        $scope.curPage = 1;
        $scope.pageSize = 90;
        
        var orderBy = $filter('orderBy');
        
        swapi.people.page($scope.curPage).then(function(peopleData){

            var numPages = parseInt(peopleData.count / peopleData.results.length);
            $scope.numberOfPages = numPages;

            for (var i = 1; i <= peopleData.count; i++) {
                swapi.people.id(i).then(function(pagePeopleData) {
                    $scope.p = {name: "", birth_year: "", gender: "", homeworld:"", habitants:"" };
                    
                    if (pagePeopleData){
                        $scope.p.name = pagePeopleData.name;
                        $scope.p.birth_year = pagePeopleData.birth_year;
                        $scope.p.gender = pagePeopleData.gender;
                        $scope.p.url = pagePeopleData.url;

                        var planetID = pagePeopleData.homeworld.charAt(pagePeopleData.homeworld.length - 2);
                        
                        $scope.p.homeworld = "Planet " + planetID;
                        $scope.p.habitants = "";
                        
                        if(planetID != 0){
                            swapi.planets.id(planetID).then(function(planetData) {
                                if(planetData){
                                    $scope.p.homeworld = planetData.name;
                                    $scope.p.habitants = planetData.residents.length + " habitants";
                                }
                            });
                        }
                        
                        $scope.people.push($scope.p);
                    }
                    
                }); 
            }
            
            $scope.order = function(predicate) {
                $scope.predicate = predicate;
                $scope.people = orderBy($scope.people, predicate, true);
            };
            
            $scope.criteriaMatch = function( criteria ) {
                return person.gender === criteria;
            };

            $scope.order($scope.searchBox, true);
        });     
    }])


    .controller('ModalPersonCtrl', ['$scope', 'swapi', 
    function($scope, swapi) {

        $scope.characterUrl = "";
        
        swapi.people.id($scope.characterUrl.charAt($scope.characterUrl.length - 2)).then(function(data) {
            if (data){
                $scope.character = {birth_year: "", gender: "", height: "", mass:"", hair_color:"", skin_color:"", eye_color:"", homeworld:"", habitants: "", listHabitants:[]};
                
                $scope.character.name = data.name;
                $scope.character.birth_year = data.birth_year;
                $scope.character.gender = data.gender;
                $scope.character.height = data.height;
                $scope.character.mass = data.mass;
                $scope.character.hair_color = data.hair_color;
                $scope.character.skin_color = data.skin_color;
                $scope.character.eye_color = data.eye_color;

                var planetID = data.homeworld.charAt(data.homeworld.length - 2);
                if(planetID != 0){
                    swapi.planets.id(planetID).then(function(planetData) {
                        $scope.character.homeworld = planetData.name;
                        $scope.character.habitants = planetData.residents.length + " habitants";
                        
                        for (var i = 0; i < $scope.character.habitants; i++) {
                            console.log(planetData.residents);
                            var personID = planetData.residents[i].charAt(planetData.residents[i].length -2);
                            swapi.people.id(personID).then(function(d) {
                                if (d) {
                                    $scope.character.listHabitants.push(d);
                                }
                            });
                        }
                        
                    });
                }
            }
        }); 
    }])
