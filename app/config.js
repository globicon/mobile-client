var app = angular.module( 'mobileClientApp' );
app.value( 'config', {
  urls : {
    search:             'http://expresso.globicon.dk:8580/TEGFacadeJSON/SearchRecords'   ,
    my:                 'http://expresso.globicon.dk:8580/TEGFacadeJSON/ListMyTodo'      ,
    group:              'http://expresso.globicon.dk:8580/TEGFacadeJSON/ListMyGroupTodo' ,
    incident:           'http://expresso.globicon.dk:8580/TEGFacadeJSON/ViewIncident'    ,
    workorder:          'http://expresso.globicon.dk:8580/TEGFacadeJSON/ViewWorkorder'   ,
    interaction:        'http://expresso.globicon.dk:8580/TEGFacadeJSON/ViewInteraction' ,
    updateincident:     'http://expresso.globicon.dk:8580/TEGFacadeJSON/UpdateIncident'  ,
    updateworkorder:    'http://expresso.globicon.dk:8580/TEGFacadeJSON/UpdateWorkorder' ,
    newinteraction:     'http://expresso.globicon.dk:8580/TEGFacadeJSON/NewInteraction'  ,
    login:              'http://expresso.globicon.dk:8580/TEGFacadeJSON/Login'           ,
    logout:             'http://expresso.globicon.dk:8580/TEGFacadeJSON/Logout'          ,
    resolutionCodeList: 'http://expresso.globicon.dk:8580/TEGFacadeJSON/GeneralData?action=resolutionCodeList',
    templateList:       'http://expresso.globicon.dk:8580/TEGFacadeJSON/GeneralData?action=templateList'
  }
} );