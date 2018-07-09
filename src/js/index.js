$(function() {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            var str = '';
            if (res.code === 1) {
                res.data.list.forEach(function(item) {
                    // str += '<li>item.title</li>'
                    str += `<li>${item.title}</li>`
                })
                console.log(str)
            }
        },
        error: function(error) {
            console.warn(error);
        }
    })
})