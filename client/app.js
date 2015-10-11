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
    $scope.priority=0;        //set hi priority as default
    $scope.showNewItem=false; //initially don't show inputs for adding new items
    $scope.showAddButton=true;//initially show the add item button
    $scope.showEditItem=false;
    var editThis="";
    var editPriority="";
    //-----------------------------


    //Quiescent buttons-------------
    $scope.addAnItem=function(){
        console.log('saw Add an Item button')
        $scope.showNewItem=true;
        $scope.showAddButton=false;
    }

    $scope.edit0 = function(){
        console.log("saw edit0 button");
        $scope.showAddButton=false;
        $scope.showEditItem=true;
        editThis = this;
        editPriority=0;
        $scope.editListItem = $scope.listArray[editPriority][editThis.$index];
    }
    $scope.edit1 = function(){
        console.log("saw edit1 button");
        $scope.showAddButton=false;
        $scope.showEditItem=true;
        editThis = this;
        editPriority=1;
        $scope.editListItem = $scope.listArray[editPriority][editThis.$index];
    }
    $scope.edit2 = function(){
        console.log("saw edit2 button");
        $scope.showAddButton=false;
        $scope.showEditItem=true;
        editThis = this;
        editPriority=2;
        $scope.editListItem = $scope.listArray[editPriority][editThis.$index];
    }
    $scope.doneEditing = function(){
        console.log('saw done editing button');
        $scope.listArray[editPriority][editThis.$index]=$scope.editListItem;
        $scope.showEditItem=false;
        $scope.showAddButton=true;
        sendData();
    }

    $scope.delete0 = function(){
        console.log("saw delete0 button");
        console.log('removing: ',this.item,"at index: ",this.$index);
        $scope.listArray[0].splice(this.$index,1);
        sendData();
    }
    $scope.delete1 = function(){
        console.log("saw delete1 button");
        console.log('removing: ',this.item,"at index: ",this.$index);
        $scope.listArray[1].splice(this.$index,1);
        sendData();
    }
    $scope.delete2 = function(){
        console.log("saw delete2 button");
        console.log('removing: ',this.item,"at index: ",this.$index);
        $scope.listArray[2].splice(this.$index,1);
        sendData();
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
        $http({method:"POST", url:"/toDo/add", data:jString})
        //reset the input fields
        $scope.newListItem="";
        $scope.priority=0;

    }
    //-----------------------------

    //Send Data utility function
    function sendData(){
        console.log('raw listArray');
        console.log($scope.listArray);
        console.log('stringified');
        console.log(JSON.stringify($scope.listArray));
        $http.post('/sendToServer', $scope.listArray);
    }


}]);






