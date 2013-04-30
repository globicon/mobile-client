(function( window ){
  'use strict';

  var options = {
    urls : {
      search:             'http://expresso.globicon.dk:2993/TEGFacadeJSON/SearchRecords'   ,
      myTodos:            'http://expresso.globicon.dk:2993/TEGFacadeJSON/ListMyTodo'      ,
      groupTodos:         'http://expresso.globicon.dk:2993/TEGFacadeJSON/ListMyGroupTodo' ,
      approvals:          'http://expresso.globicon.dk:2993/TEGFacadeJSON/ListMyCasesForApproval' ,
      interactions:       'http://expresso.globicon.dk:2993/TEGFacadeJSON/ListMyInteractions',
      incident:           'http://expresso.globicon.dk:2993/TEGFacadeJSON/ViewIncident'    ,
      workorder:          'http://expresso.globicon.dk:2993/TEGFacadeJSON/ViewWorkorder'   ,
      interaction:        'http://expresso.globicon.dk:2993/TEGFacadeJSON/ViewInteraction' ,
      task:               'http://expresso.globicon.dk:2993/TEGFacadeJSON/ViewChangeTask'  ,
      updateIncident:     'http://expresso.globicon.dk:2993/TEGFacadeJSON/UpdateIncident'  ,
      updateWorkorder:    'http://expresso.globicon.dk:2993/TEGFacadeJSON/UpdateWorkorder' ,
      updateTask:         'http://expresso.globicon.dk:2993/TEGFacadeJSON/UpdateChangeTask' ,
      newInteraction:     'http://expresso.globicon.dk:2993/TEGFacadeJSON/NewInteraction'  ,
      login:              'http://expresso.globicon.dk:2993/TEGFacadeJSON/Login'           ,
      logout:             'http://expresso.globicon.dk:2993/TEGFacadeJSON/Logout'          ,
      generalData:        'http://expresso.globicon.dk:2993/TEGFacadeJSON/GeneralData'
    }
  };

  window.options = options;

})( window );