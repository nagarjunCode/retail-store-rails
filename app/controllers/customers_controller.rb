class CustomersController < ApplicationController
	
def show
end

def update
	@c_id=params[:customer_id];
	@customer = Customer.find_by(id:@c_id);
    @customer.name=params[:customer_name];
    @customer.address=params[:address];
   
    @customer.save;

	end
end

private

def params
	params.require(:customer).permit(:name, :address);
end
