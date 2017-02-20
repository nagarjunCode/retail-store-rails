class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
     t.integer :customer_id
      t.date :dated
      t.float :cost
    
      t.timestamps
    end
  end
end
