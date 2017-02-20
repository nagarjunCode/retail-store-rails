Rails.application.routes.draw do
  
  devise_for :customers
  
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  

    resources :products , :carts , :orders, :ordered_items, :customers
    root to: 'welcome#index'
    patch 'customer/update'
  

 
 	 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
