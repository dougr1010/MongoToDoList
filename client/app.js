/**
 * Created by dougritzinger on 10/2/15.
 */
var app=angular.module('toDoApp',[]);

console.log("Hello Epsilon");

app.controller("MainController", ['$scope','$http', function($scope, $http){

    //Initialize-------------------
    $scope.listArray=[];       //array of arrays, a 3-wide array of 2 element arrays
    $scope.listArray[0]=[];    //hi priority
    $scope.listArray[1]=[];    //medium priority
    $scope.listArray[2]=[];    //low priority
    var listItem=[];           //array that will be pushed onto listArray. [task, id]
    $scope.priority=0;         //set hi priority as default
    $scope.showNewItem=false;  //initially don't show inputs for adding new items
    $scope.showAddButton=true; //initially show the add item button
    $scope.showEditItem=false; //initially don't show item editing field
    var editThis="";
    var editPriority="";

    //----------------------------------------------------------------------------------------
    //working with listArray references:
    //$scope.listArray[~Priority][~this.$index][0]
    //           ^ array
    //                      ^which list: 1, 2, or 3 based on priority
    //                              ^do a this to get the item in the list to be worked with
    //                                          ^ which data, 0 = task, 1 = db ID
    //----------------------------------------------------------------------------------------


    //On load, populate the list and display with data from the db
    getData();


    /////////////////////////////////////////////////////////////////////
    // Respond to buttons to control adding/updating/deleting of tasks //
    /////////////////////////////////////////////////////////////////////


    //set the display controls to show new item input box and button.
    //data doesn't get saved or displayed on list until "done editing" button.
    $scope.addAnItem=function(){
        console.log('saw Add an Item button')
        $scope.showNewItem=true;
        $scope.showAddButton=false;
    };


    //Edit an item by pulling it from the list array into an input text field.
    //editThis and editPriority are placed in global vars for later use when saving to db.
    $scope.edit = function(fEditPriority){
        console.log("saw edit button");
        $scope.showAddButton=false;
        $scope.showEditItem=true;
        editThis = this;
        editPriority=fEditPriority;
        $scope.editListItem = $scope.listArray[editPriority][editThis.$index][0];
    };


    //When the "done editing" button is clicked, save the newly revised task to the db,
    //then call getData() to refresh display, twice because of asynchronous timing.
    $scope.doneEditing = function(){
        console.log('saw done editing button');
        $scope.listArray[editPriority][editThis.$index][0]=$scope.editListItem;

        //build string of data with id to update and revised task, send to server
        var jString = {};
        jString.id=$scope.listArray[editPriority][editThis.$index][1];
        jString.task=$scope.editListItem;
        console.log('info for update: ',jString);
        $http({method:"POST", url:"/toDo/update", data:jString}).then(getData()).then(getData());

        $scope.showEditItem=false;
        $scope.showAddButton=true;
    };


    //Delete an item
    //receives deletePriority which selects which list to delete from,
    //id is pulled from the list array to identify the db document to remove.
    //getData is then called to refresh the screen. Twice, because of asynchronous timing.
    $scope.delete = function(deletePriority){
        console.log("saw delete0 button");
        console.log('removing: ',this.item,"at index: ",this.$index);

        //get the id of the task being deleted
        id=$scope.listArray[deletePriority][this.$index][1];
        console.log('id: ',id);

        //build string of id to delete info and send to server
        var jString = {};
            jString.id=id;
        $http({method:"POST", url:"/toDo/delete", data:jString}).then(getData()).then(getData());
    };


    //Adding an item
    //data gets entered into db and display refreshed on the done 'adding' button
    $scope.doneAdding = function(){
        console.log('saw done adding button');
        $scope.priority = parseInt(0 + $scope.priority);
        $scope.listArray[$scope.priority].push($scope.newListItem);
        $scope.showNewItem=false;
        $scope.showAddButton=true;

        //build the string of db model info
        var jString = {};
        jString.priority = $scope.priority;
        jString.task = $scope.newListItem;
        console.log(jString);

        //send the data to the db
        $http({method:"POST", url:"/toDo/add", data:jString}).then(function(response){
            console.log('id: ',response.data);
            //refresh the display
            getData();
            //reset the input field
            $scope.newListItem="";
        });
    };


    //gets all the data from the db, clears the Angular list array
    //and reloads it with the new data, which then gets displayed.
    function getData(){
        console.log('getting data from db');
        $http.get('toDo/getData').then(function(response){
            console.log('getData received: ',response);
            console.log('how many tasks: ', response.data.length);
            console.log(response.data);

            $scope.listArray[0]=[];
            $scope.listArray[1]=[];
            $scope.listArray[2]=[];

            //loop through the response data and place in appropriate array within listArray
            //listArray is Angular-linked to the display.
            for(i=0;i<response.data.length;i++) {
                var priority=response.data[i].priority;
                var task=response.data[i].task;
                var id=response.data[i]._id;
                listItem=[task,id];
                $scope.listArray[priority].push(listItem);
            }
        });
    }

}]);






