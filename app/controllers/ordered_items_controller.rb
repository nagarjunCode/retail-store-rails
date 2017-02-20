class OrderedItemsController < ApplicationController
  
	def create

		@cart=params["cart"];
		# @id=Order.last["id"];
		@order = Order.order("created_at").last;
		@id=@order.id;
		
		@cart.each do |i|
		# binding.pry
		  	@ordered_item = OrderedItem.create :order_id => @id,:product_id =>@cart[i]["product_id"],:quantity => @cart[i]["quantity"],:total => @cart[i]["amount"];
		  	@ordered_item.save;
		end
	end
end
