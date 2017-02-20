$(document).ready(function() {
    var table_row_id = 0;
    var table_data = "";
    var amount = 0;
    var cart = [];
    var rowCount = 0;
    var datas = "";
    var sum = 0;

    var date = $('#date').datepicker({ dateFormat: 'dd-mm-yy' }).val();

    $("#search_product").val("");


    $(function() {

        $("#search_product").autocomplete({
            source: prods

        });
    });

    $("#search_product").on("autocompleteselect", function(event, ui) {

        $($.ajax({ url: 'http://localhost:3000/products/show_me', method: 'GET' }).done(function(data) {

                var cart_item = ui.item.value;

                rowCount = $('#myTable tr').length;
                datas = data;
                for (var i = 0; i < data.length; i++) {

                    if (data[i]["product_name"] == cart_item) {
                        $("#search_product").val("");
                        table_row_id++;

                        table_data = "<tr id='" + rowCount +
                            "'><td>" + data[i]["product_name"] +
                            "</td><td>" + data[i]["category"] +
                            "</td><td>" + data[i]["price"] +
                            "</td><td><input type='number' min='0' data-product-id='" + data[i]["id"] + "' class='quantity'/></td><td class='amount' id='amount'>-</td><td><span class='remove'>X</span></td></tr>";
                        $('#tableArea').append(table_data);


                        cart[rowCount - 1] = {};
                        cart[rowCount - 1]["quantity"] = 0;

                        cart[rowCount - 1]["id"] = rowCount;
                        cart[rowCount - 1]["product_id"] = data[i]["id"];
                        cart[rowCount - 1]["product_name"] = data[i]["product_name"];
                        cart[rowCount - 1]["category"] = data[i]["category"];
                        cart[rowCount - 1]["price"] = data[i]["price"];

                    }
                }

            })) //ajax ends
    });

    $(document).on("keyup", ".quantity", function() {
        tr_val = $(this).closest("tr");
        var price_index = parseInt($(this).attr("data-product-id")) - 1;
        var price = parseFloat(datas[price_index]["price"]);
        amount = parseFloat(tr_val.context.value * price);
        
        if (!cart.length) sum = 0;
        cart[cart.length - 1]["quantity"] = tr_val.context.value;
        cart[cart.length - 1]["amount"] = amount;
        sum = 0;
        for (var i = 0; i < cart.length; i++)
            sum += cart[i]["amount"];

        sum = sum.toFixed(2);
        $('#total_cost').text(sum);


        $("#myTable td").parent().remove();
        for (var i = 0; i < cart.length; i++) {
            rowCount = $('#myTable tr').length
            table_data = "<tr id='" + rowCount +
                "'><td>" + cart[i]["product_name"] +
                "</td><td>" + cart[i]["category"] +
                "</td><td>" + cart[i]["price"] +
                "</td><td><input type='number' min='0' data-product-id='" + cart[i]["id"] + "' class='quantity' value='" + cart[i]["quantity"] + "'/></td><td class='amount' id='amount'>" + cart[i]["amount"] + "</td><td><span class='remove'>X</span></td></tr>";
            $('#tableArea').append(table_data);
        }


    });


    $("#myTable").on("click", ".remove", function() {
        var row = $(this).closest('tr');
        var cart_remove_id = parseInt(row[0].id) - 1;
        sum -= parseFloat(cart[cart_remove_id]["amount"])

        sum = sum.toFixed(2);
        $('#total_cost').text(sum);

        cart.splice(cart_remove_id, 1);
        $("#search_product").val("");

        for (var i = 0; i < cart.length; i++) {
            cart[i]["id"] = i + 1;
        }

        var cache = $(this).closest('tbody');
        row.remove();
        rowCount--;
        cache.find('tr').attr('id', function(i) {
            return (i + 1);
        });

    });

    $(".check_out").on("click", function() {
        if (cart.length == 0)
            alert("cart is empty");
        else {
            var flag = 1;
            for (var i = 0; i < cart.length; i++) {
                if (cart[i]["quantity"] == 0) {
                    alert("Enter quantity for " + cart[i]["product_name"])
                    flag = 0;

                }
            }
        }
        if (flag) {
            var current_customer_id = document.cookie;
            current_customer_id = parseInt(current_customer_id.substr(3, current_customer_id.length));
            $.ajax({
                url: '/orders',
                method: 'POST',
                data: {
                    customer_id: current_customer_id,
                    date: $("#date").datepicker().val(),
                    cost: parseFloat(sum),
                    cart: cart
                },
                success: function() {
                    $.ajax({
                        url: 'customers/update',
                        method: 'PATCH',
                        data: {
                            customer_id: current_customer_id,
                            customer_name: $('#customer_name').val(),
                            address: $('#address').val(),
                        },
                        success: function() {

                            $.ajax({
                                url: '/ordered_items',
                                method: 'POST',
                                data: {
                                    cart: cart
                                },
                                success: function() {
                                    console.log("Order Placed Successfully");
                                },
                                failure: function() {
                                    console.log("Error in placing order");
                                }

                            });
                        },
                        failure: function() {
                            console.log("Failed");
                        }

                    });
                },
                failure: function() {
                    console.log("failed");
                }
            });



            alert("Order Placed Successfully");
            location.reload();

        }
    });

}); // document ending
