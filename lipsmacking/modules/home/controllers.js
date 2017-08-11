'use strict';
 
var foo = angular.module('Home');
 
// .controller('HomeController',
//     ['$scope','$http',
//     function ($scope,$http) {

//     	$http.get('http://localhost:3000/auth').then(function(response){

//     		$scope.db=response;
//     	})

    	
      
//     }])



foo.controller('TableController',
    ['$scope','$http','$rootScope','$location','$timeout',
    function ($scope,$http, $rootScope,$location,$timeout) {


$scope.genID=function(row, index){

  // if (selRow[index].tableStatus!='Ready'){
  //   alert("Please select a green table")
  // }
$scope.showID = true;
// console.log(row);
// console.log(index);
var selRow = row;

$rootScope.selTableId = selRow[index].id;
$rootScope.selTableNumber = selRow[index].tableNumber;

 $http.get('http://localhost:3000/tables/' + $rootScope.selTableId).then(function(response){
          
response.data.tableStatus = "Occupied";

      // console.log($rootScope.selTableId);
      // console.log(response.data.tableStatus);
      // console.log(response.data);
      $rootScope.tablesAll = response.data;
      console.log($scope.tablesAll);


      var config = {
      headers : {
          'Content-Type': 'application/json'
      }
    }

       $http.put('http://localhost:3000/tables/' + $rootScope.selTableId,$rootScope.tablesAll,config)
    .success(function(response) {
        
        console.log("SDSFKMSFKMSKMF")
        $scope.getTables();
        console.log(response.data)

            })

         
     })


 






console.log($rootScope.selTableId);


    $rootScope.GenId = $rootScope.GenId + 1;

    $scope.getWaiters();
}





 $scope.getWaiters = function() {
        $scope.waiters = [];
        $scope.rd = [];
        $http.get('http://localhost:3000/employees').then(function(r) {
          $scope.rd=r.data;                
         //console.log($scope.rd);
         for (var i = 0; i < $scope.rd.length; i++) {
            //console.log($scope.rd[i])
            if($scope.rd[i].roleID == '2')
               $scope.waiters.push($scope.rd[i]);
          }
          //console.log($scope.waiters)
          console.log("inside getAllWaitersTableCount")
          
          $http.get('http://localhost:3000/tablesAssignment').then(function(r) {      
            $scope.waiterTables = r.data;
            var test=[];
            //$scope.countByWaiter=[{waiterID:'',count:0}];
            $rootScope.countByWaiter=[];
            var count, minCount = Infinity;
            $rootScope.minWaiter;
            for(var k=0; k<$scope.waiters.length;k++){
              count =0;
               for(var m=0; m<$scope.waiterTables.length;m++){
                //count =0;
                //console.log($scope.waiterTables[m])
                //console.log($scope.waiterTables[m].waiterID)
                //console.log($scope.waiters[k].id)

                if($scope.waiterTables[m].waiterID == $scope.waiters[k].id)
                  count = count+1
                //console.log(count)
                }
                if(count<minCount){
                  minCount=count;
                  $rootScope.minWaiter = $scope.waiters[k];
                }
               // $rootScope.countByWaiter.push({waiterID:$scope.waiters[k].id,count:count})

    
               }
              //test.push($scope.groupBy($scope.waiterTables,$scope.waiterTables.waiterID,$scope.waiters[k]))
              $rootScope.$broadcast('scanner-started'); 
              $scope.$emit('waiterAssigned',$rootScope.minWaiter)          
          });
       
        });

    $rootScope.$on('scanner-started', function() {
    console.log( $rootScope.minWaiter)
     var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
    // do what you want to do


    var a = {
      "tableNumber":$rootScope.selTableNumber,
      "tableID": $rootScope.selTableId ,
      "customerID": 0,
      "waiterID": $rootScope.minWaiter.id,
      "tableStatus": "Occupied"
    }
    $http.post('http://localhost:3000/tablesAssignment',a, config)
    .success(function(response) {
        $scope.successMessage="Table assigned successfully"
        // $scope.getTables();
        console.log(response)
            })
            .error(function (response) {
              console.log("some error occured")
            });




});

        
function arrayMin(arr) {
  var len = arr.length, min = Infinity;
  while (len--) {
    if (Number(arr[len]) < min) {
      min = Number(arr[len]);
    }
  }
  return min;
 };



 }




 // socket.on('init', function (data) {
 //    alert("DAS")
 //  });



    // socketio.on('content:changed', function(data) {
    //     $scope.data = data;
    // });
    // $scope.submitContent = function() {
    //     socket.emit('content:changed', $scope.data);
    // };







$scope.goToMenu = function(){
$location.path('customerAtTable');

}

$scope.getTables = function() {
	console.log("I am running")
    $http.get('http://localhost:3000/tables').then(function(r) {
      $scope.table=$rootScope.toRows(r.data, 3)

   // socketio.on('post', function (msg) {
   //          $scope.tickets.push(msg);
   //      });
      // $timeout($scope.poller(), 1);
    });
    
  }

  // setInterval($scope.poller(), 1);
//       $scope.getTables = function(){
//       	$scope.showID = false;
//             $http.get('http://localhost:3000/tables').then(function(response){
//     //console.log(response.data)
// $scope.table=$rootScope.toRows(response.data, 4);;
// console.log($scope.table)
// })
//         }

// while(1) {
    // $scope.getTables();

// }       


// $rootScope.$on('table_addded',function(event,data){
//     console.log("event received"+data)
//     // console.log($scope.successMessage);
//     $scope.getTables();
// })

  



$scope.AddTable=function()
{
    var newTable = {'tableNumber':'3','isEnabled':'True','tableStatus':'Ready To Occupy','capacity':'4'};
    var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
// $rootScope.$broadcast('table_added',"hello");

    $http.post('http://localhost:3000/tables',newTable, config)
    .success(function(response) {
        $scope.successMessage="Table addded successfully"
        $scope.getTables();
        console.log(response)
            })
            .error(function (response) {
            });


}


    	
   		
      
    }]);

/******************* TableController ends here *********************/

/******************* MainController starts here *********************/
foo.controller('MainController', function($rootScope,$scope) {


  $scope.$on('waiterAssigned', function (event, data) {
     // going down!
console.log(data)
$rootScope.testData=data;
console.log($rootScope.testData)
 $rootScope.$broadcast('fromMainAssigned', "Hey whatsup"); 
 // 'Some data'
  });

  


$rootScope.toRows = function(arr, total){
    var i = 0, rows = [];
    while(i < arr.length){
        i % total == 0 && rows.push([]);
        rows[rows.length-1].push(arr[i++])
    }
    return rows
};

    // $rootScope.employees = [
    //     {username:'customer',password:'customer',role:1},
    //     {username:'waiter',password:'waiter',role:2},
    //     {username:'chef',password:'chef',role:3}
    // ];
});

/******************* MainController ends here *********************/

/******************* MenuController starts here *********************/

foo.controller('MenuController', function($rootScope,$scope,$http,$location) {





$scope.alertWaiter = function(){



  console.log()
  $scope.msgAert="The waiter is on his way";
console.log($rootScope.selTableId)
// rootScope.menuIdArray.push(a);

 // $rootScope.$on('scanner-started', function() {
    console.log( $rootScope.minWaiter)


  $rootScope.$on('fromMainAssigned', function (event, data) {
    console.log(data); // 'Some data'
  });


console.log($rootScope.selTableId)
var alert =  {
    "tableID":$rootScope.selTableId ,
    "tableNumber":$rootScope.selTableNumber,
    "customerID": 0,
    "waiterID": $rootScope.minWaiter.id,
    "tableStatus": "Occupied"
  }
  // $rootScope.selectedItems.push{itemID:}

    var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
// $rootScope.$broadcast('table_added',"hello");

    $http.post('http://localhost:3000/alerts',alert, config)
    .success(function(response) {
        // $scope.successMessage="ordered";

        // $scope.getTables();
        console.log(response)
            })
            .error(function (response) {
              console.log("some error")
            });












  // })


  

}




$scope.init=function(){


}
    $scope.getMenu = function(){
      $scope.abc = '';
      	$scope.showID = false;
            $http.get('http://localhost:3000/menu').then(function(response){
    //console.log(response.data)
$scope.menus=response.data;
console.log($scope.menus)
})
        }


$scope.selectItem = function(a,menuItem,qty){

// rootScope.menuIdArray.push(a);

$scope.mI = menuItem;
$scope.mI.isEnabled = false;
$scope.abc = $scope.qty;
console.log($scope.abc)

 console.log($rootScope.selTableId)
	var orderItem = {
      "orderStatus": "ordered",
     
      "tableID": $rootScope.selTableId,
      "waiterId": 4,
      "ordername": $scope.mI.itemName,
      "cust": "add mushrooms and onions",
      "menu_id": a,
      "quantity": qty
    }



   console.log(orderItem)
	// $rootScope.selectedItems.push{itemID:}

    var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
// $rootScope.$broadcast('table_added',"hello");

    $http.post('http://localhost:3000/orders',orderItem, config)
    .success(function(response) {
        // $scope.successMessage="ordered";

        // $scope.getTables();
        console.log(response)
            })
            .error(function (response) {
            });
}


$scope.goToConfirmOrder = function(){
	$location.path('confirm');
}



});
/******************* MenuController ends here *********************/


;




/******************* ConfirmOrderController starts here *********************/

foo.controller('ConfirmOrderController', function($rootScope,$scope,$http,$location) {


$scope.getOrders = function() {
	// console.log("I am running")
    $http.get('http://localhost:3000/orders').then(function(r) {
      $scope.orders=r.data;
$scope.id = $rootScope.selTableId;
console.log($scope.id)




   // socketio.on('post', function (msg) {
   //          $scope.tickets.push(msg);
   //      });
      // $timeout($scope.poller(), 1);
    });
    
  }




$scope.payNFeednack = function(){


	$location.path('pay');
}





});



foo.controller('CustAtTableController', function($rootScope,$scope,$http,$location) {
$scope.AuthCustId = function(){
    var newTableAssg = {'tableID':'1','customerID':$scope.Cust_Id,'waiterID':'2'};
    var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }

            $location.path('menu');
// $rootScope.$broadcast('tab

    // $http.post('http://localhost:3000/tablesAssignment',newTableAssg, config)
    // .success(function(response) {
      
    //     $location.path('menu');
    //         })
    //         .error(function (response) {
    //         });
    
}


})



//ManTableController ends here

foo.controller('ManTableController',
    ['$scope','$http','$rootScope','$location','$timeout',
    function ($scope,$http, $rootScope,$location,$timeout) {


  $scope.showfeedback = function(){
    $location.path('manfeedback');
  }

 // socket.on('init', function (data) {
 //    alert("DAS")
 //  });
$scope.goToAddTable = function(){

  $location.path('manaddTable');
}


    // socketio.on('content:changed', function(data) {
    //     $scope.data = data;
    // });
    // $scope.submitContent = function() {
    //     socket.emit('content:changed', $scope.data);
    // };


$scope.goToMenu = function(){
$location.path('menu');

}

$scope.getTables = function() {
  console.log("I am running")
    $http.get('http://localhost:3000/tables').then(function(r) {
      $scope.table=$rootScope.toRows(r.data, 3)

$scope.tablesAll=r.data;
   // socketio.on('post', function (msg) {
   //          $scope.tickets.push(msg);
   //      });
      // $timeout($scope.poller(), 1);
    });
    
  }   
  



$scope.AddTable=function()
{

var result = $.grep($scope.tablesAll, function(e){ return e.tableNumber == $scope.tNo; });
console.log(result)
if(result.length>0){
  // alert("Table Number "+ $scope.tNo+"already exists");
  $scope.errMsg1 = "Table Number "+ $scope.tNo+" already exists";
}
else{
    var newTable = {'tableNumber':$scope.tNo,'isEnabled':'True','tableStatus':'Ready','capacity':$scope.tCap};
    var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
// $rootScope.$broadcast('table_added',"hello");

    $http.post('http://localhost:3000/tables',newTable, config)
    .success(function(response) {
        $scope.successMessage="Table addded successfully"
        $scope.getTables();
        console.log(response)
            })
            .error(function (response) {
            });


$scope.tNo = "";
$scope.tCap = "";
}
}




$scope.DeleteTable=function()
{
console.log()
var result = $.grep($scope.tablesAll, function(e){ if(e.data) return e.id !=$scope.tNo; });
console.log(result)
if(result.length<0){

  $scope.errMsg2 = "Table Number "+ $scope.tNo+" does not exist";


    
  }
  else{
     var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
    }

var un = $.grep($scope.tablesAll, function(dt) {
    if(dt.tableNumber== $scope.tNo) 
    $scope.tCap=dt.id;
    return dt.id}

            )

console.log($scope.tCap)

       $http.delete('http://localhost:3000/tables/' + $scope.tCap, config)
    .success(function(response) {
        $scope.successMessage="Table delete successfully"
        $scope.getTables();
        console.log(response)

            })
            .error(function (response) {
            });

$scope.tNo = "";
$scope.tCap = "";


  }

//fn end
}




      
      
      
    }]);


//ManTableController ends here



/******************* OrderController starts here *********************/

foo.controller('OrderController', function($rootScope,$scope,$http,$location) {
  $scope.init=function(){}

  $scope.getOrders = function(){
    $scope.showID = false;
    $http.get('http://localhost:3000/orders').then(function(response){
      //console.log(response.data)
      $scope.orders=response.data;
      console.log($scope.orders);
      /*var jsonObj = JSON.parse($scope.orders);
      for(var ord in jsonObj) {
        if (ord.orderStatus == 'ordered'){
          ord.buttonStatus = 'Start';
        }
        if (ord.orderStatus == 'Preparing'){
          ord.buttonStatus = 'Finish';
        }
        if (ord.orderStatus == 'Finished'){
          ord.buttonStatus = 'Remove';
        }
        console.log(ord);
      }*/
    })

    

  }

  $scope.selectOrder = function(a, orderItem){
    // rootScope.menuIdArray.push(a);

    $scope.oItem = orderItem;
    //$scope.oItem.isEnabled = false;
    var newOrderStat;

    if (orderItem.orderStatus == "ordered"){
      newOrderStat = "Preparing";
    };

    if (orderItem.orderStatus == "Preparing"){
      newOrderStat = "Finished";
    };

    if (orderItem.orderStatus == "Finished"){
      newOrderStat = "Removed";
    };

    orderItem.orderStatus = newOrderStat;

    var config = {
      headers : {
        'Content-Type': 'application/json'
       }
    }
    console.log(orderItem);

    if(newOrderStat == 'Removed') {
      //console.log("Delete");
      $http.delete('http://localhost:3000/orders/'+ orderItem.id, config)
      .success(function(response) {
        $scope.successMessage="Order deleted succefully";
        $scope.getOrders();
        console.log(response)
      })
      .error(function (response) {
      });
    } else {
      //console.log("Update");
      $http.put('http://localhost:3000/orders/' + orderItem.id, orderItem, config)
      .success(function(response) {
        $scope.successMessage="Order status updated succefully";
        //$scope.getOrders();
        console.log(response)
      })
      .error(function (response) {
     });
    }
  }

  $scope.goToInventory = function(){
    $location.path('inventory');
  }

  $scope.goToChefMenu = function(){
    $location.path('chefMenu');
  }

});
/******************* OrderController ends here *********************/

/******************* InventoryController starts here *********************/

foo.controller('InventoryController', function($rootScope,$scope,$http,$location) {
  $scope.init=function(){}

  $scope.getInventory = function(){
    $scope.showID = false;
    $http.get('http://localhost:3000/inventory').then(function(response){
      $scope.inventory=response.data;
      console.log($scope.inventory);
    })    

  }

  $scope.updateInventory = function(){
    var config = {
      headers : {
        'Content-Type': 'application/json'
       }
    }
    var arr = [];
    var inv;
    angular.forEach($scope.inventory, function(value, key) {
      inv = value;
      $http.put('http://localhost:3000/inventory/' + inv.id, inv, config)
        .success(function(response) {
        $scope.successMessage="Inventory updated succefully";
        $scope.getInventory();
        console.log(response)
      })
      .error(function (response) {
     });
    }, arr);

    console.log($scope.inventory);
  }    


  $scope.goToOrders = function(){
    $location.path('orders');
  }

});
/******************* InventoryController ends here *********************/

/******************* ChefMenuController starts here *********************/

foo.controller('ChefMenuController', function($rootScope,$scope,$http,$location) {
  $scope.init=function(){}

  $scope.getMenu = function(){
    $scope.showID = false;
    $http.get('http://localhost:3000/menu').then(function(response){
      $scope.menus = response.data;
      console.log($scope.menus)
    })
  }


  $scope.selectMenu = function(a, menuItem){

    $scope.menItem = menuItem;

    var newMenuStat;

    if (menuItem.isEnabled){
      newMenuStat = false;
    } else {
      newMenuStat = true;
    }

    menuItem.isEnabled = newMenuStat;

    var config = {
      headers : {
          'Content-Type': 'application/json'
      }
    }

    $http.put('http://localhost:3000/menu/' + menuItem.id, menuItem, config)
      .success(function(response) {
        $scope.successMessage="Menu Item Status Updated succefully";
        $scope.getMenu();
        console.log(response)
        })
      .error(function (response) {});
  }


  $scope.goToOrders = function(){
    $location.path('orders');
  }

});

/******************* ChefMenuController ends here *********************/



//////////////////////WaiterController/////////////////////////////////
foo.controller('WaiterController',
    ['$scope','$http','$rootScope','$location','$timeout',
    function ($scope,$http, $rootScope,$location,$timeout) {
   
      //get waiter id
      $scope.waiterID = $rootScope.globals.currentUser.userinfo.id 
        

      //get all tables assigned to waiter
      $scope.getWaiterTables = function() {
        $scope.showtID = false; 
        console.log("inside getWaiterTables")
              $http.get('http://localhost:3000/tablesAssignment').then(function(r) {
                
                  console.log(r.data);
                  var res = r.data;
                  var tempWaiterTables=[];
                  for(var i=0; i<res.length;i++)
                {
                  if(res[i].waiterID == $scope.waiterID)
                  {
                    console.log(res[i]);
                    tempWaiterTables.push(res[i])
                  }
                }
                  console.log(tempWaiterTables)
                  $scope.waiterTables=$rootScope.toRows(tempWaiterTables, 2); 
          });
        }

      $scope.selectWaiterTable = function(row, index) {
         $scope.successMessage = "";
        $scope.showtID = true;
        console.log($scope.showtID)
        // $scope.$digest();
        $scope.selTable = row;
        console.log('inside selectWaiterTable')
        console.log(row)
        
        $scope.tableOrder=[];
        $http.get('http://localhost:3000/orders').then(function(r){
          $scope.tableOrder = r.data;
        });
        $scope.OrderStatusAllowsEdits = 'ordered'
        //window.location = '/waiterOrdersView'
        //console.log(row)
      }

      $scope.updateOrder = function(row, index){
        
      var config = {
      headers : {
        'Content-Type': 'application/json'
       }
      }
      var arr = [];
      var order;
      angular.forEach($scope.tableOrder, function(value, key) {
        order = value;
        $http.put('http://localhost:3000/orders/' + order.id, order, config)
          .success(function(response) {
          $scope.successMessage="Order updated succefully";
         
          console.log(response)
        })
        .error(function (response) {


       });
      }, arr);

      console.log($scope.tableOrder);

  }  
}]);



// waiter controller ends here


/******************* Feedback Controller starts here *********************/

foo.controller('feedbackController', function($rootScope,$scope,$http,$location) {
  $scope.init=function(){}




$scope.rating = 0;

$scope.setRating = function(rating){
  $scope.rating = rating;
}
  $scope.getFeedback = function(){
    $scope.showID = false;
    $http.get('http://localhost:3000/feedback').then(function(response){
      $scope.feedback=response.data;
      console.log($scope.feedback);
    })    

  }

  $scope.updatefeedback = function(){
    var config = {
      headers : {
        'Content-Type': 'application/json'
       }
    }

    var fb={
    "Name": $scope.Name,
    "emailID": $scope.emailID,
    "rate": $scope.rating,
    "LikeService": $scope.LikeService,
    "facilties": $scope.facilties,
    "suggestions": $scope.suggestions
  }

  $http.post('http://localhost:3000/feedback/',fb, config)
        .success(function(response) {
        $scope.successMessage="feedback updated succefully";
        $scope.getFeedback();
        console.log(response)
      })
      .error(function (response) {
     });

    var arr = [];
    var inv;
    angular.forEach($scope.feedback, function(value, key) {
      inv = value;
      
    }, arr);

    $location.path('thanks')
  }    


  // $scope.goToOrders = function(){
  //   $location.path('orders');
  // }

});
/******************* Feedback Controller ends here *********************/


/******************* fbController starts here *********************/

foo.controller('fbController', function($rootScope,$scope,$http,$location) {
  $scope.init=function(){}

  $scope.getfeedback = function(){
    $scope.showID = false;
    $http.get('http://localhost:3000/feedback').then(function(response){
      //console.log(response.data)
      $scope.feedback=response.data;
      console.log($scope.feedback);
      /*var jsonObj = JSON.parse($scope.orders);
      for(var ord in jsonObj) {
        if (ord.orderStatus == 'ordered'){
          ord.buttonStatus = 'Start';
        }
        if (ord.orderStatus == 'Preparing'){
          ord.buttonStatus = 'Finish';
        }
        if (ord.orderStatus == 'Finished'){
          ord.buttonStatus = 'Remove';
        }
        console.log(ord);
      }*/
    })
  }

  
});
/******************* fbController ends here *********************/
