class CreateOrderedItems < ActiveRecord::Migration[5.0]
  def change
    create_table :ordered_items do |t|
      t.integer :order_id
      t.integer :product_id
      t.integer :quantity
      t.float :total
      t.timestamps
    end
  end
end
