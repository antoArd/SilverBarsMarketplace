var orders = {
    register: function (userId, orderQuantity, pricePerKg, orderType) {

        var orderId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		
	orders.list.push({
	    orderId: orderId,
            userId: userId,
            orderQuantity: orderQuantity,
            pricePerKg: pricePerKg,
            orderType: orderType
        });

        var summary = orders.summary[orderType][pricePerKg];
        orders.summary[orderType][pricePerKg] = summary ? summary + orderQuantity : orderQuantity;

        return orderId;
    },
    cancel: function (orderId) {
        var cancelledOrder = orders.list.splice(
		orders.list.map(function(order){
			return order.orderId;			
		}).indexOf(orderId), 1)[0];

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
