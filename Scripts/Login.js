$(document).ready(function(){
    $('#btnLogin').click(function(){
        var username = $("#txtUsername").val();
        var  Password= $("#txtPassword").val();
     
        if(username=='ADMIN'&& Password=='admin'){
         window.location.href = "html/index.html";
        }
    });

    $('#btnLogin').click(function(){
        $("#txtUsername").val('');
        $("#txtPassword").val('');
    });
    
    function setCookie(cname, cvalue, exMinutes) {
        // Set to 60 Minute
        var exdate = new Date();
        var time = exdate.getTime();
    
        time += 1000 * 60 * parseInt(exMinutes);
        exdate.setTime(time);
        //d.setTime(d.getTime() + (60 * 60 * 1000));
        var expires = "expires=" + exdate.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    function deleteCookie(cname) {
        document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    

    function fnVerify() {

        var UserCode = $("#txtVerifyUserName").val();
        var Dob = $.emsyne.Utility.convertToDateFormat($("#txtDOB").val(), 'dd/mm/yy', 'mm/dd/yy');
        var dataParam = '{"UserCode":"' + UserCode + '","Dob":"' + Dob + '"}';
        var webMethod = "../../Pages/Login.aspx/FIAdminCheckUserDetails";
    
        $.ajax({
            type: "POST",
            async: false,
            url: webMethod,
            data: dataParam,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            error: function (xhr, status, errorThrown) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
            success: function (retMsg) {
                sucRet = retMsg.d;
                if (sucRet.ResultSet != undefined) {
                    if (sucRet.ResultSet.length > 0) {
                        ShowMsg("Success", "Verified Successfully", "#txtNewPassword");
                        IsVerified = 1;
                        ValidateUserId = sucRet.ResultSet[0].USER_ID;
                        ValidateUserStatus = sucRet.ResultSet[0].STATUS;
                    }
                    else {
                        ShowMsg("Please Try Again!", "Invalid User Details", "#txtVerifyUserName");
                        Clear();
                        IsVerified = 0;
                    }
                }
                else {
                    ShowMsg("Please Try Again!", "Invalid User Details", "#txtVerifyUserName");
                    Clear();
                    IsVerified = 0;
                }
            }
        });
    
    }
});