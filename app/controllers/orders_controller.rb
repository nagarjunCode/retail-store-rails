class OrdersController < ApplicationController

	 def create
	  	 @order = Order.create :customer_id => params[:customer_id], :dated => params[:date], :cost => params[:cost];
		 @order.save;
	 end
end


