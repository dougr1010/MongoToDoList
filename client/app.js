/**
 * Created by dougritzinger on 10/2/15.
 */
var app=angular.module('toDoApp',[]);

console.log("Client: Hello Epsilon, Happy Weekend");

app.controller("MainController", ['$scope','$http', function($scope, $http){

    //Initialize-------------------
    $scope.listArray=[];      //array of arrays
    $scope.listArray[0]=[];   //hi priority
    $scope.listArray[1]=[];   //medium priority
    $scope.listArray[2]=[];   //low priority
    var listItem=[];          //array that will be pushed onto listArray. [task, id]
    $scope.priority=0;        //set hi priority as default
    $scope.showNewItem=false; //initially don't show inputs for adding new items
    $scope.showAddButton=true;//initially show the add item button
    $scope.showEditItem=false;
    var editThis="";
    var editPriority="";
    //-----------------------------

    //populate the list with data from the db
    getData();

    //Quiescent buttons-------------
    $scope.addAnItem=function(){
        console.log('saw Add an Item button')
        $scope.showNewItem=true;
        $scope.showAddButton=false;
    }

    $scope.edit = function(fEditPriority){
        console.log("saw edit0 button");
        $scope.showAddButton=false;
        $scope.showEditItem=true;
        editThis = this;
        editPriority=fEditPriority;
        $scope.editListItem = $scope.listArray[editPriority][editThis.$index][0];
    }

    $scope.doneEditing = function(){
        console.log('saw done editing button');
        $scope.listArray[editPriority][editThis.$index][0]=$scope.editListItem;
        $scope.showEditItem=false;
        $scope.showAddButton=true;
    }

    $scope.delete = function(deletePriority){
        console.log("saw delete0 button");
        console.log('removing: ',this.item,"at index: ",this.$index);
        id=$scope.listArray[deletePriority][this.$index][1]
        console.log('id: ',id);
        var jString = {};
           jString.id=id;
            $http({method:"POST", url:"/toDo/delete", data:jString}).then(getData()).then(getData());
    }
    //-----------------------------



    //Adding an item---------------
    $scope.doneAdding = function(){
        console.log('saw done adding button');
        $scope.priority = parseInt(0 + $scope.priority)
        $scope.listArray[$scope.priority].push($scope.newListItem);
        $scope.showNewItem=false;
        $scope.showAddButton=true;
        //sendData();

        var jString = {};
        jString.priority = $scope.priority;
        jString.task = $scope.newListItem;
        var txData=JSON.stringify(jString);
        console.log(txData);
        //$http.post('/toDo/add', txData);
        $http({method:"POST", url:"/toDo/add", data:jString}).then(function(response){
            console.log('id: ',response.data);
            //refresh the list
            getData();
            //reset the input fields
            $scope.newListItem="";
            //$scope.priority=0;
        });

    }
    //-----------------------------

    //Send Data utility function
    //function sendData(){
    //    console.log('raw listArray');
    //    console.log($scope.listArray);
    //    console.log('stringified');
    //    console.log(JSON.stringify($scope.listArray));
    //    $http.post('/sendToServer', $scope.listArray);
    //}

    function getData(){
        console.log('getting data from db');
        $http.get('toDo/getData').then(function(response){
            console.log('getData received: ',response);
            console.log('how many tasks: ', response.data.length);
            console.log(response.data);

            $scope.listArray[0]=[];
            $scope.listArray[1]=[];
            $scope.listArray[2]=[];
            for(i=0;i<response.data.length;i++) {
                var priority=response.data[i].priority;
                var task=response.data[i].task;
                var id=response.data[i]._id;
                listItem=[task,id ];
                $scope.listArray[priority].push(listItem);
            }

        }) ;
    }



}]);






