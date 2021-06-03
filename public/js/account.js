jQuery(document).ready(function ($) {
    init();
    affichage_info_user();
});

function delete_account(){
    if (confirm("Etes vous sur de vouloir supprimer votre compte ?")){
        $.ajax({
            type: 'POST',
            url: 'router.php',
            async: false,
            data: {
                request: "Controller/account.php",
                username: localStorage.getItem('username'),
                to_do: "delete_user"
            },
            dataType: 'json',
            success: function (data, status, xml) {
                deconnection();
            }
        });
    };
}

function affichage_info_user(){
    $.ajax({
        type: 'POST',
        url: 'router.php',
        async: false,
        data: {
            request: "Controller/account.php",
            username: localStorage.getItem('username'),
            to_do: "user_info"
        },
        dataType: 'json',
        success: function (data, status, xml) {
            $('#account_username').html(localStorage.getItem('username')),
            $('#account_email').html(data.email);
        }
    });
}

function change_password() {
    let check_all = true;

    // check empty fields
    $('.passwd_input').each(function () {
        $(this).css("borderColor", "red");
        if (!$(this).val()) {
            shake($(this))
            check_all = false;
        }
        else {
            $(this).css("borderColor", "grey");
        }
    });

    current = $('#currentPassword');
    new_password = $('#passwordAccount');
    new_verif = $('#passwordAccountVerif');

    // Verif la taille du nouv passwd
    if (new_password.val().length < new_password.attr("minlength")) {
        $('#alertPassword_length').show();
        shake(new_password);
        shake(new_verif);
        check_all = false;
    } else {
        $('#alertPassword_length').hide();
        new_password.css("borderColor", "grey");
        new_verif.css("borderColor", "grey");
    }

    // verif si nouvs passwd sont identiques
    if (new_password.val() != new_verif.val() || new_password.val() == "") {
        $('#alertPassword').show();
        shake(new_password);
        shake(new_verif);
        check_all = false;
    } else {
        new_password.css("borderColor", "grey");
        new_verif.css("borderColor", "grey");
        $('#alertPassword').hide();
    }

    // verif si ancien et nouv passwd sont egaux
    if (new_password.val() == current.val()) {
        $('#alertSamePassword').show();
        shake(current);
        shake(new_password);
        shake(new_verif);
        check_all = false;
    } else {
        current.css("borderColor", "grey");
        new_password.css("borderColor", "grey");
        new_verif.css("borderColor", "grey");
        $('#alertSamePassword').hide();
    }

    // verif la taille du current passwd
    if (current.val().length >= current.attr("minlength")) {
        $.ajax({
            type: 'POST',
            url: 'router.php',
            async: false,
            data: {
                request: "Controller/account.php",
                username: localStorage.getItem('username'),
                password: current.val(),
                to_do: "check_password"
            },
            dataType: 'json',
            success: function (data, status, xml) {
                if (data.status == "success") {
                    $('#alertCurrentPassword').hide();
                    current.css("borderColor", "grey");
                } else {
                    $('#alertCurrentPassword').show();
                    shake(current);
                    check_all = false;
                }
            }
        });
    }
    else {
        $('#alertCurrentPassword').show();
        shake(current);
        check_all = false;
    }
    return check_all
};

function send_new_password() {
    if (change_password()) {
        $.ajax({
            type: 'POST',
            url: 'router.php',
            async: false,
            data: {
                request: "Controller/account.php",
                username: localStorage.getItem('username'),
                new_password: new_password.val(),
                to_do: "change_password"
            },
            dataType: 'json',
        });
        $('#sucessPassword').show();
        setTimeout(function () {
            $('#sucessPassword').fadeOut();
        }, 5000);
    }
}

function check_new_mail(){
    obj = $('#emailAccount');
    if (!obj.val().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
        $('#alertMailUse').hide();
        $('#alertMail').show();
        shake(obj)
        return false;
    }else{
        $('#alertMail').hide();
        let result
        $.ajax({
            type:'POST',
            async: false,
            url:'router.php',
            data:{
                request: "Controller/inscription.php",
                email: obj.val(),
                to_do: "check_email"
            },
            dataType: 'json',
            success: function(data, status, xml){
                if(data.status != "success"){
                    $('#alertMailUse').show();
                    shake(obj);
                    result = false;
                }
                else{
                    $(obj).css("borderColor","grey");
                    $('#alertMailUse').hide();
                    result = true;
                }
            }
        });
        return result;
    }
}

function send_new_email(){
    if (check_new_mail())
        $.ajax({
            type:'POST',
            async: false,
            url:'router.php',
            data:{
                request: "Controller/account.php",
                username: localStorage.getItem("username"),
                new_email: obj.val(),
                to_do: "change_email"
            },
            dataType: 'json',
            success: function(data, status, xml){
                affichage_info_user();
                $('#sucessEmail').show();
                setTimeout(function () {
                    $('#sucessEmail').fadeOut();
                }, 5000);
            }
        });

}