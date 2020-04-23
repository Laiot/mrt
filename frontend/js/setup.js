function nextStep() {
    $('#first_step_settings').hide();
    loadUserForSetup($('#inputAssociateId').val());
};

function previousStep() {
    $('#settings_form').hide();
    $('#first_step_settings').show(500);
};
  
function loadUserForSetup(rhid) {
    var theUrl = '/rs/associates/' + rhid;
    $.ajax({
        url: theUrl,
        type: 'GET',
        data: {},
        dataType: 'json',
        success: function(response, status, xhr){
            if(xhr.status == 204){  // no content
                $('#companyNumberLabel').text(rhid);
            }else if(xhr.status == 200){
                console.log('====> ' + response);
                //fillSetupForm();
            }
            $('#settings_form').show(500);
        }
    });

};

function fillSetupForm() {
};
  
function saveUser() {
    // { "rhid": "9053",
    //   "name": "Andrea Leoncini",
    //   "email": "aleoncin@redhat.com",
    //   "costCenter": "420",
    //   "car": { "registryNumber":"FB214ZM", "mileageRate": 0.89 }
    // }
    // if($('#inputYear').val() != "")
    var data = {};
    data.rhid = $('#inputAssociateId').val();
    data.name = $('#inputAssociateName').val();
    data.email = $('#inputAssociateMail').val();
    data.costCenter = $('#inputAssociateCostCenter').val();
    data.carId = $('#inputCarRegNumber').val();
    data.mileageRate = $('#inputCarRate').val();
    $.ajax({
          type: "POST",
          url: "/rs/associates",
          data: data,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(data){
            localStorage.rhid = $('#inputAssociateId').val();
            localStorage.name = $('#inputAssociateName').val();
            alert("The tool is now setup to work with RHID: " + localStorage.rhid + ". If you want to act as different user go to setup page and save new info.");
            window.location="index.html";
          }
    });
  };
  
  