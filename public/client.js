// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function () {
    'use strict';
    const postCheck = function (emailAddress, beforeSendfn, fn) {
        return $.ajax({
            type: 'POST',
            url: '/check',
            data: JSON.stringify({
                email: emailAddress
            }),
            success: fn,
            beforeSend: beforeSendfn,
            contentType: "application/json",
            dataType: 'json'
        });
    }

    $('.js-random')
        .on('click', function (e) {
            e.preventDefault();
            for (var i = 0; i < 10; i++) {
                $('input')
                    .val((chance.first() + '.' + chance.last())
                        .toLowerCase() + (i + 1) + '@gmail.com');
                $('form')
                    .trigger('submit');
            }
        });


    $('form')
        .on('submit', function (e) {
            e.preventDefault();
            let emailValue = $('input')
                .val();
            let emailLink = '<a href="mailto:' + emailValue + '">' + emailValue + '</a>';
            let check = ' checking...';
            postCheck(emailValue, function (data) {
                $('#emails')
                    .prepend('<li data-email="' + emailValue + '">' + emailValue + ':' + check + '</li>');
            }, function (data) {
                if (data.result) {
                    check = '   &#10003; ';
                } else {
                    check = '   X ';
                    emailLink = emailValue;
                }
                $('li[data-email="' + emailValue + '"]')
                    .html('<li>' + emailLink + ':' + check + '</li>');
            });
            $('input')
                .val('');
        });
});
