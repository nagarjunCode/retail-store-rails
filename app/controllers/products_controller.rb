class ProductsController < ApplicationController
	def index
	 	
	end
 
	def show
		render json: @product = Product.all
	end
	
	



end
