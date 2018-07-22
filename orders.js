// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.


var orders = {
    register: function (userId, orderQuantity, pricePerKg, orderType) {

        var orderId = orders.list.push({
            userId: userId,
            orderQuantity: orderQuantity,
            pricePerKg: pricePerKg,
            orderType: orderType
        }) - 1;

        var summary = orders.summary[orderType][pricePerKg];
        orders.summary[orderType][pricePerKg] = summary ? summary + orderQuantity : orderQuantity;

        return orderId;
    },
    cancel: function (orderId) {
        var cancelledOrder = orders.list.splice(orderId, 1)[0];

        orders.summary[cancelledOrder.orderType][cancelledOrder.pricePerKg] -= cancelledOrder.orderQuantity;

        return cancelledOrder;
    },
    getSummary: function () {

        return {
            sell: Object.keys(orders.summary.sell).map(
                function (key) {
                    return { quantity: orders.summary.sell[key], price: key };
                }).sort(function (a, b) {
                    return Number(a.price) - Number(b.price);
                }),
            buy: Object.keys(orders.summary.buy).map(
                function (key) {
                    return { quantity: orders.summary.buy[key], price: key };
                }).sort(function (a, b) {
                    return Number(b.price) - Number(a.price);
                }),
        }
    },
    list: [],
    summary: {
        sell: {},
        buy: {}
    },
    type: {
        sell: "sell",
        buy: "buy"
    }
};